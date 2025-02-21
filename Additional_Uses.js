import { getIrysUploader } from "./index.js"; // Pastikan getIrysUploader diimpor dengan benar

const uploadFile = async () => {
  // Mendapatkan instance IrysUploader
  const irysUploader = await getIrysUploader();

  // Menentukan file yang akan diunggah
  const fileToUpload = "./Network.png"; // Path ke file yang akan diunggah

  // Menambahkan tag Content-Type dan application-id secara manual
  const tags = [
    { name: "Content-Type", value: "image/png" }, // Tag untuk tipe konten file
    { name: "application-id", value: "NFTs To The Moon" }, // Menambahkan tag application-id
  ];

  try {
    // Mengunggah file dengan tag Content-Type dan application-id
    const response = await irysUploader.uploadFile(fileToUpload, {
      tags: tags,
    });

    // Menampilkan URL file yang diunggah
    console.log(`File uploaded ==> https://gateway.irys.xyz/${response.id}`);
  } catch (e) {
    // Menangani error jika terjadi saat pengunggahan
    console.log("Error uploading file ", e);
  }
};

// Menjalankan fungsi uploadFile
uploadFile();
