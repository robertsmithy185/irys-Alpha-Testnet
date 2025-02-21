import { getIrysUploader } from "./index.js"; // Pastikan getIrysUploader diimpor dengan benar

const createMutableReference = async () => {
  // Mendapatkan instance IrysUploader
  const irysUploader = await getIrysUploader();

  // Unggah transaksi pertama (data atau file yang ingin diupload)
  const receiptOne = await irysUploader.upload("First TX");

  // Mencetak URL transaksi mutable berdasarkan ID transaksi (txId)
  console.log(
    `TX 1 uploaded ==> https://gateway.irys.xyz/mutable/${receiptOne.id}`
  );
};

// Menjalankan fungsi untuk membuat referensi mutable
createMutableReference();
