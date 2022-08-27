import {connect} from "mongoose";
import dotenv from 'dotenv';



dotenv.config()


export const mongoConnect = async () => {
    try{
        console.log('conectando ao banco!')
        await connect(process.env.CONNECT_DB as string);
    }catch(error){
        console.log("algo saiu errado!",error)
    }
}