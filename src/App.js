import { useEffect, useReducer, useState } from "react";
import "./App.css";
import TodoList from "./components/TodoList";

import "bootstrap/dist/css/bootstrap.min.css";

const reducer = (state, action) => {
  const { payload } = action;
  switch (action.type) {
    case "GET_TODOS": {
      return {
        todos: payload.todos,
      };
    }
    // case "GET_IMAGES": {
    //   return {
    //     albums: state.albums,
    //     images: payload.images,
    //   };
    // }
    // case "ADD_ALBUM": {
    //   return {
    //     albums: [state.albums],
    //   };
    // }
    // case "ADD_IMAGES": {
    //   return {
    //     albums: state.albums,
    //     images: [state.images],
    //   };
    // }
    // case "UPDATE_IMAGE": {
    //   const imagesDuplicate = state.images;
    //   imagesDuplicate[payload.ImagePos] = payload.image;
    //   return {
    //     albums: state.albums,
    //     images: imagesDuplicate,
    //   };
    // }
    // case "REMOVE_IMAGE": {
    //   return {
    //     albums: state.albums,
    //     images: state.images.filter((image) => image.id !== payload.id),
    //   };
    // }
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, { todos: [] });
  const [loading, setLoading] = useState(false);

  const getTodos = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos"
      );
      const todos = await response.json();

      dispatch({ type: "GET_TODOS", payload: { todos } });
    } catch (error) {
      console.error("Error fetching todos:", error);
    }

    setLoading(false);
  };

  console.log(state);

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="App">
      <h2>Todo List</h2>
      <TodoList todos={state.todos} />
    </div>
  );
}

export default App;
