const { default: mongoose } = require("mongoose");

const connectDB=async()=>{
    const connectionURL = process.env.MONGODB_CONNECTION_URL;
    mongoose.connect(connectionURL).then(()=>console.log("MONGODB CONNECTED!!")).catch((e)=>console.log("ERROR CONNECTING TO MONGODB",e))
}

module.exports=connectDB