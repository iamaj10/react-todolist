import { useEffect, useReducer, useState } from "react";
import "./App.css";
import TodoList from "./components/TodoList";
import { toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

const reducer = (state, action) => {
  const { payload } = action;
  switch (action.type) {
    case "GET_TODOS": {
      return {
        todos: payload.todos,
      };
    }
    case "ADD_TODO": {
      return {
        todos: [payload.todo, ...state.todos],
      };
    }
    case "UPDATE_TODO": {
      const todoDuplicate = state.todos;
      todoDuplicate[payload.todoPos] = payload.todo;
      return {
        todos: todoDuplicate,
      };
    }
    case "REMOVE_TODO": {
      return {
        todos: state.todos.filter((todo) => todo.id !== payload.id),
      };
    }
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, { todos: [] });
  const [loading, setLoading] = useState(false);

  const [idCounter, setIdCounter] = useState(100);

  const getTodos = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos"
      );
      const todos = await response.json();

      dispatch({ type: "GET_TODOS", payload: { todos } });
      toast.success("Todos retrived successfully.");
    } catch (error) {
      toast.error("Error on retriving todos.");
    }

    setLoading(false);
  };

  const addTodo = async (todo) => {
    if (!todo.title) return;
    setLoading(true);
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          body: JSON.stringify({ ...todo }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      const data = await response.json();

      data.id = data.id + idCounter;
      setIdCounter(idCounter + 1);

      dispatch({
        type: "ADD_TODO",
        payload: { todo: { ...data } },
      });
      toast.success("Todo added successfully.");
    } catch (error) {
      toast.error("Error on adding todo");
    }

    setLoading(false);
  };

  const updateTodo = async (todo) => {
    setLoading(true);
    const todoPos = state.todos.findIndex((t) => t.id === todo.id);

    if (todoPos === -1) {
      return false;
    }

    try {
      const response = await fetch(
        // `https://jsonplaceholder.typicode.com/posts/${todo.id}`,
        `https://jsonplaceholder.typicode.com/posts/1`,

        {
          method: "PUT",
          body: JSON.stringify(todo),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      const data = await response.json();
      dispatch({ type: "UPDATE_TODO", payload: { todoPos, todo } });
      toast.success("Todo updated successfully.");
    } catch (error) {
      toast.error("Error on updating todo");
    }

    setLoading(false);
  };

  const deleteTodo = async (id) => {
    setLoading(true);
    // await deleteDoc(doc(db, `Albums/${albumIDToShow}/Images`, id));

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts/1",
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      dispatch({ type: "REMOVE_TODO", payload: { id } });
      toast.success("Todo deleted successfully.");
    } catch (error) {
      toast.error("Error on deleting todo");
    }
    setLoading(false);
  };

  // console.log(state);

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <>
      {" "}
      <ToastContainer />
      <div className="App">
        <h2>Todo List</h2>
        <TodoList
          todos={state.todos}
          addTodo={addTodo}
          updateTodo={updateTodo}
          deleteTodo={deleteTodo}
        />
      </div>
    </>
  );
}

export default App;
