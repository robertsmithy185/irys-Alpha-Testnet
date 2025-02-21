import { Uploader } from "@irys/upload";
import { Ethereum } from "@irys/upload-ethereum";
import dotenv from "dotenv";

// Memuat variabel dari file .env
dotenv.config();

const getIrysUploader = async () => {
  try {
    const privateKey = process.env.PRIVATE_KEY;
    const rpcURL = process.env.RPC_URL;

    if (!privateKey)
      throw new Error("PRIVATE_KEY tidak ditemukan! Periksa file .env Anda.");
    if (!rpcURL)
      throw new Error("RPC_URL tidak ditemukan! Periksa file .env Anda.");

    const irysUploader = await Uploader(Ethereum)
      .withWallet(privateKey)
      .withRpc(rpcURL)
      .devnet();

    console.log("✅ Terhubung ke devnet!");
    return irysUploader;
  } catch (error) {
    console.error("❌ Error saat menghubungkan ke Irys Uploader:", error);
  }
};

// const fundAccount = async () => {
//   const irysUploader = await getIrysUploader();
//   if (!irysUploader) return;

//   try {
//     const fundTx = await irysUploader.fund(irysUploader.utils.toAtomic(0.02));
//     console.log(
//       `✅ Berhasil mendanai ${irysUploader.utils.fromAtomic(fundTx.quantity)} ${
//         irysUploader.token
//       }`
//     );
//   } catch (e) {
//     console.log("❌ Error saat mendanai akun:", e);
//   }
// };

// // Jalankan pendanaan setelah koneksi berhasil
// (async () => {
//   await fundAccount();
// })();

// Pastikan ini ada di akhir file index.js
export { getIrysUploader };
