const{ searchItem, postItem,putItem,deleteItem,getItem }= require("../controller/index")
const routes = (app) =>{
    app.get('/', getItem)
    app.get('/search',searchItem)
    app.post('/',postItem)
    app.put('/:id', putItem)
    app.delete('/:id', deleteItem)
}
module.exports = routes