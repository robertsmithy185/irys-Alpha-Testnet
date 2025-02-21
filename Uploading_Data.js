import { getIrysUploader } from "./index.js";

const uploadData = async () => {
  const irysUploader = await getIrysUploader();
  if (!irysUploader) {
    console.log("❌ Gagal mendapatkan uploader.");
    return;
  }

  const dataToUpload = "hirys world.";

  try {
    // Pastikan ini metode yang benar
    const receipt = await irysUploader.upload(Buffer.from(dataToUpload));

    console.log(`✅ Data berhasil diunggah!`);
    console.log(`🔗 URL: https://gateway.irys.xyz/${receipt.id}`);
  } catch (e) {
    console.log("❌ Error saat mengunggah data:", e);
  }
};

uploadData();
