import { getIrysUploader } from "./index.js";

// Fungsi untuk mengambil data dari Irys menggunakan CID
const fetchData = async (ipfsCID) => {
  try {
    // Menggunakan gateway Irys untuk mengunduh data berdasarkan CID
    const url = `https://gateway.irys.xyz/ipfs/${ipfsCID}`;
    console.log(`Mencoba mengakses URL: ${url}`);

    // Melakukan fetch ke URL
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Data tidak ditemukan");
    }

    // Mengambil data sebagai teks atau JSON sesuai jenis data
    const data = await response.text(); // Ganti dengan .json() jika data berupa JSON
    console.log("Data berhasil diambil:", data);

    return data;
  } catch (error) {
    console.error("❌ Error saat mengambil data:", error);
  }
};

// Fungsi utama untuk mendownload dan menampilkan data
const downloadData = async () => {
  try {
    // 1. Dapatkan referensi Irys yang telah dikonfigurasi
    const irys = await getIrysUploader();

    // 2. Ambil CID dari metadata atau input lain
    const contentCID = "QmcAhEN1MJWPsN9Bd5Sud24WFQh3Nfn35oeBwJehRJzQyL"; // Ganti dengan CID yang valid

    console.log(`Mengambil data untuk CID: ${contentCID}`);

    // 3. Mengunduh data menggunakan CID
    const data = await fetchData(contentCID);

    // 4. Menampilkan hasil data
    console.log("Data dari CID:", data);
  } catch (error) {
    console.error("Terjadi kesalahan saat mengunduh data:", error);
  }
};

// Jalankan fungsi utama untuk mengunduh data
downloadData();
