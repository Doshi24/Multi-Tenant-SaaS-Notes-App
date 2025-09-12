import express from "express"
import cors from "cors"
import { authRouter } from "./routes/auth.Router.js"

const main = express();

main.use(cors());
main.use(express.json());
main.use(express.urlencoded({ extended: true }));

main.use('/api/auth',authRouter)




export { main }