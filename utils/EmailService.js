import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
import logger from "./Logger.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmail = (to, subject, templateName, replacements) => {
  const templatePath = path.join(__dirname, "../templates", templateName);

  fs.readFile(templatePath, "utf8", (err, html) => {
    if (err) {
      logger.error("Error reading email template:", err);
      return;
    }

    const htmlWithReplacements = html.replace(
      /{{(\w+)}}/g,
      (_, key) => replacements[key] || ""
    );

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      html: htmlWithReplacements,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        logger.error("Error sending email:", error);
      } else {
        logger.info("Email sent:", info.response);
      }
    });
  });
};

export const sendOtp = (to, subject, templateName, replacements) => {
  const templatePath = path.join(__dirname, "../templates", templateName);

  fs.readFile(templatePath, "utf8", (err, html) => {
    if (err) {
      logger.error("Error reading email template:", err);
      return;
    }

    const htmlWithReplacements = html.replace(
      /{{\s*(\w+)\s*}}/g,
      (_, key) => replacements[key] || ""
    );

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      html: htmlWithReplacements,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        logger.error("Error sending email:", error);
      } else {
        logger.info("Email sent:", info.response);
      }
    });
  });
};
