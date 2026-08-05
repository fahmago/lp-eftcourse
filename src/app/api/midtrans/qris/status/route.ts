import { NextRequest, NextResponse } from "next/server";

const midtransClient = require("midtrans-client");

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get("order_id");

    if (!orderId) {
      return NextResponse.json(
        { error: "order_id diperlukan." },
        { status: 400 }
      );
    }

    const core = new midtransClient.CoreApi({
      isProduction: process.env.MIDTRANS_IS_PRODUCTION === "true",
      serverKey: process.env.MIDTRANS_SERVER_KEY,
      clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY,
    });

    const status = await core.transaction.status(orderId);

    return NextResponse.json({
      order_id: status.order_id,
      transaction_status: status.transaction_status,
      fraud_status: status.fraud_status,
      gross_amount: status.gross_amount,
    });
  } catch (error: any) {
    console.error("Midtrans Status Error:", error?.message || error);
    return NextResponse.json(
      { error: "Gagal mengecek status transaksi." },
      { status: 500 }
    );
  }
}
