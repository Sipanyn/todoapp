import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router";
import { Outlet } from "react-router";
import { addTodo } from "../TodosSlice";

///////////////////////////////////////////
function Applayout() {
  const All_todosArray = useSelector((state) => state.todos.Alltodos);
  const inputRef = useRef(null);
  const todoEditValue = useSelector((state) => state.todos.todoToEdit);
  const [value, setValue] = useState(" ");
  const [editedValue, setEditedValue] = useState("");
  const dispatch = useDispatch();
  function handleKeyDown(e) {
    if (e.code === "Enter") {
      dispatch(addTodo({ value: value, todoToEdit: editedValue }));
      setValue("");
      setEditedValue("");
      inputRef.current.focus();
    }
  }
  useEffect(() => {
    if (todoEditValue !== " ") setEditedValue(() => todoEditValue);
  }, [todoEditValue]);
  return (
    <>
      <div className="app_layout">
        <header>
          <div className="add-container">
            <input
              ref={inputRef}
              onKeyDown={(e) => handleKeyDown(e)}
              className="add-input"
              type="text"
              placeholder="Add your plan..."
              value={todoEditValue !== " " ? editedValue : value}
              onChange={(e) => {
                if (todoEditValue !== " ") {
                  console.log(e.target.value);

                  setEditedValue(e.target.value);
                } else {
                  setValue(e.target.value);
                }
              }}
            />
            <button
              onClick={() => {
                dispatch(
                  addTodo({
                    value: value,
                    todoToEdit: editedValue,
                  })
                );
                setValue("");
                setEditedValue("");
                inputRef.current.focus();
              }}
              className="add-button"
            >
              Add
            </button>
          </div>
          <ul>
            <li>
              <NavLink className="nav all" to="/">
                All
                <span className="count">{All_todosArray.length}</span>
              </NavLink>
            </li>
            <li>
              <NavLink className="nav uncompleted" to="/uncompleted">
                Uncompleted
                <span className="count">
                  {All_todosArray.filter((item) => !item.completed).length}
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink className="nav completed" to="/completed">
                Completed
                <span className="count">
                  {All_todosArray.filter((item) => item.completed).length}
                </span>
              </NavLink>
            </li>
          </ul>
        </header>
      </div>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Applayout;
