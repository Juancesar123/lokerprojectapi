import mongoose, { Schema, Document } from "mongoose";

export interface PositionInterface extends Document {
    position_parent: string;
    position_child_id:string;
}

const PositionSchema: Schema = new Schema({
  position_parent: { type: String },
  position_child_id: { type: String }
});

const Position = mongoose.model<PositionInterface>("Position", PositionSchema);
export default Position;