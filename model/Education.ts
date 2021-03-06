import mongoose, { Schema, Document } from "mongoose";

export interface EducationInterface extends Document {
  education: string;
}

const EducationSchema: Schema = new Schema({
  education: { type: String },
  timestamps: { createdAt: 'created_at' }
});

const Education = mongoose.model<EducationInterface>("Education", EducationSchema);
export default Education;