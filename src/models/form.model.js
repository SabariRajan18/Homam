import mongoose, { Document, Schema } from "mongoose";

const contactSchema = new Schema(
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

const ContactModel = mongoose.model("Contacts", contactSchema);
export default ContactModel;