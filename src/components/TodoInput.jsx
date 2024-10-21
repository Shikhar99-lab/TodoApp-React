function TodoInput({ todo, setTodo, handleAdd }) { 
    const handleChange = (e) => {
      setTodo(e.target.value);
    };
  
    return (
      <div className="addTodo my-5 text-center">
        <h2 className="text-xl font-bold">Add a Todo Item</h2>
        <input
          type="text"
          className="w-full mt-5 rounded-md p-2"
          value={todo}
          onChange={handleChange}
        />
        <button
          onClick={() => handleAdd(todo)}
          className="bg-blue-800 hover:bg-blue-900 text-white p-2 py-1 my-6 rounded-md font-bold mx-6 w-20"
          disabled={todo.length === 0}
        >
          Save
        </button>
      </div>
    );
  }
  
  export default TodoInput;
  