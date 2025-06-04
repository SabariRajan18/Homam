import mongoose, { Document, Schema } from "mongoose";

interface IFormData extends Document {
    name: string;
    email: string;
    phoneNo: string;
    country: string;
    socialMedia: string;
}

const formSchema = new Schema<IFormData>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        phoneNo: { type: String, required: true },
        country: { type: String, required: true },
        socialMedia: { type: String, required: true },
    },
    {
        timestamps: true,
        collection: "UsersForms"
    }
);

const FormModel = mongoose.model<IFormData>("UsersForms", formSchema);
export default FormModel;