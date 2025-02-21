import { getIrysUploader } from "./index.js"; // Pastikan sudah mengimpor fungsi getIrysUploader

const uploadFilesAndCreateFolder = async () => {
  try {
    const irysUploader = await getIrysUploader();

    // Meng-upload file terlebih dahulu
    const file1 = "./Network.png";
    const file2 = "./image2.png";
    const file3 = "./image3.png";

    // Meng-upload file dan mendapatkan ID transaksi
    const receipt1 = await irysUploader.uploadFile(file1, {
      tags: [{ name: "Content-Type", value: "image/png" }],
    });
    const receipt2 = await irysUploader.uploadFile(file2, {
      tags: [{ name: "Content-Type", value: "image/png" }],
    });
    const receipt3 = await irysUploader.uploadFile(file3, {
      tags: [{ name: "Content-Type", value: "image/png" }],
    });

    console.log(`File 1 uploaded to https://gateway.irys.xyz/${receipt1.id}`);
    console.log(`File 2 uploaded to https://gateway.irys.xyz/${receipt2.id}`);
    console.log(`File 3 uploaded to https://gateway.irys.xyz/${receipt3.id}`);

    // Membuat Map yang memetakan nama file ke ID transaksi
    const map = new Map();
    map.set("Network.png", receipt1.id);
    map.set("image2.png", receipt2.id);
    map.set("image3.png", receipt3.id);

    // Membuat manifest folder dari Map
    const manifest = await irysUploader.uploader.generateFolder({ items: map });
    console.log("Manifest generated:", JSON.stringify(manifest, null, 2));

    // Menambahkan tag untuk menunjukkan bahwa ini adalah manifest
    const tags = [
      { name: "Type", value: "manifest" },
      { name: "Content-Type", value: "application/x.irys-manifest+json" },
    ];

    // Mengunggah manifest ke Irys
    const receipt = await irysUploader.upload(JSON.stringify(manifest), {
      tags,
    });
    console.log(`Manifest uploaded to https://gateway.irys.xyz/${receipt.id}`);

    // Mendapatkan URL file yang diunggah melalui manifest
    console.log(
      `File 1 available at https://gateway.irys.xyz/${receipt.id}/Network.png`
    );
    console.log(
      `File 2 available at https://gateway.irys.xyz/${receipt.id}/image2.png`
    );
    console.log(
      `File 3 available at https://gateway.irys.xyz/${receipt.id}/image3.png`
    );
  } catch (e) {
    console.log("Error uploading files and creating onchain folder: ", e);
  }
};

// Panggil fungsi untuk meng-upload file dan membuat folder on-chain
uploadFilesAndCreateFolder();
