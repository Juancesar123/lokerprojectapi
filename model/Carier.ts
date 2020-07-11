import mongoose, { Schema, Document } from "mongoose";

export interface CarierInterface extends Document {
  name_organization: string;
  salary: string;
  position:string;
  description:string;
  picture:string;
  education:string;
  title:string;
  location:string;
}

const CarierSchema: Schema = new Schema({
  name_organization: { type: String },
  title: { type: String},
  salary: { type: String },
  position: { type: String },
  description: { type: String },
  education: { type: String },
  location: { type: String },
  picture: { type: String }
});

const Carier = mongoose.model<CarierInterface>("Carier", CarierSchema);
export default Carier;