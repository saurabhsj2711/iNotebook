const mongoose = require("mongoose")

const mongoURI = "mongodb://localhost:27017/iNotebook"

const connectToMongo = async() => {
    try{
        await mongoose.connect(mongoURI);
        console.log("Connected To Mongoose Successfully");

    }
    catch (error){
        console.log(error);
    };
    
}

module.exports = connectToMongo;