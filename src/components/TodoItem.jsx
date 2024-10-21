import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function TodoItem({ item, handleEdit, handleDelete, handleCheckbox }) {
  return (
    <div
      className={`todo flex w-full my-3 justify-between items-center ${
        item.isCompleted ? "bg-green-200" : "bg-blue-100"
      } p-3 border-2 border-blue-300 rounded-md md:p-4 md:border-4 hover:bg-blue-300`}
      onClick={() => handleCheckbox(item.id)}
    >
      <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
      <div className="buttons">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleEdit(item.id);
          }}
          className="bg-blue-800 hover:bg-blue-900 text-white p-3 rounded-md m-6 font-bold mx-1"
        >
          <FaPencilAlt />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(item.id);
          }}
          className="bg-blue-800 hover:bg-blue-900 text-white p-3 rounded-md m-6 font-bold mx-1"
        >
          <MdDelete />
        </button>
      </div>
    </div>
  );
}
export default TodoItem;
