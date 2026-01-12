import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Gig } from "../models/gig.model.js";
import { Request, Response } from "express";

export const createGig = asyncHandler(async (req:Request, res:Response) => {
  const reqBody:any = req.body;
  const { title, description, budget } = reqBody

  if (!title || !description || !budget) {
    throw new ApiError(400, "Title, description, and budget are required");
  }

  const gig = await Gig.create({
    title,
    description,
    budget,
    ownerId: req.user._id,
    status: "open"
  });

  return res
    .status(201)
    .json(new ApiResponse(201, gig, "Gig posted successfully"));
});

export const getAllGigs = asyncHandler(async (req:Request, res:Response) => {
  const { search } = req.query;
  
  const query: any = { status: "open" };

  if (search) {
    query.title = { $regex: search, $options: "i" }; // Case-insensitive search
  }

  const gigs = await Gig.find(query)
    .populate("ownerId", "name email")
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, gigs, "Gigs fetched successfully"));
});

export const getMyGigs = asyncHandler(async (req:Request, res:Response) => {
  const gigs = await Gig.find({ ownerId: req.user._id }).sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, gigs, "Your gigs fetched successfully"));
});

export const getGigById = asyncHandler(async (req:Request, res:Response) => {
  const { id } = req.params;
  const gig = await Gig.findById(id).populate("ownerId", "name email");

  if (!gig) {
    throw new ApiError(404, "Gig not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, gig, "Gig details fetched successfully"));
});