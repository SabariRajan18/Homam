import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema(
    {
        image: { type: String, required: true },
    },
    {
        timestamps: true,
        collection: "Gallery"
    }
);

const GalleryModel = mongoose.model("Gallery", gallerySchema);
export default GalleryModel;