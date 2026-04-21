import app from "./src/app.js";
import connectDB from "./src/common/config/db.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 8082;

const start = async () => {
    //db connect
    await connectDB();

    //sever start
    app.listen(port, (req, res) => {
        console.log(`Server is running at ${PORT}`);
    })
}

start()
.catch(err => { 
    console.error(`Failed to start server: ${err}`)
    process.exit(1);
 });