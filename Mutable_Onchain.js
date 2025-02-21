import "dotenv/config";
import fetch from "node-fetch";
import { getIrysUploader } from "./index.js";

// Fungsi untuk mengunduh manifest asli
const downloadOriginalManifest = async (originalManifestId) => {
  try {
    const response = await fetch(
      `https://gateway.irys.xyz/${originalManifestId}`
    );
    if (!response.ok)
      throw new Error(
        `HTTP Error: ${response.status} - ${response.statusText}`
      );

    const manifestData = await response.json();
    console.log("Original Manifest downloaded:", manifestData);
    return manifestData;
  } catch (error) {
    console.error("Error downloading original manifest:", error);
    throw error;
  }
};

// Fungsi untuk mengunggah file ke Irys
const uploadFileToIrys = async (filePath) => {
  const irysUploader = await getIrysUploader();
  const receipt = await irysUploader.uploadFile(filePath, {
    tags: [{ name: "Content-Type", value: "image/png" }],
  });
  console.log(`File uploaded to https://gateway.irys.xyz/${receipt.id}`);
  return receipt.id;
};

// Fungsi untuk menambahkan file baru ke manifest
const appendToManifest = (originalManifest, newFiles) => {
  newFiles.forEach((txId, fileName) => {
    originalManifest.paths[fileName] = { id: txId };
  });
  return originalManifest;
};

// Fungsi untuk mengunggah manifest yang sudah diperbarui
const uploadManifest = async (manifest, originalManifestId) => {
  const irysUploader = await getIrysUploader();

  const manifestTags = [
    { name: "Type", value: "manifest" },
    { name: "Content-Type", value: "application/x.irys-manifest+json" },
    { name: "Root-TX", value: originalManifestId },
  ];

  try {
    const manifestResponse = await irysUploader.upload(
      JSON.stringify(manifest),
      { tags: manifestTags }
    );
    console.log(
      `Manifest uploaded ==> https://gateway.irys.xyz/mutable/${originalManifestId}`
    );
  } catch (e) {
    console.error("Error uploading manifest", e);
  }
};

// Fungsi utama untuk membuat dan mengupdate folder on-chain
const createOnchainFolder = async () => {
  try {
    const originalManifestId = "8eNpkShMwdbiNBtGuVGBKp8feDZCa21VppX2eDi3eLME"; // Ganti dengan originalManifestId Anda

    // Langkah 1: Mengunduh manifest asli
    const originalManifest = await downloadOriginalManifest(originalManifestId);
    const irysUploader = await getIrysUploader();

    // Meng-upload file terlebih dahulu
    const file1 = "./Network.png";
    const file2 = "./image2.png";
    const file3 = "./image3.png";

    // Meng-upload file dan mendapatkan ID transaksi
    const receipt1 = await uploadFileToIrys(file1);
    const receipt2 = await uploadFileToIrys(file2);
    const receipt3 = await uploadFileToIrys(file3);

    console.log(`File 1 uploaded to https://gateway.irys.xyz/${receipt1}`);
    console.log(`File 2 uploaded to https://gateway.irys.xyz/${receipt2}`);
    console.log(`File 3 uploaded to https://gateway.irys.xyz/${receipt3}`);

    // Langkah 2: Menyiapkan file baru untuk ditambahkan ke manifest
    const newFiles = new Map();
    newFiles.set("image1.png", receipt1);
    newFiles.set("image2.png", receipt2);

    // Langkah 3: Menambahkan file baru ke manifest
    const updatedManifest = appendToManifest(originalManifest, newFiles);

    // Langkah 4: Mengunggah manifest yang sudah diperbarui
    await uploadManifest(updatedManifest, originalManifestId);
  } catch (e) {
    console.error("Error creating onchain folder:", e);
  }
};

// Memanggil fungsi untuk membuat folder on-chain
createOnchainFolder();
