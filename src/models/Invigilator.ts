 import mongoose, { Document, Schema } from "mongoose";

export interface IInvigilator extends Document {
  name: string;
  email: string;
  phone: string;
  address: string;
  examCenterID: mongoose.Schema.Types.ObjectId;
}

const InvigilatorSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  examCenterID: { type: Schema.Types.ObjectId, ref: "Centre", required: true },
});

export default mongoose.model<IInvigilator>("Invigilator", InvigilatorSchema);
