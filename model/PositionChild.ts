import mongoose, { Schema, Document } from "mongoose";

export interface PositionChildInterface extends Document {
    position_child: string;
}

const PositionChildSchema: Schema = new Schema({
  position_child: { type: String },
  timestamps: { createdAt: 'created_at' }
});

const PositionChild = mongoose.model<PositionChildInterface>("PositionChild", PositionChildSchema);
export default PositionChild;