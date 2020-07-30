import mongoose, { Schema, Document } from "mongoose";

export interface UserInterface extends Document {
  email: string;
  name: string;
  password: string;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  timestamps: { createdAt: 'created_at' }
  
},
{
    timestamps: true
});
UserSchema.statics = {
    /**
     * Get User
     * @param {ObjectId} id - The objectId of user.
     */
    get(id: string): mongoose.Document {
      return this.findById(id)
        .execAsync()
        .then((user: any) => {
          if (user) {
            return user;
          }
        });
    }
};
const User = mongoose.model<UserInterface>("User", UserSchema);
export default User;