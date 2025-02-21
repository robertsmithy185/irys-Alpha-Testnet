import { getIrysUploader } from "./index.js";

const uploadFolder = async () => {
  const irysUploader = await getIrysUploader();

  if (!irysUploader) {
    console.log("❌ Gagal mendapatkan uploader.");
    return;
  }

  // Path folder yang akan diunggah
  const folderToUpload = "./my-images/"; // Sesuaikan dengan lokasi folder

  try {
    const receipt = await irysUploader.uploadFolder(folderToUpload, {
      indexFile: "", // Jika ada file index (HTML), tentukan di sini
      batchSize: 50, // Jumlah file yang diunggah sekaligus
      keepDeleted: false, // Apakah ingin mempertahankan file lama yang dihapus
    });

    console.log(`✅ Berhasil mengunggah folder!`);
    console.log(`📂 Manifest ID: ${receipt.id}`);
    console.log(`🔗 URL: https://gateway.irys.xyz/${receipt.id}`);
  } catch (e) {
    console.log("❌ Error saat mengunggah folder:", e);
  }
};

// Jalankan fungsi uploadFolder
uploadFolder();
