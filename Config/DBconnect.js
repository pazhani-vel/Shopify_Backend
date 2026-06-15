const mongoose = require('mongoose')
const dotenv = require('dotenv').config()

const DBConnect = async()=>{
    try{
        const connect = await mongoose.connect(process.env.DBCONNECTSTRING)
        console.log("The database is successfully connected")
        console.log("The host is",connect.connection.host);// HOST NAME 
        console.log("The connected database name is",connect.connection.name);  // DATABASE NAME
    }catch(err)
    {
        console.log("There is a error in connecting the DB");
        process.exit(1);
    }
}

module.exports = {DBConnect}