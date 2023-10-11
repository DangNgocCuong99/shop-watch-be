import { RequestHandler } from 'express';
import UserModel from "../model/user"
import { dataReturn, errorReturn, getErrorMessage } from "../ulti/hook"
import nodemailer from 'nodemailer'
import { typeStatus } from '../ulti/types';

const transporter = nodemailer.createTransport({
    service:"gmail",
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: "cuongdangngoc99@gmail.com",
      pass: "hqjxjxdvygasljdo",
    },
  });

  function generateOTP() {
    const digits = '0123456789';
    let otp = '';
  
    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * digits.length);
      otp += digits[randomIndex];
    }
  
    return otp;
  }
  
  // async..await is not allowed in global scope, must use a wrapper
  export const  sendEmail = async (otp:string) =>{
    try {
            // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: "dangngoccuong99@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: `ma otp cua ban la ${otp}`, // plain text body
        // html: "<b>Hello world?</b>", // html body
      });
    
      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    
      //
      // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
      //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
      //       <https://github.com/forwardemail/preview-email>
      //
      return info.messageId;
    } catch (error) {
       return error
    }

  }


export const getUser: RequestHandler = async (_req, res) => {
    try {
        const data = await UserModel.find()
        res.send(dataReturn(data))
    } catch (error) {
        res.send(errorReturn(getErrorMessage(error)))
    }
}

export const login: RequestHandler = async (req, res) => {
    try {
        const { username, password } = {username:'admin', password:'admin'}
        const check = await UserModel.findOne({ 'username': username, 'password': password })
        if (check) {
            if (check.status === typeStatus.inactive){
                res.send(errorReturn("vui long kich hoat tai khoan"))
            }
            res.send(dataReturn({username:username},'Đăng nhập thành công'))

        } else {
            res.send(errorReturn('Tài khoản hoặc mật chưa chính xác'))
        }
    } catch (error) {
        res.send(errorReturn(getErrorMessage(error)))
    }
}

export const register: RequestHandler = async (req, res) => {
    try {
        const data = {username:'admin', password:'admin',email:'admin@gmail.com'}
        const check = await UserModel.findOne({ 'username': data.username })
        if (check) {
            res.send(errorReturn('Đã tồn tại tài khoản'))
        } else {
            const otp = generateOTP()
            await sendEmail(otp)
            await UserModel.create(data)
            res.send({ status: 1, message: 'Đăng ký thành công', username: data.username })
            res.send(dataReturn({username:data.username},'Đăng ky thành công'))

        }
    } catch (error) {
        res.send(errorReturn(getErrorMessage(error)))
    }
}