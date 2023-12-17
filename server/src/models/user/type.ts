import { Document, Model } from "mongoose";

// doesEmailExists : (email:string)=>Promise<boolean>

interface UserSchemaType extends Document {
    name:string;
    userName:string;
    email:string;
    password:string;
    chats?:string[];
    // methods here
}

interface UserModelType extends Model<UserSchemaType> {
    // statics here
    doesEmailExists(email:string) : Promise<boolean>
}


export {UserModelType};
export default UserSchemaType;