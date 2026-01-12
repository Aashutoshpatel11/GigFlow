import mongoose, { Mongoose } from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Bid } from "../models/bid.model.js";
import { Gig } from "../models/gig.model.js";
// import { io } from "../socket/socket.js"; 
import { getIo } from "../socket/socket.js";
import { Request, Response } from "express";


export const submitBid = asyncHandler(async (req:Request, res:Response) => {
  const { gigId, message, price } = req.body;
  const freelancerId = req.user._id;

  const gig = await Gig.findById(gigId);
  if (!gig) throw new ApiError(404, "Gig not found");
  if (gig.status !== "open") throw new ApiError(400, "Gig is already assigned");
  
  if (gig.ownerId.toString() === freelancerId.toString()) {
      throw new ApiError(400, "You cannot bid on your own gig");
  }

  const bid = await Bid.create({
    gigId,
    freelancerId,
    message,
    price,
  });

  return res
  .status(201)
  .json(
    new ApiResponse(
      201, 
      bid, 
      "Bid submitted successfully"
    )
  );
});

export const getBidsForGig = asyncHandler(async (req:Request, res:Response) => {
  const { gigId } = req.params;
  
  const gig = await Gig.findById(gigId);
  if (!gig) throw new ApiError(404, "Gig not found");
  
  if (gig.ownerId.toString() !== req.user._id.toString()) {
      throw new ApiError(403, "Only the gig owner can view bids");
  }

  const bids = await Bid.find({ gigId: gigId }).populate("freelancerId", "name email");
  
  return res.status(200).json(new ApiResponse(200, bids, "Bids fetched successfully"));
});

export const hireFreelancer = asyncHandler(async (req:Request, res:Response) => {
  const { bidId } = req.params;
  const userId = req.user._id;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const bidToHire = await Bid.findById(bidId).session(session);

    if (!bidToHire) throw new ApiError(404, "Bid not found");

    const gig = await Gig.findById(bidToHire.gigId).session(session);

    if (!gig) throw new ApiError(404, "Gig not found");

    if (gig.ownerId.toString() !== userId.toString()) {
      throw new ApiError(403, "You are not the owner of this gig");
    }

    if (gig.status !== "open") {
      throw new ApiError(409, "This gig has already been assigned");
    }

    gig.status = "assigned";
    await gig.save({ session });

    bidToHire.status = "hired";
    await bidToHire.save({ session });

    await Bid.updateMany(
      { gigId: gig._id, _id: { $ne: bidId } },
      { status: "rejected" },
      { session }
    );

    await session.commitTransaction();

    const io = getIo()

    io.to(bidToHire.freelancerId.toString()).emit("notification", {
      type: "HIRED",
      message: `You have been hired for ${gig.title}!`,
      gigId: gig._id
    });

    return res.status(200).json(new ApiResponse(200, { gig, bid: bidToHire }, "Freelancer hired successfully"));

  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
});