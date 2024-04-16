import mongoose, { Schema } from 'mongoose';
import AdminEntity from '../../entities/admin.entity';

const adminSchema: Schema<AdminEntity> = new Schema<AdminEntity>({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: false
    },
    updatedOn:{
      type:Date,
      default:Date.now()
    }
});

const AdminDb = mongoose.model<AdminEntity>("Admin", adminSchema);
export { AdminDb };
