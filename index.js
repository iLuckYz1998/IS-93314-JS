const express = require('express');
const cors = require('cors');
const {Sequelize, DataTypes } = require('sequelize');

//Configuração da conexão com o banco de dados - MySQL
const sequelize = new Sequelize('db_projeto', 'root','',{
    host: 'localhost',
        dialect: 'mysql'
})

//Definição de tabelas (modelo) de clientes
const Cliente = sequelize.define ('Cliente', {
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
        type: DataTypes.STRING,
    }
})
