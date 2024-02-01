const { Router } = require("express");

const userRoutes = Router();

userRoutes.post("/", (request, response) => {
    const{ name, email, password } = request.body;

    // response.send(`
    //     Usuário: ${name},
    //     Email: ${email},
    //     Password: ${password}        
    // `);

    response.json( {name, email, password} );
});

module.exports = userRoutes;