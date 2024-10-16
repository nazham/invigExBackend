import mongoose, { Document } from 'mongoose';

export interface IAttendanceRegister extends Document {
  studentIndex: string;
  subject: string;
  examDate: Date;
}

const AttendanceRegisterSchema = new mongoose.Schema({
  studentIndex: { type: String, ref: 'Student', required: true },
  subject: { type: String, required: true },
  examDate: { type: Date, required: true },
});

export default mongoose.model<IAttendanceRegister>('AttendanceRegister', AttendanceRegisterSchema);
