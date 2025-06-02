import mongoose, { Document, Schema } from "mongoose";

interface CentreStatistics {
  subjectID: mongoose.Schema.Types.ObjectId;
  appliedStudentsCount: number;
  session: "AM" | "PM";
}
export interface ICentreLog extends Document {
  examDate: Date;
  examCenterID: mongoose.Schema.Types.ObjectId;
  centreStatistics: CentreStatistics[];
  resourceAllocation: {
    roomsNeeded: number;
    hallsNeeded: number;
    invigilatorsNeeded: number;
    totalStudents: number;
  };
}

const CentreLogSchema = new mongoose.Schema({
  examDate: { type: Date, required: true },
  examCenterID: { type: Schema.Types.ObjectId, ref: "Centre", required: true },
  centreStatistics: [
    {
      subjectID: { type: Schema.Types.ObjectId, ref: "Subject", required: true },
      appliedStudentsCount: { type: Number, required: true },
      session: { type: String, enum: ["AM", "PM"], required: true },
    },
  ],
  resourceAllocation: {
    roomsNeeded: { type: Number, required: true },
    hallsNeeded: { type: Number, required: true },
    invigilatorsNeeded: { type: Number, required: true },
    totalStudents: { type: Number, required: true },
  },
});

export default mongoose.model<ICentreLog>("CentreLog", CentreLogSchema);
