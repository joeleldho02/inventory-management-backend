import "reflect-metadata";
import { app } from "./app";
import startDBConnection from "./config/db";

const PORT = process.env.PORT || 4001;

app.listen(PORT, ()=> console.log(`Auth Service started at port ${PORT}`));

startDBConnection();