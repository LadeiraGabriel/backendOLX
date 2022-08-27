import { Request, Response } from "express";
import {stateExist} from '../services/stateServices';
import validator from 'validator';

export const homeController = async (req: Request, res: Response) => {

    let state = req.body.state;

    let verifyState = await stateExist(state);
    if(verifyState instanceof Error){
      res.json({ error : `${verifyState}` }); 
    }else{
      res.json({ status : verifyState }); 
    }
    
    
 



    

}