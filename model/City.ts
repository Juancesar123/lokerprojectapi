import mongoose, { Schema, Document } from "mongoose";

export interface CityInterface extends Document {
  city: string;
}

const CitySchema: Schema = new Schema({
  city: { type: String },
  timestamps: { createdAt: 'created_at' }
});

const City = mongoose.model<CityInterface>("City", CitySchema);
export default City;