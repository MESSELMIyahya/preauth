import UserSchemaType , {UserModelType} from "./type";
import { Schema , model , Model , models } from "mongoose";
import createErr from 'http-errors';
import bpt from 'bcrypt'




// user schema

const userSchema = new Schema<UserSchemaType>({
    name:{required:true,type:String},
    userName:{required:true,type:String},
    email:{required:true,unique:true,type:String,lowercase:true},
    password:{required:true,type:String},
});

// middleware


// hashing the password
userSchema.pre('save',async function(){
    this.password = await bpt.hash(this.password,10) ;
});


// statics
userSchema.static('doesEmailExists', async function (email:string):Promise<boolean>{
    try{
        const user = await this.findOne({email});
        return user ? true : false
    }catch(err){
        throw createErr[500]('something went wrong ,try again')
    }
})


// methods 

userSchema.methods.isValidPassword = async function (pass:string) : Promise<boolean> {
         try{
            const isValid = await bpt.compare(pass,this.password)
            return isValid ;
        }catch(err){
            throw createErr[500]('something went wrong ,try again')
        }
}



const UserModel = models.Users || model<UserSchemaType>('Users',userSchema);


export default UserModel;

