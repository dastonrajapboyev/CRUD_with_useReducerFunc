import { users } from "./mock";

export const reducer = (state, action) => {
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

    // update
    case "ON_UPDATE":
      return {
        ...state,
        select: action.payload.allData.id,
        name: action.payload.allData.name,
        status: action.payload.allData.status,
      };

    // saving updated value
    case "ON_SAVE":
      let updatedUser = state.data.map((value) =>
        value.id === state.select
          ? { ...value, name: state.name, status: state.status }
          : value
      );

      return { ...state, data: updatedUser, select: null };

    default:
      return state;
  }
};
