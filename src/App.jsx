import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const handleEdit = () => {};
  const handleDelete = (e, id) => {
    let updatedTodos = todos.filter(item => {
      return item.id !== id; 
    });
    setTodos(updatedTodos);
  };

  const handleAdd = () => {
    if (todo.trim()) {
      setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
      console.log(todos);
      setTodo("");
    }
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    const id = e.target.name;
    const updatedTodos = todos.map((item) => {
      if (item.id === id) {
        return { ...item, isCompleted: !item.isCompleted };
      }
      return item;
    });
    setTodos(updatedTodos);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 rounded-xl p-5 bg-blue-200 min-h-[80vh]">
        <div className="addTodo my-5">
          <h2 className="text-xl font-bold">Add a Todo Item</h2>
          <input
            type="text"
            className="w-1/2"
            value={todo}
            onChange={handleChange}
          />
          <button
            onClick={handleAdd}
            className="bg-blue-800 hover:bg-blue-900 text-white p-2 py-1 rounded-md m-6 font-bold mx-6"
          >
            Add
          </button>
        </div>
        <h2 className="text-lg font-bold">Your Todos</h2>
        <div className="todos">
          {todos.map((item) => (
            <div
              key={item.id}
              className="todo flex w-full justify-between items-center bg-blue-100 p-3 border-2 border-blue-300"
            >
              <input
                type="checkbox"
                checked={item.isCompleted}
                onChange={handleCheckbox}
                name={item.id}
              />
              <div className={item.isCompleted ? "line-through" : ""}>
                {item.todo}
              </div>
              <div className="buttons">
                <button
                  onClick={handleEdit}
                  className="bg-blue-800 hover:bg-blue-900 text-white p-3 py-1 rounded-md m-6 font-bold mx-1"
                >
                  Edit
                </button>
                <button
                  onClick={(e)=>{handleDelete(e, item.id)}}
                  className="bg-blue-800 hover:bg-blue-900 text-white p-3 py-1 rounded-md m-6 font-bold mx-1"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
