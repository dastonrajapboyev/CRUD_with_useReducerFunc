import React, { useReducer } from "react";
import "./App.css";
import { users } from "./mock";

const reducer = (state, action) => {
  switch (action.type) {
    // delete
    case "ON_DELETE":
      let deleted = state.data.filter(
        (value) => value.id !== action.payload.ids
      );
      return { ...state, data: deleted };

    // search or read
    case "ON_CHANGE":
      let searched = users.filter((value) =>
        `${value[state.search]}`
          .toLowerCase()
          .includes(action.payload.toLowerCase())
      );
      return { ...state, data: searched };

    // search by category
    case "ON_SELECT":
      return { ...state, search: action.payload };

    // create new user
    case "GET_INPUT_VALUE":
      return { ...state, [action.payload.inputName]: action.payload.value };

    // create a new user and add user
    case "ADD_USER":
      let newUser = [
        ...state.data,
        {
          id: state.data.length + 1,
          name: state.name,
          status: state.status,
        },
      ];
      return { ...state, data: newUser };
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, {
    data: users,
    search: "",
    name: "",
    status: "",
  });
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
              <td>{value.name}</td>
              <td>{value.status}</td>
              <td>
                <button
                  onClick={() =>
                    dispatch({ type: "ON_DELETE", payload: { ids: value.id } })
                  }
                  style={{ fontSize: "20px" }}>
                  delete
                </button>
              </td>
              {/* <td><button style={{fontSize: '20px'}}>edit</button></td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default App;
