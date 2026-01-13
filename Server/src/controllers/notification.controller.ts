import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Notification } from "../models/notification.model.js";
import { Request, Response } from "express";

export const getUserNotifications = asyncHandler(async (req:Request, res:Response) => {

  const notifications = await Notification.find({ recipientId: req.user._id })
    .sort({ createdAt: -1 })
    .limit(20);

  return res
  .status(200)
  .json(
    new ApiResponse(
        200, 
        notifications, 
        "Notifications fetched"
    )
  );
});

export const markAsRead = asyncHandler(async (req:Request, res:Response) => {

  await Notification.findByIdAndUpdate(req.params.id, { read: true });

  return res
  .status(200)
  .json(
    new ApiResponse(
        200, 
        {}, 
        "Marked as read"
    )
  );
});