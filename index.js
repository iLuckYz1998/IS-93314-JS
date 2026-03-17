const express = require('express');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');

// Configuração da conexão com o banco de dados - MySQL
const sequelize = new Sequelize('db_projeto', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

// Definição da tabela (modelo) de clientes
const Cliente = sequelize.define('Cliente', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    telefone: {
        type: DataTypes.STRING
    }
});

// Configuração do servidor Express
const app = express();
app.use(cors()); // Permite o front-end acessar a API
app.use(express.json()); // Permite o servidor entender JSON

const port = 3001;

// Rota para listar clientes
app.get('/clientes', async (req, res) => {
    try {
        const todososClientes = await Cliente.findAll();
        res.json(todososClientes);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao buscar clientes' });
    }
});

// Rota para cadastrar cliente
app.post('/clientes', async (req, res) => {
    try {
        const { nome, email, telefone } = req.body;

        const novoCliente = await Cliente.create({
            nome,
            email,
            telefone
        });

        res.status(201).json({
            message: 'Cliente criado com sucesso',
            cliente: novoCliente
        });

    } catch (error) {
        res.status(400).json({
            erro: 'Erro ao cadastrar cliente. Verifique se o email já existe.'
        });
    }
});

// Iniciando o servidor
sequelize.sync()
.then(() => {
    app.listen(port, () => {
        console.log(`🚀 Servidor rodando na porta: ${port}`);
        console.log('✅ Banco de dados sincronizado.');
    });
})
.catch((error) => {
    console.error('❌ Erro ao conectar ou sincronizar com o banco de dados:', error);
});