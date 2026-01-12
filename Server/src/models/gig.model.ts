import mongoose, { Schema, Document, Types } from "mongoose";

export interface IGig extends Document {
  title: string;
  description: string;
  budget: number;
  ownerId: Types.ObjectId;
  status: "open" | "assigned";
  createdAt: Date;
  updatedAt: Date;
}

const gigSchema = new Schema<IGig>(
  {
    title: { 
        type: String, 
        required: true, 
        index: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    budget: { 
        type: Number, 
        required: true 
    },
    ownerId: { 
        type: Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    status: {
      type: String,
      enum: ["open", "assigned"],
      default: "open",
    },
  },
  { timestamps: true }
);

export const Gig = mongoose.model<IGig>("Gig", gigSchema);