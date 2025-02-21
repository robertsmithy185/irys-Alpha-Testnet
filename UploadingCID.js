import IPFS from "ipfs-only-hash";
import { getIrysUploader } from "./index.js";

// Fungsi untuk menghasilkan CID dari konten
const generateCID = async (content) => {
  return await IPFS.of(content);
};

// Fungsi untuk mengunggah data ke Irys dengan CID
const uploadToIrysWithCID = async () => {
  try {
    // 1. Dapatkan referensi Irys yang telah dikonfigurasi
    const irys = await getIrysUploader();

    // 2. Konten yang akan diunggah
    const dataToUpload = "Irys + IPFS Content ID";

    // 3. Buat CID dari konten
    const contentID = await generateCID(dataToUpload);
    console.log(`ContentID (IPFS CID): ${contentID}`);

    // 4. Tambahkan tag untuk metadata
    const tags = [
      { name: "Content-Type", value: "text/html" },
      { name: "IPFS-CID", value: contentID }, // Menyisipkan CID ke metadata
    ];

    // 5. Unggah data ke Irys
    const receipt = await irys.upload(dataToUpload, { tags: tags });

    // 6. Tampilkan URL hasil unggahan
    console.log(`Transaction ID URL: https://gateway.irys.xyz/${receipt.id}`);
    console.log(
      `Content ID URL (IPFS): https://gateway.irys.xyz/ipfs/${contentID}`
    );
  } catch (error) {
    console.error("Terjadi kesalahan saat mengunggah data:", error);
  }
};

// Jalankan fungsi
uploadToIrysWithCID();
