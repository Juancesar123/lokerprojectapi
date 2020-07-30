import mongoose, { Schema, Document } from "mongoose";
export interface City {
  name_city:string;
}
export interface ProvinceInterface extends Document {
    province: string;
    city:City[];
}

const ProvinceSchema: Schema = new Schema({
  province: { type: String },
  city: [{ type: Schema.Types.ObjectId, ref: 'City' }],
  timestamps: { createdAt: 'created_at' }
});

const Province = mongoose.model<ProvinceInterface>("Province", ProvinceSchema);
export default Province;