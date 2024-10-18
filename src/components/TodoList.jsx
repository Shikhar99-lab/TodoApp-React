import TodoItem from "./TodoItem";

function TodoList({ todos, showFinished, handleEdit, handleDelete, handleCheckbox }) {
  return (
    <div className="todos">
      {todos.length === 0 && <p className="m-5">Nothing to Do!</p>}
      {todos
        .filter((item) => showFinished || !item.isCompleted)
        .map((item) => (
          <TodoItem
            key={item.id}
            item={item}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            handleCheckbox={handleCheckbox}
          />
        ))}
    </div>
  );
}

export default TodoList;
