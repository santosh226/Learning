import express, { Request, Response } from "express";
import { todoSchema } from "./schemas/user.schema.js";

const app = express();
const port = 3000;

const todos: Todo[] = [];

app.use(express.json());

app.post("/todos", (req: Request, res: Response) => {
    try {
        const validateData = todoSchema.parse(req.body);
        
        const newTodo: Todo = {
            id: todos.length + 1,
            title: req.body.title
        }

        todos.push(newTodo);
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(400).json({ error: error.errors });
    }
})

app.get("/todos", (req: Request, res: Response) => {
    res.json(todos);
})

app.delete("/todos/:id", (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const index = todos.findIndex(todo => todo.id === id);  
    if (index !== -1) {
        todos.splice(index, 1);
        res.status(200).json({ message: "Todo deleted successfully" });
    } else {
        res.status(404).json({ error: "Todo not found" });
    }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

 