import "reflect-metadata";
import { app } from "./app";
import connectDB from "./config/db";

const PORT = process.env.PORT || 4001;

const startDBConnection = async()=> {
    try {
        await connectDB();
    } catch (error) {
        console.log('Error -> Auth Service connecting to DB');        
    }
}

app.listen(PORT, ()=>{
    console.log(`Auth Service started at port ${PORT}`); 
});

startDBConnection();