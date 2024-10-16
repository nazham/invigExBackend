import mongoose, { Document } from 'mongoose';

export interface IStudent extends Document {
  indexNumber: string;
  gender: string;
}

const StudentSchema = new mongoose.Schema({
  indexNumber: { type: String, unique: true, required: true },
  gender: { type: String, required: true },
});

export default mongoose.model<IStudent>('Student', StudentSchema);