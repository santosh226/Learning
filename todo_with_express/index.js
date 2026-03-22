const express = require('express');

const app = express();
const port = 3000;

app.use(express.json());

const todoDB = [
    {
        id: 1,
        todo: "Finish Backend"
    }
];

app.get("/todo", (req, res) => {
    res.status(200).json(todoDB);
})

app.post("/todo", (req, res) => {
    const data = req.body;

    const newTodo = {
        id: todoDB.length + 1,
        todo: data.todo
    }

    todoDB.push(newTodo);

    return res.status(201).json(todoDB);
})

app.delete("/todo/:id", (req, res) => {
    const id = req.params.id

    const isExist = todoDB.some(t => t.id === id);
    if(isExist) return res.status(404).send(`Todo with this id ${id} is not found`);

    todoDB = newTodo.filter(t => t.id !== id);

    return res.status(200).send("Todo deleted successfully");
})

app.listen(port, () => console.log(`Server running at port ${port}`));