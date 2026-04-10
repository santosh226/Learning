import app from "./src/app";

const PORT = process.env.PORT || 3000;

const start = async () => {
    // db connect

    app.listen(PORT, () => {
        console.log(`Server is running at ${port} in ${process.env.NODE_ENV} mode`);
    })
}

start().catch(err => {
    console.error("Failed to start server", err);
    process.exit(1);
})