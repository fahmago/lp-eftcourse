import { NextRequest, NextResponse } from "next/server";
const midtransClient = require("midtrans-client");

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, whatsapp, category, schedule, session } = body;

    // Basic validation
    if (!name || !whatsapp || !email || !category || !schedule || !session) {
      return NextResponse.json(
        { error: "Mohon lengkapi semua data pendaftaran." },
        { status: 400 }
      );
    }

    // Create Snap API instance
    const snap = new midtransClient.Snap({
      isProduction: process.env.MIDTRANS_IS_PRODUCTION === "true",
      serverKey: process.env.MIDTRANS_SERVER_KEY,
      clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY,
    });

    const orderId = `EFT-${category}-${Date.now()}`;
    const grossAmount = 5000;

    const parameter = {
      transaction_details: {
        order_id: orderId,
        gross_amount: grossAmount,
      },
      item_details: [
        {
          id: `CLASS-${category}`,
          price: grossAmount,
          quantity: 1,
          name: `EFT Course - Kelas ${category} (${schedule}, ${session})`,
        },
      ],
      customer_details: {
        first_name: name,
        email: email,
        phone: whatsapp,
      },
      enabled_payments: [
        "bca_va",
        "bni_va",
        "bri_va",
        "permata_va",
        "qris",
      ],
    };

    const transaction = await snap.createTransaction(parameter);

    return NextResponse.json({
      token: transaction.token,
      redirect_url: transaction.redirect_url,
    });
  } catch (error: any) {
    console.error("Midtrans Error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat memproses pembayaran." },
      { status: 500 }
    );
  }
}
