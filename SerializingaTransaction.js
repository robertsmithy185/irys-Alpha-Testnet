import { getIrysUploader } from "./index.js";

const serializationUpload = async () => {
  try {
    // 1. Dapatkan referensi Irys yang sudah dikonfigurasi
    const irys = await getIrysUploader();

    // 2. Buat transaksi dengan data dan tag
    const tx1 = irys.createTransaction("Hirys World!", {
      tags: [{ name: "Content-Type", value: "text/plain" }],
    });

    // 3. Tanda tangani transaksi
    await tx1.sign(); // Setelah ini, ID transaksi akan tersedia
    console.log(`Transaksi dibuat dan ditandatangani, ID=${tx1.id}`);

    // 4. Serialisasi transaksi (mengubah ke format mentah)
    const txSerialized = tx1.getRaw();
    console.log("Transaksi berhasil diserialisasi:", txSerialized);

    // 5. Rekreasi transaksi dari data yang diserialisasi
    const tx2 = irys.transaction.fromRaw(txSerialized);
    console.log(
      `Transaksi direkreasi dari data yang diserialisasi, ID=${tx2.id}`
    );

    // 6. Unggah transaksi yang telah direkreasi
    const receipt = await tx2.upload();
    console.log(
      `Transaksi berhasil diunggah. Lihat di: https://gateway.irys.xyz/${receipt.id}`
    );
  } catch (error) {
    console.error("Terjadi kesalahan saat memproses transaksi:", error);
  }
};

// Jalankan fungsi
serializationUpload();
