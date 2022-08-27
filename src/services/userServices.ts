import passport from "passport";
import bcrypt from 'bcrypt'
import userModel from "../models/userModel";




export const verifyEmail = async (email: string) => {
    let result = await userModel.findOne({
        email: email
    })

    if(!result){
        return email;
    }else{
        return new Error("Este e-mail já esta sendo utilizado em outra conta!")
    }
} 


export const createUser = async (name: string, email: string, password: string, state: string, age: string) => {
    const hash = bcrypt.hashSync(password,10)
    return userModel.create({
        name,
        email,
        password: hash,
        state,
        age,
        auth: false
    });

}


export const findUserByEmail = async (email: string) => {


    const user = await userModel.findOne({
        email
    })

    if(!user){
        return false;
    }

    return user;
}   