const itemModel = require('../model/index')

exports.getItem = async(req,res)=>{
    try {
        const activePage = +req.query.activePage
        const limit = +req.query.limit
        const skip = (activePage -1)*limit
        const record = await itemModel.countDocuments()
        const totalPage = Math.ceil(record/limit)
        const listData = await itemModel.find().skip(skip).limit(limit)
        res.send({
            listData, totalPage,activePage
        })

    } catch (error) {
        res.send(404)
    }
}

exports.searchItem = async(req,res)=>{
    try {
        const text = req.query.text
        const activePage = +req.query.activePage
        const limit = +req.query.limit
        const skip = (activePage -1)*limit
        const record = await itemModel.find({name:{$regex: text , $options :'i'}})
        const totalPage = Math.ceil(record.length/limit)
        const listData = await itemModel.find({name:{$regex: text , $options :'i'}}).skip(skip).limit(limit)
        res.send({
            listData, totalPage
        })

    } catch (error) {
        res.send(404)
    }
}

exports.postItem = async(req,res) => {
    try {
        const data = req.body
        console.log("🚀 ~ file: index.js:41 ~ exports.postItem=async ~ data:", data)
        const postItem = await itemModel.create(data)
        res.send(data)
    } catch (error) {
        res.send(404)
    }
}

exports.putItem = async(req, res) => {
    try {
        const id = req.params.id
        const name = req.body
        const putItem = await itemModel.findByIdAndUpdate(id,name)
        res.send({
            id:id
            ,name})
    } catch (error) {
        res.send(404)
    }
}
exports.deleteItem = async(req, res) => {
    try {
        const id = req.params.id
        const deleteItem = await itemModel.findByIdAndDelete(id)
        res.send(deleteItem)
    } catch (error) {
        res.send(404)
    }
}