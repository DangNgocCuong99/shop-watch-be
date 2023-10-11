"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = exports.getUser = exports.sendEmail = void 0;
const user_1 = __importDefault(require("../model/user"));
const hook_1 = require("../ulti/hook");
const nodemailer_1 = __importDefault(require("nodemailer"));
const types_1 = require("../ulti/types");
const transporter = nodemailer_1.default.createTransport({
    service: "gmail",
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
const sendEmail = (otp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // send mail with defined transport object
        const info = yield transporter.sendMail({
            from: '"Fred Foo 👻" <foo@example.com>',
            to: "dangngoccuong99@gmail.com",
            subject: "Hello ✔",
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
    }
    catch (error) {
        return error;
    }
});
exports.sendEmail = sendEmail;
const getUser = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield user_1.default.find();
        res.send((0, hook_1.dataReturn)(data));
    }
    catch (error) {
        res.send((0, hook_1.errorReturn)((0, hook_1.getErrorMessage)(error)));
    }
});
exports.getUser = getUser;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = { username: 'admin', password: 'admin' };
        const check = yield user_1.default.findOne({ 'username': username, 'password': password });
        if (check) {
            if (check.status === types_1.typeStatus.inactive) {
                res.send((0, hook_1.errorReturn)("vui long kich hoat tai khoan"));
            }
            res.send((0, hook_1.dataReturn)({ username: username }, 'Đăng nhập thành công'));
        }
        else {
            res.send((0, hook_1.errorReturn)('Tài khoản hoặc mật chưa chính xác'));
        }
    }
    catch (error) {
        res.send((0, hook_1.errorReturn)((0, hook_1.getErrorMessage)(error)));
    }
});
exports.login = login;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = { username: 'admin', password: 'admin', email: 'admin@gmail.com' };
        const check = yield user_1.default.findOne({ 'username': data.username });
        if (check) {
            res.send((0, hook_1.errorReturn)('Đã tồn tại tài khoản'));
        }
        else {
            const otp = generateOTP();
            yield (0, exports.sendEmail)(otp);
            yield user_1.default.create(data);
            res.send({ status: 1, message: 'Đăng ký thành công', username: data.username });
            res.send((0, hook_1.dataReturn)({ username: data.username }, 'Đăng ky thành công'));
        }
    }
    catch (error) {
        res.send((0, hook_1.errorReturn)((0, hook_1.getErrorMessage)(error)));
    }
});
exports.register = register;
//# sourceMappingURL=user.js.map