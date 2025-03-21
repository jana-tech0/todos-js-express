const express = require("express");
const app = express();
app.use(express.json());

let todos = [
    {
        id: 1,
        title: "Learn Javascript"
    }
]

app.get("/todos/all" ,(req,res) => {
    res.json(todos)
})


app.post("/todos/post",(req,res) => {
    const {title} = req.body;
    const newTodo = {
        id: todos.length + 1,
        title: title,
        completed: false
    }
    todos.push(newTodo)
    res.status(201).json(newTodo)

})

app.get("/todos/:id",(req,res) => {
      const { id } = parseInt(req.params.id)
      const todo = todos.find(todo => id === todo.id);
      if(!todo) {
        return res.status(404).json({message: "Todo Not Found "})
      }
      res.json(todo);
      
})

app.put("/todos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { title, completed } = req.body;
    const todo = todos.find(todo => todo.id === id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });
  
    if (title !== undefined) todo.title = title;
    if (completed !== undefined) todo.completed = completed;
  
    res.json(todo);
});

app.delete("/todos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    todos = todos.filter(todo => todo.id !== id);
    res.json({ message: "Todo deleted" });
});


app.listen(3000,() => {
    console.log("The server is running local host3000")
})