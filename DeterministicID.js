import { randomBytes } from "crypto";
import { getIrysUploader } from "./index.js";

const deterministicIDUpload = async () => {
  try {
    // 1. Dapatkan referensi Irys yang telah dikonfigurasi
    const irys = await getIrysUploader();

    // 2. Buat anchor acak (32 byte)
    const anchor = randomBytes(16).toString("hex");
    console.log(`Anchor: ${anchor}`);

    // 3. Buat transaksi pertama dengan anchor
    const tx1 = irys.createTransaction("Hirys Irys!", {
      tags: [{ name: "content-type", value: "text/plain" }],
      anchor,
    });

    // 4. Tanda tangani transaksi pertama
    await tx1.sign();
    console.log(`Tx1 ID: ${tx1.id}`); // ID ditentukan setelah ditandatangani

    // 5. Buat transaksi kedua dengan data dan anchor yang sama
    const tx2 = irys.createTransaction("Hirys Irys!", {
      tags: [{ name: "content-type", value: "text/plain" }],
      anchor,
    });

    // 6. Tanda tangani transaksi kedua
    await tx2.sign();
    console.log(`Tx2 ID: ${tx2.id}`); // ID harus sama dengan Tx1

    // 7. Unggah transaksi kedua
    const receipt = await tx2.upload();
    console.log(
      `Transaksi berhasil diunggah. Lihat di: https://gateway.irys.xyz/${receipt.id}`
    );
  } catch (error) {
    console.error("Terjadi kesalahan saat memproses transaksi:", error);
  }
};

// Jalankan fungsi
deterministicIDUpload();
