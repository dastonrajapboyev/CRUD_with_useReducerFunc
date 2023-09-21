import React, { useReducer } from "react";
import "./App.css";
import { users } from "./mock";
import { reducer } from "./reducer";

const App = () => {
  const [state, dispatch] = useReducer(reducer, {
    data: users,
    search: "",
    name: "",
    status: "",
    select: null,
  });
  console.log(state.select);
  return (
    <>
      <select
        onChange={(e) =>
          dispatch({ type: "ON_SELECT", payload: e.target.value })
        }>
        <option value="id">id</option>
        <option value="name">name</option>
        <option value="status">status</option>
      </select>
      <input
        onChange={(e) => {
          dispatch({ type: "ON_CHANGE", payload: e.target.value });
        }}
        type="text"
        placeholder="search..."
      />
      <br />
      <br />
      <input
        onChange={(e) =>
          dispatch({
            type: "GET_INPUT_VALUE",
            payload: { value: e.target.value, inputName: e.target.name },
          })
        }
        name="name"
        type="text"
        placeholder="enter your name"
      />
      <input
        onChange={(e) =>
          dispatch({
            type: "GET_INPUT_VALUE",
            payload: { value: e.target.value, inputName: e.target.name },
          })
        }
        name="status"
        type="text"
        placeholder="enter your name"
      />
      <button
        onClick={() => dispatch({ type: "ADD_USER" })}
        style={{ fontSize: "20px", padding: "7px", margin: "4px 0 0 6px" }}>
        add user
      </button>
      <table border={1} width="70%">
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>status</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {state.data.map((value) => (
            <tr key={value.id}>
              <td>{value.id}</td>
              <td>
                {state.select === value.id ? (
                  <input
                    name="name"
                    onChange={(e) =>
                      dispatch({
                        type: "GET_INPUT_VALUE",
                        payload: {
                          value: e.target.value,
                          inputName: e.target.name,
                        },
                      })
                    }
                    type="text"
                    value={state.name}
                  />
                ) : (
                  value.name
                )}
              </td>
              <td>
                {state.select === value.id ? (
                  <input
                    name="status"
                    onChange={(e) =>
                      dispatch({
                        type: "GET_INPUT_VALUE",
                        payload: {
                          value: e.target.value,
                          inputName: e.target.name,
                        },
                      })
                    }
                    type="text"
                    value={state.status}
                  />
                ) : (
                  value.status
                )}
              </td>
              <td>
                <button
                  onClick={() =>
                    dispatch({ type: "ON_DELETE", payload: { ids: value.id } })
                  }>
                  delete
                </button>
                {state.select === value.id ? (
                  <button onClick={() => dispatch({ type: "ON_SAVE" })}>
                    save
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      dispatch({
                        type: "ON_UPDATE",
                        payload: { allData: value },
                      })
                    }>
                    edit
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default App;
