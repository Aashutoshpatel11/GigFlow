import mongoose, { Schema, Document, Types } from "mongoose";

export interface INotification extends Document {
  recipientId: Types.ObjectId;
  type: "GIG_POSTED" | "BID_RECEIVED" | "HIRED";
  message: string;
  relatedId?: Types.ObjectId;
  read: boolean;
  createdAt: Date;
}

const notificationSchema = new Schema<INotification>(
  {
    recipientId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true, 
    },
    type: {
      type: String,
      enum: ["GIG_POSTED", "BID_RECEIVED", "HIRED"],
      required: true,
    },
    message: { 
        type: String, 
        required: true 
    },
    relatedId: { 
        type: Schema.Types.ObjectId, 
        default: null 
    },
    read: { 
        type: Boolean, 
        default: false 
    },
  },
  { 
    timestamps: true 
}
);

export const Notification = mongoose.model<INotification>("Notification", notificationSchema);