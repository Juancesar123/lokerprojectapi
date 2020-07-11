import mongoose, { Schema, Document } from "mongoose";

export interface PositionChildInterface extends Document {
    position_child: string;
}

const PositionChildSchema: Schema = new Schema({
  position_child: { type: String }
});

const PositionChild = mongoose.model<PositionChildInterface>("Position_child", PositionChildSchema);
export default PositionChild;