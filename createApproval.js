import { getIrysUploader } from "./index.js"; // Pastikan Anda mengimpor getIrysUploader dengan benar

const createApproval = async (approvedAddress) => {
  try {
    // Mendapatkan Irys Uploader
    const irysUploader = await getIrysUploader();

    // Membuat persetujuan baru
    const approvalReceipt = await irysUploader.approval.createApproval({
      amount: irysUploader.utils.toAtomic(1), // Jumlah yang disetujui dalam atomic units (1 unit)
      approvedAddress: approvedAddress, // Alamat yang disetujui untuk pembayaran
      expiresInSeconds: 100, // Persetujuan berlaku selama 100 detik
    });

    console.log("Approval created:", approvalReceipt);
    return approvalReceipt;
  } catch (e) {
    console.error("Error creating approval:", e);
    throw e;
  }
};

// Memanggil fungsi untuk membuat persetujuan
const approvedAddress = "0xc411329f95e887526A40B66f4B27234f8ca9c366"; // Ganti dengan alamat yang sesuai
createApproval(approvedAddress);
