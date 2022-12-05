import { useState } from "react";
import { useReducer } from "react";
import "/src/assets/style.css";
function reducer(state, Action) {
  switch (Action.type) {
    case "add":
      return [...state, Action.payload];
    case "remove":
      return state.filter((item) => item.id !== Action.payload);
    case "update":
      state.find((item) => {
        if (item.id === Action.id && Action.payload != "") {
          return (item.todo = Action.payload);
        }
      });

      return [...state];
  }
}
function App() {
  // const [todoList, setTodoList] = useState(
  //   localStorage.getItem("todoItems")
  //     ? JSON.parse(localStorage.getItem("todoItems"))
  //     : []
  // );

  const [isEdit, setEdit] = useState(null);
  const [state, dispatch] = useReducer(reducer, []);
  function handelInput(e) {
    if (e.key === "Enter") {
      dispatch({
        type: "add",
        payload: {
          todo: e.target.value,
          isdoing: true,
          id: Math.floor(Math.random() * 10000),
        },
      });
      e.target.value = "";
    }
  }
  function handelRemove(id) {
    dispatch({ type: "remove", payload: id });
  }
  function handelEditInput(e) {
    if (e.key === "Enter") {
      dispatch({ type: "update", payload: e.target.value, id: isEdit });
      e.target.value = "";
      setEdit(null);
    }
  }

  function handelEdit(id) {
    setEdit(id);
  }
  return (
    <div id="container">
      <h1 className="text">Todo List</h1>
      <input
        type="text"
        onKeyUp={handelInput}
        className="input-addTask"
      ></input>
      {state.length ? (
        state.map((item) => (
          <div className="show">
            <div>{item.todo}</div>
            {isEdit !== item.id ? (
              <div className="btn">
                <button onClick={() => handelRemove(item.id)}>
                  <img src="./public/icons8-remove-48.png" />
                </button>
                <button onClick={() => handelEdit(item.id)}>
                  <img src="./public/icons8-pencil-64.png" />
                </button>
              </div>
            ) : (
              <div className="edit-div">
                <input type="text" onKeyUp={handelEditInput} />
              </div>
            )}
          </div>
        ))
      ) : (
        <h2>No Task:</h2>
      )}
    </div>
  );
}
export default App;
