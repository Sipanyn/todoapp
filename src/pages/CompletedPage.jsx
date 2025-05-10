import { useDispatch, useSelector } from "react-redux";
import { fetchAlert, toCompleted, toDelete } from "../TodosSlice";
function CompletedPage() {
  const All_todosArray = useSelector((state) => state.todos.Alltodos);
  const dispatch = useDispatch();
  console.log(All_todosArray);

  return (
    <div>
      <div>
        <div className="result_con">
          {All_todosArray.map((item) => {
            if (item.completed) {
              return (
                <div className="task_container" key={item.id}>
                  <div className="todo">
                    <input
                      type="checkbox"
                      id={`todo-${item.id}`}
                      name={`todo-${item.id}`}
                      value={item.id}
                      checked={item.completed}
                      onChange={() => dispatch(toCompleted(item.id))}
                    />
                    <label
                      style={{ color: "gainsboro" }}
                      htmlFor={`todo-${item.id}`}
                    >
                      {item.title}
                    </label>
                  </div>
                  <div className="options">
                    <span
                      onClick={() => dispatch(fetchAlert(item.id))}
                      className="delete"
                    >
                      ❌
                    </span>
                  </div>
                </div>
              );
            }
            return null;
          })}
          {All_todosArray.filter((item) => item.completed === true).length ===
            0 && <p>No Completed Task 😔</p>}
        </div>
      </div>
    </div>
  );
}

export default CompletedPage;
