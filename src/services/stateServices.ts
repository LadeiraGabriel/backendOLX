import stateModel from '../models/statesModels';


export const stateExist = async (state: string) => {


    const stateVerify = await stateModel.findOne({
        name: state.toUpperCase()
    })

 
    if(!stateVerify){
        return new Error("This is state not exist!");
    }else{
        return stateVerify;
    } 
}



