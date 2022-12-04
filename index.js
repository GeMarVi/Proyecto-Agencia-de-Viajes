
// const express = require('express')  //Esta forma de importar express se llama commonJS se usaba antes el lugar de los modulos
import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';
import dotenv from 'dotenv';

dotenv.config()

console.log(process.env.DB_HOST)

const App = express();

// Conectar la base de datos
db.authenticate()
   .then( () => console.log('Base de datos conectada'))
   .catch( error => console.log(error))

//Definimos el puerto, se asigna a 4000 pero si se hace el deploy tomará un puerto disponible como se declara el el primer argumento,
//El primer argumento es una variable de entorno
const port =  process.env.PORT || 4000 ; 

//Iniciamos pug
App.set('view engine', 'pug') 

//Obtener el año actual, req lo que enviamos al servidor, res lo que el servidor nos manda, next ejecuta el siguiente midelware
App.use( (req,res,next) =>{
   const year = new Date()

   res.locals.actualYear = year.getFullYear();
   res.locals.nombreSitio = 'Agencia de Viajes'

   //Este return obliga a next a ejecutarse
   return next()
})

//Agregar body parse para leer los datos del formulario
App.use(express.urlencoded({ extended: true }))

App.use(express.static('public'))

// Metodo use soporta todos los verbos e importamos el router hacia nuestra App
App.use('/',router) 

 //Metodo listen arranca el servidor
App.listen(port, () =>{
    console.log(`La app está funcionando en el puerto: ${port}`)
})