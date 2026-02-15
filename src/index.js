const express = require("express");
const { PORT, GMAIL_EMAIL, GMAIL_PASS } = require("./config").ServerConfig;
const apiRoutes = require("./routes");
const { Logger } = require("./config");
const amqplib = require("amqplib");
const { EmailService } = require("./services");
// const mailsender = require("./config/email_config");

async function connectQueue() {
  try {
    connection = await amqplib.connect("amqp://localhost");
    channel = await connection.createChannel();
    await channel.assertQueue("noti-queue");

    channel.consume(`noti-queue`, (data) => {
      console.log(`${Buffer.from(data.content)}`);
      const object = JSON.parse(`${Buffer.from(data.content)}`);
      EmailService.sendEmail(
        `himank6rise@gmail.com`,
        object.recipientEmail,
        object.subject,
        object.text,
      );
      channel.ack(data);
    }); // channel.sendToQueue("noti-queue", Buffer.from("one more 1,2,3"));
  } catch (error) {
    console.log(`Errorrr!!!\n`, error);
  }
}

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRoutes);

app.listen(PORT, async () => {
  console.log(`Server running on https://localhost:${PORT}`);
  Logger.info(`Successfully started the server`, `root`, {});
  // try {
  //   const response = await mailsender.sendMail({
  //     from: GMAIL_EMAIL,
  //     to: "himank10rise@gmail.com",
  //     subject: "Is the Service working",
  //     text: "Yes Sir",
  //     html: "<h1 style='color:red;' >This is the HTML body</h1>",
  //   });
  //   console.log(response);
  // } catch (error) {
  //   console.log(error);
  // }
  await connectQueue();
  console.log(`Queue is up`);
});
