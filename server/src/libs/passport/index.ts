import passport from "passport";
import Google from 'passport-google-oauth20';
import dotenv from 'dotenv'
import UserType from "../../types/user.type";
import UserModel from "../../models/user";
// import UserModel from "../../models/user";

dotenv.config();

export function PassportGoogleStrategyConfig() {

    // google strategy
    const GoogleStrategy = Google.Strategy;

    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${process.env.SERVER_URL}/auth/oauth/google/callback`,
        passReqToCallback: true
    }, async (_, __, ___, profile, next) => {

        // here we create the user 
        const userData : UserType = {
            email:profile?._json?.email || profile?.emails[0].value,
            userName:profile.displayName,
            name:profile._json.name || `${profile.name.givenName} ${profile.name.familyName}`
        }
        // const oldUser = UserModel.findOne({email:profile.emails[0].value})
        try{
            const existedUser = await UserModel.findOne({email:userData.email});
            // if user existed 
            if(existedUser) {
                // if user existed but it's not oauth 
                if(!existedUser?.oauth) throw new Error(`user with email:${userData.email} already exists`)
                return next(null,{ email:existedUser.email,name:existedUser.name,userName:existedUser.userName } as UserType);
            }
            // creating new user if he doesn't exist
            const newUser = new UserModel({...userData,oauth:true});
            const saved = await newUser.save();

            return next(null,{...userData,id:saved._id});
        }catch(err){
            console.log(err);
            return next(err,null);
        }
    }));

}


export function PassportConfig (){
    // serialize
    passport.serializeUser((user, done) => {
        done(null, user);
    })
    // deserialize
    passport.deserializeUser((user, done) => {
        done(null, user);
    })
}



