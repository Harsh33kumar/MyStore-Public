const nodemailer = require("nodemailer");

const sendContactEmail = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 🔥 EMAIL TO ADMIN
    await transporter.sendMail({
      from: email,
      to: process.env.ADMIN_EMAIL,
      subject: `Contact Form: ${subject}`,
html: `
<div style="font-family: Arial, sans-serif; background:#0f172a; padding:40px;">
  
  <div style="max-width:600px;margin:auto;background:#1e293b;border-radius:12px;overflow:hidden;">

    <!-- HEADER -->
    <div style="background:#06b6d4;padding:20px;text-align:center;">
      <h2 style="color:#fff;margin:0;">📩 New Contact Request</h2>
    </div>

    <!-- BODY -->
    <div style="padding:25px;color:#e2e8f0;">
      
      <p style="font-size:16px;">You have received a new message from your My Store website:</p>

      <div style="background:#0f172a;padding:15px;border-radius:8px;margin-top:15px;">
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Subject:</b> ${subject}</p>
      </div>

      <h3 style="margin-top:20px;color:#06b6d4;">Message</h3>
      <p style="line-height:1.6;background:#0f172a;padding:15px;border-radius:8px;">
        ${message}
      </p>

      <p style="margin-top:20px;font-size:12px;color:#94a3b8;">
        Reply directly to this email to respond to the user.
      </p>

    </div>

    <!-- FOOTER -->
    <div style="background:#111827;padding:15px;text-align:center;color:#64748b;font-size:12px;">
      © ${new Date().getFullYear()} My Store • All rights reserved
    </div>

  </div>
</div>
`
    });

    return res.json({
      success: true,
      message: "Message sent to admin successfully",
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Email sending failed",
    });
  }
};

module.exports = { sendContactEmail };