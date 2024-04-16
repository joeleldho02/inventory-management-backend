import mongoose, { Schema } from "mongoose";
import UserEntity from "../../entities/user.entity";

const userSchema: Schema<UserEntity> = new Schema<UserEntity>({
  name: String,
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  updatedOn:{
    type:Date,
    default:Date.now()
  }
});

const UserDb = mongoose.model<UserEntity>("users", userSchema);
export { UserDb };