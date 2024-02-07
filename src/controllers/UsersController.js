// Boa prática: um controller tem no máximo 5 metodos (Index, Show, Create, Update e Delete)
/*
    Index: GET para listar varios registros 
    Show: GET para exibir um registro específico
    Create: POST para criar um registro
    Update: PUT para atualizar um registro
    Delete: DELETE para deletar um registro

    controller > routes > server > cliente
*/

const { hash } = require("bcryptjs");

const AppError = require("../utils/AppError");

const sqliteConnection = require("../database/sqlite");

class UsersController {
    async create(request, response) {
        const{ name, email, password } = request.body;

        const database = await sqliteConnection();

        const checkUserExists = await database.get(`SELECT * FROM users WHERE email = (?)`, [email]);

        if (checkUserExists) {
            throw new AppError("Este email já está em uso.");
        };

        const hashedPassword = await hash(password, 8);

        await database.run(
            "INSERT INTO users (name, email, password) VALUES (?, ?, ?)", 
            [name, email, hashedPassword]
        );

        return response.status(201).json();

        /*
        if(!name){
            throw new AppError("Nome é obrigatório!")
        }
         */

        // response.send(`
        //     Usuário: ${name},
        //     Email: ${email},
        //     Password: ${password}        
        // `);
        // response.status(201).json( {name, email, password} ); esse status é padrão do protocolo http
        // response.status(404).json( {name, email, password} );

        // response.json( {name, email, password} );
    }

    async update(request, response) {
        const { name, email, password, old_password } = request.body;
        const { id } = request.params;

        const database = await sqliteConnection();
        const user = await database.get("SELECT * FROM users WHERE id = (?)", [id]);

        if(!user){
            throw new AppError("Usuário não encontrado");
        }
        
        const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email]);
    
        if(userWithUpdatedEmail && userWithUpdatedEmail.id !== id){
            throw new AppError("Este email já está em uso.");
        }

        user.name = name;
        user.email = email;

        if(password && !old_password){
            throw new AppError("Voce precisa informar a senha antiga para definir a nova senha!")
        }

        await database.run(`
            UPDATE users SET 
            name = ?, 
            email = ?, 
            updated_at = ?
            WHERE id = ?`, 
            [user.name, user.email, new Date(), id]
        );

        return response.json();

    }
}

module.exports = UsersController;