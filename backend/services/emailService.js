const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

exports.sendMail = async ({
  to,
  cc,
  subject,
  html,
  attachments = [],
}) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "2BHK Interiors <no-reply@inquiry.errorr.in>",
      to: Array.isArray(to) ? to : [to],
      cc: cc
        ? Array.isArray(cc)
          ? cc
          : [cc]
        : undefined,
      subject,
      html,
      attachments: attachments.length
        ? attachments.map((file) => ({
            filename: file.filename,
            content: file.content,
          }))
        : undefined,
    });

    if (error) {
      console.error("RESEND API ERROR:", error);
      throw error;
    }

    console.log("RESEND SUCCESS:", data);
    return data;
  } catch (error) {
    console.error("RESEND ERROR:", error);
    throw error;
  }
};
