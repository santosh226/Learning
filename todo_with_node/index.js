const http = require("http");
const { json } = require("stream/consumers");

const todoDB = [];

const server = http.createServer((req, res) => {

    if(req.method === "GET" && req.url === "/todos") {
        res.writeHead(200, {"Content-Type": "application/json"});
        return res.end(JSON.stringify(todoDB));
    }

    if(req.method === "POST" && req.url.startsWith === "/todo/") {
        let body = "";

        req.on("data", (chunk) => {
            body += chunk.toString();
        })

        req.on("end", () => {
            const todo = JSON.parse(body);

            const newTodo = {
                id: todoDB.length + 1,
                title: todo.title
            }

            todoDB.push(newTodo);
        })

        res.writeHead(201, {"Content-Type": "application/json"});
        res.end(JSON.stringify(newTodo));

        return;
    }

    if(req.method === "DELETE" && req.url === "/todo/") {
        const id = parseInt(req.url.split("/")[2])

        const exists = todoDB.some(t => t.id === id);

        if (!exists) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: `Todo with id ${id} not found` }));
        }

        todoDB = todoDB.filter(t => t.id !== id);

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end("Todo deleted successfully");
    }


})

server.listen(3000, () => console.log("Server started"));

