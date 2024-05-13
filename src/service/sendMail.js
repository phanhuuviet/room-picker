import nodemailer from 'nodemailer';
export const sendEmail = async (data) => {
    try {
        console.log(data);
    //   const transporter = nodemailer.createTransport({
    //     port: 24700,
    //     host: '103.166.182.195',
    //   });
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'longhdph28352@fpt.edu.vn',
          pass: 'qnwggskitxtjpaax',
        },
        tls: {
          rejectUnauthorized: false,
        },
      });
      const info = await transporter.sendMail({
        from: '"🙋🏻‍♂️Hệ thống đặt phòng trực tuyến" <bookingTravel@gmail.com',
        subject: data.subject,
        text: data.text,
        html: data.html,
        to: data.to,
      });
      console.log(info);
      return {
        success: true,
        message: 'Email sent successfully',
        info: info,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Error sending email',
        error: error.message,
      };
    }
  };