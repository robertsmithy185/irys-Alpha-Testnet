import { fileTypeFromBuffer } from "file-type";
import fetch from "node-fetch";
import { getIrysUploader } from "./index.js";

// Fungsi untuk mengunduh data dari IPFS
const downloadFromIPFS = async (ipfsCID) => {
  try {
    const ipfsURL = `https://ipfs.io/ipfs/${ipfsCID}`;
    const response = await fetch(ipfsURL);

    if (!response.ok) {
      throw new Error(`Data tidak ditemukan di IPFS: ${response.statusText}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    return buffer;
  } catch (error) {
    console.error("Error saat mengunduh data dari IPFS:", error);
    throw error;
  }
};

// Fungsi untuk mengunggah data ke Irys
const uploadToIrys = async (dataToUpload) => {
  const irysUploader = await getIrysUploader();

  if (!irysUploader) {
    console.log("❌ Gagal mendapatkan uploader.");
    return;
  }

  try {
    const receipt = await irysUploader.upload(dataToUpload);
    console.log(`✅ Data berhasil diunggah!`);
    console.log(`🔗 URL: https://gateway.irys.xyz/${receipt.id}`);
  } catch (e) {
    console.log("❌ Error saat mengunggah data:", e);
  }
};

// Fungsi utama untuk memigrasi data dari IPFS ke Irys
const migrateFromIPFSToIrys = async (ipfsCID) => {
  try {
    // 1. Mengunduh data dari IPFS
    const data = await downloadFromIPFS(ipfsCID);

    // 2. Menentukan tipe konten dari data yang diunduh
    const contentType = await fileTypeFromBuffer(data);
    if (!contentType) {
      throw new Error("Tidak dapat menentukan tipe konten");
    }

    console.log(`Tipe Konten yang terdeteksi: ${contentType.mime}`);

    // 3. Mengunggah data ke Irys
    await uploadToIrys(data);
  } catch (error) {
    console.error("Terjadi kesalahan saat migrasi data:", error);
  }
};

// Gantilah CID ini dengan CID yang valid
const ipfsCID = "QmcAhEN1MJWPsN9Bd5Sud24WFQh3Nfn35oeBwJehRJzQyL"; // CID contoh
migrateFromIPFSToIrys(ipfsCID);
