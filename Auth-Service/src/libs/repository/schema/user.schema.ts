import mongoose, { Schema } from "mongoose";
import UserEntity from "../../entities/user.entity";

const userSchema: Schema<UserEntity> = new Schema<UserEntity>({
  _id:mongoose.Schema.Types.ObjectId,
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
  roles: [],
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