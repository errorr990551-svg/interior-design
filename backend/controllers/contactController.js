const { sendMail } = require("../services/emailService");

// Form values are interpolated into the notification email's HTML, so escape them.
const escapeHtml = (value) =>
  String(value ?? "")
    .slice(0, 5000)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");


exports.submitContactForm = async (req, res) => {
  try {
    const name = escapeHtml(req.body.name).trim();
    const email = escapeHtml(req.body.email).trim();
    const phone = escapeHtml(req.body.phone).trim();
    const company = escapeHtml(req.body.company).trim();
    const projectType = escapeHtml(req.body.projectType).trim();
    const budget = escapeHtml(req.body.budget).trim();
    const message = escapeHtml(req.body.message);

    // Honeypot field is hidden from people; bots that fill it get a success response and no email.
    if (req.body.website) {
      return res.status(200).json({ success: true, message: "Consultation request sent successfully" });
    }

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "Name and email are required",
      });
    }

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #262626; border-radius: 8px; background-color: #ffffff; color: #171717;">
        <div style="background-color: #121212; padding: 24px; text-align: center; border-radius: 6px 6px 0 0;">
          <h1 style="color: #ffffff; margin: 0; font-size: 20px; letter-spacing: 2px;">2BHK INTERIORS</h1>
          <p style="color: #fbbf24; margin: 6px 0 0; font-size: 13px; letter-spacing: 1px; text-transform: uppercase;">Private Consultation Request</p>
        </div>
        <div style="padding: 24px;">
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eeeeee; color: #666666; width: 40%;"><strong>Full Name:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eeeeee; color: #111111;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eeeeee; color: #666666;"><strong>Email Address:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eeeeee; color: #111111;"><a href="mailto:${email}" style="color: #2563eb;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eeeeee; color: #666666;"><strong>Phone Number:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eeeeee; color: #111111;">${phone ? `<a href="tel:${phone}" style="color: #2563eb;">${phone}</a>` : "Not provided"}</td>
            </tr>
            ${company ? `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eeeeee; color: #666666;"><strong>Company / Location:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eeeeee; color: #111111;">${company}</td>
            </tr>
            ` : ""}
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eeeeee; color: #666666;"><strong>Project Type:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eeeeee; color: #111111;">${projectType || "Residential Interiors"}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eeeeee; color: #666666;"><strong>Estimated Budget:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eeeeee; color: #111111;">${budget || "Not provided"}</td>
            </tr>
          </table>

          <div style="margin-top: 24px; padding: 16px; background-color: #f8f8f8; border-left: 4px solid #121212; border-radius: 4px;">
            <strong style="font-size: 13px; color: #444444; text-transform: uppercase; letter-spacing: 0.5px;">Project Notes / Vision:</strong>
            <p style="margin: 8px 0 0; color: #222222; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message || "No additional project notes provided."}</p>
          </div>
        </div>
        <div style="text-align: center; padding: 16px; font-size: 11px; color: #888888; border-top: 1px solid #eeeeee;">
          Received from 2BHK Interiors Consultation Form
        </div>
      </div>
    `;

    // Trigger email send without awaiting (Non-blocking for fast UI response)
    sendMail({
      to: "akshat99055@gmail.com",
      cc: ["errorr990551@gmail.com"],
      subject: `New Consultation Request: ${name} (${projectType || "Interior Design"})`,
      html: emailHtml,
    })
      .then((result) => console.log("Background Email SENT successfully:", result))
      .catch((error) => console.error("Background Email FAILED:", error));

    // Respond immediately to the frontend
    res.status(200).json({ success: true, message: "Consultation request sent successfully" });
  } catch (err) {
    console.error("submitContactForm error:", err);
    res.status(500).json({ success: false, message: "Failed to send message" });
  }
};
