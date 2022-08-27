import {connection, model, Model, Schema} from 'mongoose';


type stateSchemaType = {
    name: string
}





const schema = new Schema<stateSchemaType>({
    name: String
})


const modelName = 'state';


const stateModel = connection && connection.models[modelName]
? (connection.models[modelName] as Model<stateSchemaType>) : model<stateSchemaType>(modelName,  schema);

export default stateModel;