import passport from "passport";
import { NextFunction, Response, Request } from "express";
import dotenv from 'dotenv';
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import userModel from '../models/userModel';
import JWT from 'jsonwebtoken';



dotenv.config();

const notAuthorized = {status: 401, message: 'Não autorizado'}

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET_KEY as string
};




//==========================================================================

passport.use(new JWTStrategy(options,async(payload, done) => {
    const user = await userModel.findById(payload.id);


    if(user){
        return done(null, user);
    }else{
        return done(notAuthorized, false);
    }
}));

//==========================================================================




//==========================================================================

export const generateToken = (data: object) => {
    return JWT.sign(data, process.env.JWT_SECRET_KEY as string, {expiresIn: '2h'});
}

//==========================================================================

export const privateRoute = async(req: Request, res: Response, next: NextFunction) => {
    const authFunction = passport.authenticate('jwt',(error, user) => {
        req.user = user;
        return user ? next() : next(notAuthorized);
    })

    authFunction(req, res, next)
}


export default passport;