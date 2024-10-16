import mongoose, { Document, Schema } from "mongoose";

export interface ISubject extends Document {
  subjectCode: string;
  name: string;
  examType: "GCE OL" | "GCE AL";
}

const SubjectSchema = new Schema({
  subjectCode: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  examType: { type: String, enum: ["GCE OL", "GCE AL"], required: true },
});

export default mongoose.model<ISubject>("Subject", SubjectSchema);
