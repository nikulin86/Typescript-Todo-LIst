import { ITodo } from "../types/data";

// extends это то что ITodoItem рассширяется от  ITodo
interface ITodoitem extends ITodo {
  // плюс дополнительные поля
  toggelTodo: (id: number) => void;
  removeTodo: (id: number) => void;
}

const TodoItem: React.FC<ITodoitem> = (props) => {
  const { id, title, complete, toggelTodo, removeTodo } = props;

  const css = `
  .todos {
    margin: 20px 0;
  }
  input { 
    margin: 0 15px;
  }
  button { 
    margin: 0 15px;
    cursor: pointer;
  }
  .text-through {
    text-decoration: line-through;
  }
  `

  return (
    <div className="todos">
      <style>
        {css}
      </style>
      <input  type="checkbox" checked={complete} onChange={() => toggelTodo(id)}/>
      <span style={{display: 'inline-block'}}>
            {title}
      </span>
  
      <button onClick={() => removeTodo(id)}>X</button>
    </div>
  );
};

export { TodoItem };
