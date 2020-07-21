import mongoose, { Schema, Document } from "mongoose";

export interface CityInterface extends Document {
  city: string;
}

const CitySchema: Schema = new Schema({
  city: { type: String }
});

const City = mongoose.model<CityInterface>("City", CitySchema);
export default City;