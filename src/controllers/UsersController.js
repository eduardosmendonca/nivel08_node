// Boa prática: um controller tem no máximo 5 metodos (Index, Show, Create, Update e Delete)
/*
    Index: GET para listar varios registros 
    Show: GET para exibir um registro específico
    Create: POST para criar um registro
    Update: PUT para atualizar um registro
    Delete: DELETE para deletar um registro

    controller > routes > server > cliente
*/

const AppError = require("../utils/AppError");

class UsersController {
    create(request, response) {
        const{ name, email, password } = request.body;

        if(!name){
            throw new AppError("Nome é obrigatório!")
        }

        // response.send(`
        //     Usuário: ${name},
        //     Email: ${email},
        //     Password: ${password}        
        // `);
        // response.status(201).json( {name, email, password} ); esse status é padrão do protocolo http
        // response.status(404).json( {name, email, password} );
        response.json( {name, email, password} );
    }
};

module.exports = UsersController;