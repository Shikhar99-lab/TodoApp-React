import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";

function TodoApp() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);

  useEffect(() => {
    const todoString = localStorage.getItem("todos");
    if (todoString) {
      setTodos(JSON.parse(todoString));
    }
  }, []);

  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  const toggleFinished = () => {
    setShowFinished(!showFinished);
  };

  const handleAdd = (newTodo) => {
    setTodos([...todos, { id: uuidv4(), todo: newTodo, isCompleted: false }]);
    setTodo("");
  };

  const handleEdit = (id) => {
    let t = todos.filter((i) => i.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
  };

  const handleDelete = (id) => {
    let newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
  };

  const handleCheckbox = (id) => {
    let index = todos.findIndex((item) => item.id === id);
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };

  return (
    <div className="container mx-auto md:my-5 rounded-md-xl p-5 bg-blue-200 md:min-h-[90vh] md:w-4/5 w-full">
      <div className="flex justify-center bg-blue-900 text-white py-2 rounded-md">
        <div className="logo">
          <span className="font-bold text-xl mx-9">Todo App</span>
        </div>
      </div>
      <TodoInput todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      <div className="text-center">
        <input
          type="checkbox"
          checked={showFinished}
          onChange={toggleFinished}
        />{" "}
        Show Finished
      </div>
      <TodoList
        todos={todos}
        showFinished={showFinished}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleCheckbox={handleCheckbox}
      />
    </div>
  );
}

export default TodoApp;
