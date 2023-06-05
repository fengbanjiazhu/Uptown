const nodemailer = require("nodemailer");
const pug = require("pug");
const { convert } = require("html-to-text");

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(" ")[0];
    this.url = url;
    this.from = `Uptown Surry Hills <${process.env.EMAIL_FROM}>`;
  }

  //1  create a transporter
  newTransport() {
    // Sendgrid
    return nodemailer.createTransport({
      host: "smtp.sendgrid.net",
      port: 587,
      auth: {
        user: process.env.SENDGRID_USERNAME,
        pass: process.env.SENDGRID_PASSWORD,
      },
    });
  }

  // send the actual email
  async send(template, subject) {
    const html = pug.renderFile(`${__dirname}/email/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject,
    });

    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: convert(html),
    };

    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send("welcome", "Welcome to the Uptown!");
  }

  async sendPasswordReset() {
    await this.send("passwordReset", "Your password reset token (valid for 10 minutes)");
  }

  async sendOrder() {
    await this.send("OrderInfo", "Thank you for shopping with Uptown!");
  }

  async sendReply() {
    await this.send("reply", "Thank you for reaching out to Uptown!");
  }

  async sendSubscribe(title) {
    await this.send("subscribe", `${title}`);
  }
};
