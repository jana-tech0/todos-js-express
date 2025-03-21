const express = require("express");
const app = express();
app.use(express.json())

let todos = [];
let id = 1;

// inputs are taken from the postman api

app.post("/todos/post",(req,res) => {
    const newTodo = {
        id : id++,
        task: req.body.task,
        completed: false
    }
    todos.push(newTodo)
    res.status(201).json(newTodo)
})

app.get("/todos/get",(req,res) => {
    res.status(200).json(todos)
})

app.put("/todos/:id", (req, res) => {
    const todoId = parseInt(req.params.id); 
    const todo = todos.find(t => t.id === todoId);

    if (!todo) {
        return res.status(404).json({ error: "Todo not found" });
    }

    todo.task = req.body.task !== undefined ? req.body.task : todo.task;
    todo.completed = req.body.completed !== undefined ? req.body.completed : todo.completed;

    res.status(200).json(todo);
});

app.delete("/todos/:id",(req,res) => {
    const todoId = parseInt(req.params.id);
    todos = todos.filter(t => t.id !== todoId);
    res.status(200).json({
        message: "TOdo deleted successfully"
    })

})

app.listen(3000,() => {
    console.log("The server is running at localhost3000/")
})