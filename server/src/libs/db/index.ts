import { connect , connection  } from 'mongoose'


// mongodb connection 

async function connectToDB (){
    
    // connected connect event 
    connection.on('connected',()=>{
        console.log('connected to db');
    });

    // error connect event 
    connection.on('error',()=>{
        console.log('something went wrong in db connection');
    });

    // disconnected connect event 
    connection.on('disconnected',()=>{
        console.log('db disconnected');
    })

    // disconnect to db when node app closes 
    process.on('SIGINT',async()=>{
        await connection.close();
        process.exit(0)
    })

    try{
        await connect(process.env.MONGODB_URI,{dbName:"prechattest"});
    }catch(err){
        console.log('something went wrong in db connection');
        process.exit(0);
    }
}

export default connectToDB ;