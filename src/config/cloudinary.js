import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: "ddgve9rfs",
  api_key: "147579512249946",
  api_secret: "seGoYaq1LwzdvY0gYTODiduQVl0",
});

export const uploadLargeImage = async (fileBuffer, filename) => {
  try {
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.v2.uploader.upload_stream(
        {
          chunk_size: 6000000, // 6 MB
          resource_type: "auto",
          folder: "Homam-Assets",
          public_id: filename,
          overwrite: true,
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(fileBuffer);
    });

    return result.secure_url;
  } catch (error) {
    throw error;
  }
};
