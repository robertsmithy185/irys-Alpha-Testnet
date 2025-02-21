import fs from "fs";
import { getIrysUploader } from "./index.js";

const uploadFile = async () => {
  const irysUploader = await getIrysUploader();
  if (!irysUploader) {
    console.log("❌ Gagal mendapatkan uploader.");
    return;
  }

  // Membaca file sebagai Buffer
  const filePath = "./Network.png";
  const fileBuffer = fs.readFileSync(filePath);

  // Menambahkan tag metadata (opsional)
  const tags = [{ name: "application-id", value: "MyNFTDrop" }];

  try {
    // Gunakan metode upload() jika uploadFile() tidak ditemukan
    const receipt = await irysUploader.upload(fileBuffer, { tags: tags });

    console.log(`✅ File berhasil diunggah!`);
    console.log(`🔗 URL: https://gateway.irys.xyz/${receipt.id}`);
  } catch (e) {
    console.log("❌ Error saat mengunggah file:", e);
  }
};

// Jalankan fungsi uploadFile
uploadFile();
