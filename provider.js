import IrysClient from "@irys/js"; // Import IrysClient dari library
import { ethers } from "ethers";

const setupIrysClient = async () => {
  // 1. Membuat client Irys
  const irysClient = await new IrysClient("https://testnet-rpc.irys.xyz/v1");

  // 2. Menggunakan provider dari ethers.js
  const provider = new ethers.JsonRpcProvider(
    "https://testnet-rpc.irys.xyz/v1/execution-rpc"
  );

  // 3. Private Key Ethereum (GANTI dengan private key yang benar)
  const privateKey =
    "0x638a2b4f6617ecee17643177de33ade15c3e81a4d35175c93b9fd2403be06cc8";

  if (!privateKey || privateKey.length !== 66) {
    console.error(
      "❌ Private Key tidak valid! Harus memiliki panjang 66 karakter termasuk '0x'."
    );
    return;
  }

  try {
    // 4. Membuat wallet menggunakan ethers.js
    const wallet = new ethers.Wallet(privateKey, provider);

    // 5. Mendapatkan alamat wallet
    const irysAddress = await wallet.getAddress();
    console.log(`✅ Alamat Irys Anda: ${irysAddress}`);

    // 6. Mengecek saldo di jaringan Irys
    const balance = await provider.getBalance(irysAddress);
    const balanceInIrys = ethers.formatUnits(balance, 18);
    console.log(`💰 Saldo Anda: ${balanceInIrys} IRYS`);

    if (parseFloat(balanceInIrys) === 0) {
      throw new Error("❌ Saldo Anda 0, mohon isi saldo terlebih dahulu.");
    }

    // --- MULAI TRANSAKSI DATA ---
    const data = Buffer.from(
      "Hello, Irys Testnet! I'm Robert. Contact me at t.me/Pemyla",
      "utf-8"
    );

    // Membuat transaksi di Irys
    const tx = irysClient.createTransaction({
      data: data,
      tags: [{ name: "Content-Type", value: "text/plain" }],
    });

    await tx.prepareChunks(data);
    console.log("📦 Data siap untuk diunggah dalam bentuk chunks.");

    const { termFee, permFee } = await tx.getFees();
    console.log(
      `💸 Biaya Term: ${termFee} mIrys, Biaya Perm: ${permFee} mIrys`
    );

    const fee = await tx.getFee();
    console.log(`💸 Total Biaya: ${fee} mIrys`);

    if (fee > balance) {
      throw new Error("❌ Saldo tidak cukup untuk biaya transaksi.");
    }

    // Menandatangani transaksi dengan private key
    const signedTx = await tx.sign(privateKey);
    console.log("✍️ Transaksi berhasil ditandatangani.");

    // Mengunggah transaksi ke jaringan Irys
    await signedTx.uploadHeader();
    console.log("📤 Header transaksi berhasil diunggah.");

    await signedTx.uploadChunks(data);
    console.log("✅ Data berhasil diunggah ke Irys!");

    console.log(`🔗 ID Transaksi: ${signedTx.id}`);
  } catch (error) {
    console.error("❌ Terjadi kesalahan:", error.message || error);
  }
};

// Menjalankan fungsi
setupIrysClient();
