import mongoose, { Document, Schema } from "mongoose";

interface IGallery extends Document {
    image: string;
};

const gallerySchema = new Schema<IGallery>(
    {
        image: { type: String, required: true },
    },
    {
        timestamps: true,
        collection: "Gallery"
    }
);

const GalleryModel = mongoose.model<IGallery>("Gallery", gallerySchema);
export default GalleryModel;