import "reflect-metadata";
import { app } from "./app";
import connectDB from "./config/db";

const PORT = process.env.PORT || 4002;

const startDBConnection = async()=> {
    try {
        await connectDB();
    } catch (error) {
        console.log('Error -> User Service connecting to DB');        
    }
}

app.listen(PORT, ()=>{
    console.log(`User Service started at port ${PORT}`); 
});

startDBConnection();