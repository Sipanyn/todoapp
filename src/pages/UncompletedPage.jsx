import { useDispatch, useSelector } from "react-redux";
import { fetchAlert, fetchEditAlert, toCompleted, toEdit } from "../TodosSlice";
function UncompletedPage() {
  const All_todosArray = useSelector((state) => state.todos.Alltodos);
  const dispatch = useDispatch();
  console.log(All_todosArray);

  return (
    <div>
      <div>
        <div className="result_con">
          {All_todosArray.map((item) => {
            if (!item.completed) {
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
                    <label htmlFor={`todo-${item.id}`}>{item.title}</label>
                  </div>
                  <div className="options">
                    <span
                      onClick={() =>
                        dispatch(
                          fetchEditAlert({ id: item.id, title: item.title })
                        )
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
              );
            }
            return null;
          })}
          {All_todosArray.filter((item) => item.completed === false).length ===
            0 && <p>No Uncompleted Task 😍</p>}
        </div>
      </div>
    </div>
  );
}

export default UncompletedPage;
