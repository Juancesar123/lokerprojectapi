import mongoose, { Schema, Document } from "mongoose";
export interface PositionChild {
  position:string;
}
export interface PositionInterface extends Document {
    position_parent: string;
    position_child_id:PositionChild[];
}

const PositionSchema: Schema = new Schema({
  position_parent: { type: String },
  position_child_id: [{ type: Schema.Types.ObjectId, ref: 'PositionChild' }]
});

const Position = mongoose.model<PositionInterface>("Position", PositionSchema);
export default Position;