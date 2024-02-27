const mongoose  = require("mongoose");

const connect = async()=>{
    try {
        await mongoose.connect("mongodb+srv://pratyushkarn007:670SSmzGXDqJkKrZ@cluster0.gai8t14.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",{
            dbName:"examWebsite",
        })
        console.log("Connected");

    } catch (error) {
        console.log("Cannot Connect To DataBase ",error.message);
    }
}

module.exports = connect;