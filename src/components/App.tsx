import { useState, useEffect, useRef } from "react";
import { ITodo } from "../types/data";
import { TodoList } from "./TodoList";

const App: React.FC = () => {
  const [value, setValue] = useState('');
  const [todos, setTodos] = useState<ITodo[]>([]);

  // указываем тип (e)
  const handelChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };

  const handelKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    // чтобы не вызывался на каждую клавишу деланм проверку
    if (e.key === "Enter") {
      addTodos();
    }
  };

  // для операций с инпутом
  const inputRef = useRef<HTMLInputElement>(null);

  const addTodos = () => {

    if (value) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          title: value,
          complete: false,
        }])
        setValue('')
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      // фокус
      inputRef.current.focus();
    }

  }, []);

  // void ничего не возвращает
  const removeTodo = (id: number): void => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggelTodo = (id: number): void => {
    setTodos(
      todos.map((todo) => {
        if (todo.id !== id) return todo;

        return {
          ...todo,
          complete: !todo.complete,
        };
      })
    );
  };



  const css = `
  .wrapper {
    background: rgb(101,98,96);
background: linear-gradient(90deg, rgba(101,98,96,1) 8%, rgba(101,98,96,1) 18%, rgba(101,98,99,1) 27%, rgba(101,98,96,1) 35%, rgba(101,98,96,1) 37%, rgba(101,98,96,1) 44%, rgba(79,77,72,1) 64%, rgba(60,58,54,1) 87%);
    height: 100vh;
    width: 100vw;
    color: #fff;
  }
  .form-wrapper {
    display: flex;
    justify-content: center;
    padding-top: 50px;
  }
  .form {
    
  }
  .input{
    margin-right: 20px;
    padding: 20px;
  }
  .button {
    padding: 20px 40px;
  }
.todoList-wrapper {
  display: flex;
  justify-content: center;
}
.todoList {
  display: flex;
}
.todoItem {
  display: flex;
}
button { 
  cursor: pointer;
}
  `;



  return (
    <div className="wrapper">
      <style>{css}</style>

      <div className="form-wrapper">
        <div className="form">
          <input
            className="input"
            type="text"
            onChange={handelChange}
            onKeyDown={handelKeyDown}
            ref={inputRef}
            placeholder={'Добавьте задачу...'}
          />
          <button className="button" onClick={addTodos}>
            Добавить
          </button>
        </div>
      </div>
      <div className="todoList-wrapper">
        <div className="todoList">
          <div>
            <TodoList
              items={todos}
              removeTodo={removeTodo}
              toggelTodo={toggelTodo}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export { App };
