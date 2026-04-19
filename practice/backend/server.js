import app from "./src/app.js";

const PORT = process.env.PORT || 8082;

const start = async () => {
    //db connect

    //sever start
    app.listen(port, (req, res) => {
        console.log(`Server is running at ${PORT}`);
    })
}

server()
.catch(err => { 
    console.error(`Failed to start server: ${err}`)
    process.exit(1);
 });