import { getIrysUploader } from "./index.js";

const fundAccount = async () => {
  const irysUploader = await getIrysUploader();
  if (!irysUploader) return;

  try {
    const fundTx = await irysUploader.fund(irysUploader.utils.toAtomic(0.0001));
    console.log(
      `✅ Berhasil mendanai ${irysUploader.utils.fromAtomic(fundTx.quantity)} ${
        irysUploader.token
      }`
    );
  } catch (e) {
    console.log("❌ Error saat mendanai akun:", e);
  }
};

// Jalankan pendanaan setelah koneksi berhasil
(async () => {
  await fundAccount();
})();
