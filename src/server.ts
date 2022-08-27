import express, {ErrorRequestHandler} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import mainRoutes from './routers'
import { Request, Response } from "express"
import {mongoConnect} from './database/mongodb';
import multer,{MulterError} from 'multer';
import passport from 'passport'

//VARIAVEIS DE AMBIENTE
dotenv.config();


//CONECTANDO AO BANCO 
mongoConnect();


// instancia do express
const server = express();



//DEFININDO O CORS
 server.use(cors({
    origin: 'http://localhost:3000',
    methods: ["GET","POST","PUT","DELETE"]
})) 

//DEFININDO ROTAS PUBLICAS
server.use(express.static(path.join(__dirname,"../public")));


//PASSPORT
server.use(passport.initialize());

// METODO POST HABILITADO
server.use(express.urlencoded({extended: true}));

// ROTAS PRINCIPAIS
server.use(mainRoutes)

// 404 NOT FOUND
server.use((req: Request, res: Response)=>{
    res.json({status: "not found "}).status(404);
})


//MANIPULAÇÃO DE ERROS
const errorHandler: ErrorRequestHandler = (error,req,res, next) => {
    if(error instanceof MulterError){
        res.json({error: `Algum erro de upload: ${error.code}`})
    }else{

    if(error.status){
    res.status(error.status)
    }else {
        
        res.status(400) // BAD REQUEST
    }


    if(error.message){
        
        res.json({ error : error.message})
    }else{
        
        res.json({error: 'Ocorreu algum erro!'})
    }
}
}
//MANIPULAÇÃO DE ERROS
server.use(errorHandler);



//INICIALIZAÇÃO DO SERVIDOR
server.listen(process.env.PORT)