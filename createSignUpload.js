import { getIrysUploader } from "./index.js";

const createSignUpload = async () => {
  try {
    // Dapatkan referensi Irys yang sudah dikonfigurasi
    const irys = await getIrysUploader();

    // 1. Membuat Transaksi dengan tag
    const tx = irys.createTransaction("Hirys World!", {
      tags: [{ name: "Content-Type", value: "text/plain" }],
    });

    // 2. Menandatangani transaksi
    await tx.sign();
    console.log(`Transaksi berhasil dibuat dan ditandatangani, ID=${tx.id}`);

    // 3. Mengunggah transaksi
    const receipt = await tx.upload();
    console.log(
      `Transaksi berhasil diunggah. Lihat di: https://gateway.irys.xyz/${receipt.id}`
    );
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
  }
};

// Menjalankan fungsi
createSignUpload();
