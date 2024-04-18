import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL ||'');
    console.log("User Service connected to the MongoDB database");
  } catch (err) {
    console.error("Error connecting to the database:", err);
    process.exit(1);
  }
};

const startDBConnection = async()=> {
  try {
      await connectDB();
  } catch (err) {
      console.error('Error -> User Service connecting to DB', err);        
  }
}

export default startDBConnection;