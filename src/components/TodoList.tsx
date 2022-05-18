import { ITodo } from "../types/data";
import { TodoItem } from "./TodoItem";

// можно type
interface ITodoListProps {
  items: ITodo[];
  toggelTodo: (id: number) => void;
  removeTodo: (id: number) => void;
}

const TodoList: React.FC<ITodoListProps> = (props) => {
  const { items, toggelTodo, removeTodo } = props;


  const css = `
  .todo {
    display: flex;
 
  }
  .todoItem {
       flex-direction: column;
  }
  `

  return (
    <div className="todo">
      <style>
        {css}
      </style>
      <div className="todoItem">
      {items.map((todo) => (
        <TodoItem
          key={todo.id}
          toggelTodo={toggelTodo}
          removeTodo={removeTodo}
          {...todo}
        />
      ))}
      </div>
    </div>
  );
};

export { TodoList };
