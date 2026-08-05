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

    const snap = new midtransClient.Snap({
      isProduction: process.env.MIDTRANS_IS_PRODUCTION === "true",
      serverKey: process.env.MIDTRANS_SERVER_KEY,
      clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY,
    });

    const status = await snap.transaction.status(orderId);

    return NextResponse.json({
      order_id: status.order_id,
      transaction_status: status.transaction_status,
      fraud_status: status.fraud_status,
      gross_amount: status.gross_amount,
    });
  } catch (error: any) {
    const msg = error?.ApiResponse?.status_message || error?.message || "Unknown error";
    console.error("Midtrans Status Error:", msg);
    return NextResponse.json(
      { error: `Gagal mengecek status: ${msg}` },
      { status: 500 }
    );
  }
}
