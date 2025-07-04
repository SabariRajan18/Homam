import mongoose, { Document, Schema } from "mongoose";

interface IContactFormData extends Document {
    name: string;
    email: string;
    subject: string;
    message: string;
    status: string;
};

const contactSchema = new Schema<IContactFormData>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        subject: { type: String, required: true },
        message: { type: String, required: true },
        status: { type: String, default: "Active" }
    },
    {
        timestamps: true,
        collection: "Contacts"
    }
);

const ContactModel = mongoose.model<IContactFormData>("Contacts", contactSchema);
export default ContactModel;