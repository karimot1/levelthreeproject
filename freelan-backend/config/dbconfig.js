const mongoose = require("mongoose")

const ConnectDB = async () =>{
    const connectionString = process.env.CONNECTION_STRING 

    try {
        const connectdb = await mongoose.connect("mongodb+srv://ADEBOLA:Asha22bi22@freelancer0.wddrlei.mongodb.net/ADEBOLA?retryWrites=true&w=majority")
        if (connectdb) {
            console.log("Database connection established Successfully");
        } else {
            console.log("Error connecting to database");
        }
    } catch (error) {
        console.log("Error connecting to database" ,error);
    }
}

module.exports = ConnectDB