export async function uploadToCloudinary(file: File): Promise<string> {
  console.log("🌍 CLOUD NAME:", process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);
  console.log("📦 UPLOAD PRESET:", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

  if (
    !process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
    !process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
  ) {
    throw new Error("❌ Cloudinary env vars missing on client");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append(
    "upload_preset",
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
  );

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();
  console.log("☁️ CLOUDINARY RESPONSE:", data);

  if (!data.secure_url) {
    throw new Error("❌ Cloudinary did not return secure_url");
  }

  return data.secure_url;
}
