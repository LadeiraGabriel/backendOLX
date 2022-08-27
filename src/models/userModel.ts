import {Schema, Model, model, connection} from 'mongoose';


//type para a construção do schema do usuário
type schemaUserType = {

    name: string,
    email: string,
    age: number,
    password: string,
    state: string,
    auth: boolean
    
}


const schema = new Schema<schemaUserType>({
    name: String,
    email: String,
    age: Number,
    password: String,
    state: String,
    auth: Boolean
})


const modelName = 'User';


const userModel = connection && connection.models[modelName]
? (connection.models[modelName] as Model<schemaUserType>) : model<schemaUserType>(modelName,  schema);

export default userModel;