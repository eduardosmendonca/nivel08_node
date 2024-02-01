const express = require("express");

const routes = require("./routes");

const app = express();
app.use(express.json());

app.use(routes);

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