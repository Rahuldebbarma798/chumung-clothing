export function optimizeCloudinary(url: string, width = 800) {
  if (!url) return "";

  // only transform cloudinary images
  if (!url.includes("res.cloudinary.com")) return url;

  return url.replace(
    "/upload/",
    `/upload/w_${width},q_auto,f_auto/`
  );
}
