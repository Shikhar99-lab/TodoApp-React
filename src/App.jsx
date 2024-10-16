import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState(true);

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

  const toggleFinished = (e) => {
    setshowFinished(!showFinished);
  };

  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
  };

  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };

  return (
    <>
      <div className="container mx-auto md:my-5 rounded-md-xl p-5 bg-blue-200 md:min-h-[90vh] md:w-4/5 w-full">
        <div className="flex justify-center bg-blue-900 text-white py-2 rounded-md">
          <div className="logo">
            <span className="font-bold text-xl mx-9 ">Todo App</span>
          </div>
        </div>
        <div className="addTodo my-5 text-center">
          <h2 className="text-xl font-bold">Add a Todo Item</h2>
          <input
            type="text"
            className="w-full mt-5 rounded-md p-2"
            value={todo}
            onChange={handleChange}
          />
          <button
            onClick={handleAdd}
            className="bg-blue-800 hover:bg-blue-900 text-white p-2 py-1 my-6 rounded-md font-bold mx-6 w-20"
            disabled={todo.length === 0}
          >
            Save
          </button>
        </div>
        <div className="text-center">
          <input
            type="checkbox"
            checked={showFinished}
            onChange={toggleFinished}
          />{" "}
          Show Finished
        </div>
        <h2 className="text-lg font-bold">Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <p className="m-5">Nothing to Do!</p>}
          {todos
            .filter((item) => showFinished || !item.isCompleted)
            .map((item) => (
              <div
                key={item.id}
                className={`todo flex w-full my-3 justify-between items-center ${
                  item.isCompleted ? "bg-green-200" : "bg-blue-100"
                } p-3 border-2 border-blue-300 rounded-md md:p-4 md:border-4 hover:bg-blue-300`}
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
                    onClick={(e) => handleEdit(e, item.id)}
                    className="bg-blue-800 hover:bg-blue-900 text-white p-3 rounded-md m-6 font-bold mx-1"
                  >
                    <FaPencilAlt />
                  </button>
                  <button
                    onClick={(e) => {
                      handleDelete(e, item.id);
                    }}
                    className="bg-blue-800 hover:bg-blue-900 text-white p-3 rounded-md m-6 font-bold mx-1"
                  >
                    <MdDelete />
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
