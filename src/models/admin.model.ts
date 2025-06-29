import mongoose, { Document, Schema } from "mongoose";

interface IAdmin extends Document {
    email: string;
    password: string
};

const adminSchema = new Schema<IAdmin>(
    {
        email: { type: String, required: true },
        password: { type: String, required: true },

    },
    {
        timestamps: true,
        collection: "Admin"
    }
);

const AdminModel = mongoose.model<IAdmin>("Admin", adminSchema);
export default AdminModel;