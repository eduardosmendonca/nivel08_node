require("express-async-errors");

const AppError = require("./utils/AppError");

const express = require("express");

const routes = require("./routes");

const app = express();
app.use(express.json());

app.use(routes);

app.use((error, request, response, next) => {

    if(error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message
        });
    }

    console.error(error);

    return response.status(500).json({
        status: "error",
        message: "Internal server error"
    })

});

/*
//Route Params
app.get("/message/:id/:user", (request, response) => {
    const { id, user } = request.params;
    // response.send(`
    //      ID da mensagem: ${request.params.id},
    //      Para o usuário: ${request.params.user}
    // `)
    response.send(`
        ID da mensagem: ${id},
        Para o usuário: ${user}.
    `)
})
 */

/*
//Query Params http://localhost:3333/users?page=2&limit=3
app.get("/users", (request, response) => {
    const{ page, limit } = request.query;

    response.send(`Página: ${page}. Limite: ${limit}  `)
});
*/

/* 
// Body params com metodo post usando insomnia
app.post("/users", (request, response) => {
    const{ name, email, password } = request.body;

    // response.send(`
    //     Usuário: ${name},
    //     Email: ${email},
    //     Password: ${password}        
    // `);

    response.json( {name, email, password} );
})
*/



const PORT = 3333;
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));          