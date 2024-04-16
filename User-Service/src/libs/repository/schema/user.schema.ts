import mongoose, { Schema } from "mongoose";
import UserEntity from "../../entities/user.entity";

const userSchema: Schema<UserEntity> = new Schema<UserEntity>({
  name: String,
  email: {
    type: String,
  },
  mobile: {
    type: String,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
  },
  outlet: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdBy:{
    type: mongoose.Schema.Types.ObjectId
  },
  createdOn:{
    type:Date,
    default:Date.now()
  },
  updatedBy:{
    type: mongoose.Schema.Types.ObjectId
  },
  updatedOn:{
    type:Date,
    default:Date.now()
  }
});

const UserDb = mongoose.model<UserEntity>("users", userSchema);
export { UserDb };