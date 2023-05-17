const express = require("express");
const app = express();
const port = 3000;

app.use("/public", express.static("public"));

const ToDo = [];
for (let i = 0; i < 5; i++) {
  ToDo.push({
    id: i,
    title: `title ${i}`,
    description: `description ${i}`,
    status: true,
  });
}

const random = Math.floor(Math.random() * ToDo.length);

//get
app.get("/todo/id/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const todo = ToDo.find((todo) => todo.id === id);
  if (!todo) {
    return res.status(404).send("Todo not found");
  }
  res.send(todo);
});

//delete
app.delete("/todo/id/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = ToDo.findIndex((todo) => todo.id === id);
  if (index === -1) {
    res.status(404).send(`Todo with id ${id} not found`);
    console.log(index);
  } else {
    ToDo.splice(index, 1);
    res.send(`Deleted todo with id ${id}`);
  }
});

//post
app.post("/todo/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const newTodo = {
    id: id,
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
  };
  ToDo.push(newTodo);
  res.send(`Created new todo with id ${id}`);
});

//put
app.put("/user", (req, res) => {
  res.send("Got a PUT request at /user");
});
