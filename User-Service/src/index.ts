import "reflect-metadata";
import { app } from "./app";
import startDBConnection from "./config/db";

const PORT = process.env.PORT || 4002;

app.listen(PORT, ()=> console.log(`User Service started at port ${PORT}`));

startDBConnection();