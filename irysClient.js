import IrysClient from "@irys/js"; // Import IrysClient dari library

// Fungsi untuk membuat client, mendapatkan alamat, dan cek saldo
const setupIrysClient = async () => {
  // 1. Membuat client Irys
  const irysClient = await new IrysClient("https://testnet-rpc.irys.xyz/v1");

  // 2. Private Key Ethereum (ganti dengan private key Anda sendiri)
  const privateKey =
    "0x638a2b4f6617ecee17643177de33ade15c3e81a4d35175c93b9fd2403be06cc8";

  try {
    // 3. Mendapatkan alamat Irys dari private key
    const { irys: irysAddress } = irysClient.account.getAddresses(privateKey);
    console.log(`✅ Alamat Irys Anda: ${irysAddress}`);

    // 4. Mengecek saldo Irys dalam mIrys
    const balanceInMIrys = await irysClient.account.getBalance(irysAddress);
    console.log(`💰 Saldo Anda: ${balanceInMIrys} mIrys`);

    // --- MULAI TRANSAKSI DATA ---
    // Data yang akan diunggah, bisa berupa string atau buffer
    const data = Buffer.from("Hello, Irys Testnet! im Robert");

    // Membuat transaksi
    const tx = irysClient.createTransaction({
      data: data,
      tags: [{ name: "Content-Type", value: "text/plain" }], // Menambahkan tag (opsional)
    });

    // Menyiapkan chunk data untuk transaksi
    await tx.prepareChunks(data);
    console.log("📦 Data siap untuk diunggah dalam bentuk chunks.");

    // Memeriksa biaya transaksi
    const { termFee, permFee } = await tx.getFees();
    console.log(
      `💸 Biaya Term: ${termFee} mIrys, Biaya Perm: ${permFee} mIrys`
    );

    // Mendapatkan total biaya transaksi
    const fee = await tx.getFee();
    console.log(`💸 Total Biaya: ${fee} mIrys`);

    // Menandatangani transaksi dengan private key
    const signedTx = await tx.sign(privateKey);
    console.log("✍️ Transaksi berhasil ditandatangani.");

    // Mengunggah header transaksi
    await signedTx.uploadHeader();
    console.log("📤 Header transaksi berhasil diunggah.");

    // Mengunggah data transaksi
    await signedTx.uploadChunks(data);
    console.log("✅ Data berhasil diunggah ke Irys!");

    console.log(`🔗 ID Transaksi: ${signedTx.id}`);
  } catch (error) {
    console.error("❌ Terjadi kesalahan:", error);
  }
};

// Menjalankan fungsi
setupIrysClient();
