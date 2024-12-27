import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(process.env.EMAIL_API_KEY!);

export async function POST(request: NextRequest) {
  const data = await request.json();
  try {
    const msg: any = {
      to: process.env.NEXT_PUBLIC_SENDGRID_EMAIL_TO,
      from: process.env.NEXT_PUBLIC_SENDGRID_EMAIL_FROM,
      body: data?.message,
      subject: `Contract for Booking ${data?.bookingId}`,
      html: data?.htmlContent,
      attachments: [
        {
          content: data.fileData,
          filename: data.fileName,
          type: data.mimeType,
          disposition: "attachment",
        },
      ],
    };

    const res = await sendgrid.send(msg);
    return NextResponse.json(res[0].statusCode);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: error?.code || 400 },
    );
  }
}
