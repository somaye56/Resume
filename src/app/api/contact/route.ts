import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: "تمام فیلدها لازم است" },
        { status: 400 }
      );
    }


    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER, 
        pass: process.env.SMTP_PASS, // App Password
      },
    });

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.SMTP_USER, 
      subject: `پیام جدید از ${name}`,
      text: `فرستنده: ${name}\nایمیل: ${email}\n\nپیام:\n${message}`,
    };

    const info = await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: " پیام با موفقیت ارسال شد ✅",
      info,
    });
  } catch (error: any) {
    console.error("Email error:", error);
    return NextResponse.json(
      { success: false, message: "خطا در ارسال ایمیل", error: error.message },
      { status: 500 }
    );
  }
}
