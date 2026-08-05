import { NextRequest, NextResponse } from "next/server";

const midtransClient = require("midtrans-client");

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, whatsapp, category, schedule, session } = body;

    if (!name || !whatsapp || !email || !category || !schedule || !session) {
      return NextResponse.json(
        { error: "Mohon lengkapi semua data pendaftaran." },
        { status: 400 }
      );
    }

    const core = new midtransClient.CoreApi({
      isProduction: process.env.MIDTRANS_IS_PRODUCTION === "true",
      serverKey: process.env.MIDTRANS_SERVER_KEY,
      clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY,
    });

    const orderId = `EFT-QRIS-${category}-${Date.now()}`;
    const grossAmount = 5000;

    const parameter = {
      payment_type: "qris",
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
      qris: {},
    };

    const transaction = await core.charge(parameter);

    // QRIS response contains qr_code_url in actions
    const qrCodeAction = transaction.actions?.find(
      (a: any) => a.name === "generate-qr-code"
    );

    return NextResponse.json({
      order_id: orderId,
      qr_code_url: qrCodeAction?.url || transaction.qr_code_url || null,
      gross_amount: grossAmount,
      transaction_status: transaction.transaction_status,
    });
  } catch (error: any) {
    const msg = error?.ApiResponse?.status_message || error?.message || "Unknown error";
    console.error("Midtrans QRIS Error:", msg, error?.rawHttpClientData || "");
    return NextResponse.json(
      { error: `Gagal membuat QRIS: ${msg}` },
      { status: 500 }
    );
  }
}
