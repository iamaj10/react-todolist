import { Col, Row, Form, Button } from "react-bootstrap";
import styles from "../assets/css/TodoList.module.css";
import { useState, useRef } from "react";

const TodoList = ({ todos, addTodo, updateTodo, deleteTodo }) => {
  const [editing, setEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);

  const myRef = useRef();

  //To clear the input field after use
  const clearInput = () => {
    myRef.current.value = "";
  };

  // Handles the update of the checkmark for a todo
  const handleCheckmarkUpdate = (todo) => {
    const newTodo = {
      id: todo.id,
      title: todo.title,
      completed: !todo.completed,
      userId: todo.userId,
    };

    updateTodo(newTodo);
    return;
  };

  // Handles the click event for the "Add Todo" button
  const handleClick = (e) => {
    e.preventDefault();

    if (editing) {
      const title = myRef.current.value;

      const newTodo = {
        id: currentTodo.id,
        title,
        completed: currentTodo.completed,
        userId: currentTodo.userId,
      };

      updateTodo(newTodo);
      setEditing(false);
      setCurrentTodo(null);
      clearInput();
      return;
    }

    const title = myRef.current.value;
    const todo = {
      title,
      completed: false,
      userId: 1,
    };

    addTodo(todo);
    clearInput();
    return;
  };

  // Handles the edit action for a todo
  const handleEdit = (todo) => {
    setEditing(true);
    setCurrentTodo(todo);
    myRef.current.value = todo.title;
  };

  // Handles the delete action for a todo
  const handleDelete = (todo) => {
    deleteTodo(todo.id);
  };

  return (
    <div className={styles.todo_container}>
      <Form className="mt-3">
        <Form.Control type="text" ref={myRef} />
      </Form>

      <Button className="mt-2 btn btn-dark" onClick={handleClick}>
        {editing ? "Edit Todo" : "Add Todo"}
      </Button>
      {editing && (
        <Button
          className="mt-2 ms-2 btn btn-danger"
          onClick={() => {
            setEditing(false);
            setCurrentTodo(null);
            clearInput();
          }}
        >
          Cancel
        </Button>
      )}

      {todos.map((todo) => (
        <div className={styles.todo} key={todo.id}>
          <Row>
            <Col
              xs={8}
              className={todo.completed ? "text-decoration-line-through" : ""}
            >
              {" "}
              <div>{todo.title}</div>
            </Col>
            <Col xs={2} className="text-center ">
              {" "}
              <Form.Check
                inline
                checked={todo.completed}
                name="group1"
                type="checkbox"
                onClick={() => handleCheckmarkUpdate(todo)}
              />
            </Col>
            <Col xs={2} className="text-center ">
              <span
                style={{
                  cursor: "pointer",
                  color: "darkred",
                  backgroundColor: "",
                  padding: "5px",
                  borderRadius: "5px",
                }}
                onClick={() => handleEdit(todo)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-pencil-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
                </svg>
              </span>
              <span
                style={{
                  cursor: "pointer",
                  color: "darkred",
                  backgroundColor: "",
                  padding: "5px",
                  borderRadius: "5px",
                }}
                onClick={() => handleDelete(todo)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-trash3"
                  viewBox="0 0 16 16"
                >
                  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                </svg>
              </span>
            </Col>
          </Row>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
