import { Col, Row, Form, Button } from "react-bootstrap";
import styles from "../assets/css/TodoList.module.css";
import { useState } from "react";

const TodoList = ({ todos }) => {
  const [showAdd, setShowAdd] = useState(false);

  //test commit
  return (
    <div className={styles.todo_container}>
      <Button onClick={() => setShowAdd(!showAdd)}>Add Todo</Button>
      {showAdd ? <div>Add Todo</div> : null}
      {todos.map((todo) => (
        <div className={styles.todo} key={todo.id}>
          <Row>
            <Col xs={9} className="text-center">
              {" "}
              <div>{todo.title}</div>
            </Col>
            <Col xs={3} className="text-center">
              {" "}
              <Form.Check
                inline
                checked={todo.completed}
                name="group1"
                type="checkbox"
                // onClick={}
              />
            </Col>
          </Row>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
