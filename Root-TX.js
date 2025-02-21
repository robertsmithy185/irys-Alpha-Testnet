import { getIrysUploader } from "./index.js"; // Pastikan sudah mengimpor fungsi getIrysUploader

const uploadTransactions = async () => {
  try {
    // Mengunggah transaksi pertama
    const irysUploader = await getIrysUploader();
    const receiptOne = await irysUploader.upload("First TX");
    console.log(
      `TX 1 uploaded https://gateway.irys.xyz/mutable/${receiptOne.id}`
    );

    // Menambahkan tag Root-TX untuk transaksi kedua
    const tags = [{ name: "Root-TX", value: receiptOne.id }];

    // Mengunggah transaksi kedua dengan tag Root-TX
    const receiptTwo = await irysUploader.upload("Second TX", { tags: tags });
    console.log(
      `TX 2 uploaded https://gateway.irys.xyz/mutable/${receiptTwo.id}`
    );
  } catch (e) {
    console.log("Error uploading transactions", e);
  }
};

// Memanggil fungsi untuk mengunggah transaksi
uploadTransactions();
