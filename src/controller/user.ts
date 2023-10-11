import { RequestHandler } from 'express';
import UserModel from "../model/user"
import { dataReturn, errorReturn, getErrorMessage } from "../ulti/hook"


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
        const { userName, password } = req.body
        const check = await UserModel.findOne({ 'userName': userName, 'password': password })
        if (check) {
            res.send(dataReturn({userName:userName},'Đăng nhập thành công'))
        } else {
            res.send(errorReturn('Tài khoản hoặc mật chưa chính xác'))
        }
    } catch (error) {
        res.send(errorReturn(getErrorMessage(error)))
    }
}

export const register: RequestHandler = async (req, res) => {
    try {
        const data = req.body
        const check = await UserModel.findOne({ 'userName': data.userName })
        if (check) {
            res.send({ status: 0, message: 'Đã tồn tại tài khoản' })
        } else {
            await UserModel.create(data)
            res.send({ status: 1, message: 'Đăng ký thành công', userName: data.userName })
        }
    } catch (error) {
        res.send(errorReturn(getErrorMessage(error)))
    }
}