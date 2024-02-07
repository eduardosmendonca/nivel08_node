const { Router } = require("express");


const UsersController = require("../controllers/UsersController")

const usersRoutes = Router();

/* 
// Middlewares - é um segurança das requisições - faz o filtro de usuário - permissões
function myMyddleware (request, response, next){ 
    console.log("passou pelo middleware");
    if(!request.body.isAdmin){
        return response.json({ message: "user unauthorized" });
    };

    next();
}
*/

const usersController = new UsersController();

/*
userRoutes.use(myMyddleware); // dessa maneira passa o myddleware para todas as rotas
userRoutes.post("/", myMyddleware, usersController.create); // dessa maneira somente essa rote tem o middleware
 */

usersRoutes.post("/", usersController.create);
usersRoutes.put("/:id", usersController.update);

module.exports = usersRoutes;