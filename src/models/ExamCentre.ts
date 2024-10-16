import mongoose, { Document } from "mongoose";

export interface ICentre extends Document {
  schoolName: string;
  examName: "GCE OL" | "GCE AL";
  totalRooms: number;
  totalHalls: number;
  roomCapacity: number;
  hallCapacity: number;
}

const CentreSchema = new mongoose.Schema({
  schoolName: { type: String, required: true, unique: true},
  examName: { type: String, required: true },
  totalRooms: { type: String, required: true },
  totalHalls: { type: String, required: true },
  hallCapacity: { type: String, required: true },
  roomCapacity: { type: String, required: true },
});

export default mongoose.model<ICentre>("Centre", CentreSchema);
