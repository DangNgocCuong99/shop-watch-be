import { RequestHandler } from "express"
import productModel from "../model/product"
import { dataReturn, errorReturn, getErrorMessage } from "../ulti/hook"
import FavoriteModel from "../model/favorite"

export const getProduct: RequestHandler = async (req, res)=>{
    try {
        const userId =123
        const data = await productModel.find()
        const listIdFavoriteProduct = (await FavoriteModel.find({userId: userId})).map((i)=> i.productId)
        data.map((i)=>(
            {
                ...data,
                favorite: listIdFavoriteProduct.includes(i._id)
            }
        ))
        res.send(dataReturn(data))
    } catch (error) {
        res.send(errorReturn(getErrorMessage(error)))
    }
}

