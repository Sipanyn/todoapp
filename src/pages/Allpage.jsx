import { useDispatch, useSelector } from "react-redux";
import { fetchAlert, fetchEditAlert, toCompleted } from "../TodosSlice";
function Allpage() {
  const All_todosArray = useSelector((state) => state.todos.Alltodos);

  const dispatch = useDispatch();

  return (
    <div className="result_con">
      {All_todosArray && All_todosArray.length > 0 ? (
        All_todosArray.map((item) => (
          <div className="task_container" key={item.id}>
            <div className="todo">
              <input
                type="checkbox"
                id={item.id}
                name={item.id}
                value={item.id}
                checked={item.completed}
                onChange={(e) => dispatch(toCompleted(e.target.id))}
              />
              <label
                style={item.completed ? { color: "gainsboro" } : undefined}
                htmlFor={item.id}
              >
                {item.title}
              </label>
            </div>
            <div className="options">
              <span
                onClick={() =>
                  dispatch(fetchEditAlert({ id: item.id, title: item.title }))
                }
                className="edit"
              >
                📋
              </span>
              <span
                onClick={() => dispatch(fetchAlert(item.id))}
                className="delete"
              >
                ❌
              </span>
            </div>
          </div>
        ))
      ) : (
        <p>No tasks available</p>
      )}
    </div>
  );
}

export default Allpage;
