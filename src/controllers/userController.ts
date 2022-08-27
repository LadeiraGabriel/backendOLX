import {Request, Response } from 'express';
import validator from 'validator';
import {verifyEmail, createUser, findUserByEmail} from '../services/userServices';
import {matchPassword, validateEmail, optinEmail} from '../helpers/userHelpers';
import {stateExist} from '../services/stateServices';
import { generateToken } from '../config/passport'; 

export const createUsers = async (req: Request, res: Response) => {

        const {name, email, password, repetpassword, state, age} = req.body

        if(!name || !email || !password || !repetpassword || !state || !age){
                res.status(400).json({mensageError: "Campos necessários não foram preenchidos!"});
                return
             }

        if(name.lenght <= 4){
                res.json({messageError: 'Insira um nome com de 4 caracteres!'})
                return
        }

       if( !validator.isEmail(email) ){
        res.json({messageError: 'Insira um e-mail válido'})
        return
       }

       const thisEmailExist = await verifyEmail(email);

       if( thisEmailExist instanceof Error ){
        res.json({messageError: `${thisEmailExist}`})
        return
       }     
       
       if(password !== repetpassword){
        res.json({messageError: "a repetição da senha esta incorreta"}) 
        return 
       }


       const verifyState = await stateExist(state);

       if( verifyState instanceof Error ){
        res.json({messageError: `${verifyState}`})
        return
       }     

       if(age <= 18 && age >= 100){
        res.json({messageError: "idade não autorizada para cadastro!" })  
        return
       }

       const create = await createUser(name, email, password, state.toUpperCase(), age)

       const token = generateToken({id: create.id});
       

       const sendEmailToOption =  optinEmail(create.email, token);

       res.status(201).json({status: `Conta criada com sucesso! valide sua conta em seu e-mail!`});
     

}


export const loginUser = async (req: Request, res: Response) => {
        const{email, password} = req.body;

        if(!email || !password){
           res.status(401).json({mensageError: "Necessario e-mail e senha!"});
           return
        }

       if(!validateEmail(email)){
        res.status(401).json({mensageError: "este email não é válido"});
        return
       }

        const user = await findUserByEmail(email);
        
       if(!user){
        res.status(401).json({mensageError: "este e-mail não pertence a nenhum usuário"});
        return
       }

       if(user){

        if(!user.auth){
           res.status(401).json({mensage: "Confirme seu email para completar o cadastro!"});
           return
        }

        
        const verifyPassword = matchPassword(password, user.password);

        if(verifyPassword){
           
        const token = generateToken({id: user.id});

            res.json({token});

        }else{
           res.status(401).json({MessageError: 'Senha incorreta'});
           return   
        }

        
       }
               

}



