import React, {useState} from 'react';
import uuid from 'uuid/v4';
const initialTodos = [
  {
    id: uuid(),
    task: 'Learn React',
    complete: true,
  },
  {
    id: uuid(),
    task: 'Learn Firebase',
    complete: true,
  },
  {
    id: uuid(),
    task: 'Learn GraphQL',
    complete: false,
  },
];

const App = () => {

  //States
  const [todos, setTodos] = useState(initialTodos);
  const [task, setTask] = useState('');

  //Labels the todo as complete from the id
  const handleChangeCheckbox = id => {
    setTodos(
      todos.map(todo => {
        if(todo.id === id){
          return {...todo,complete: !todo.complete};
        }
        else{
          return todo;
        }
      })
    );
  };

  //Event method to handle input on every change
  const handleChangeInput = event => {
    setTask(event.target.value)
  };

  //Event method to handle the submission
  const handleSubmit = event => {
    if(task){
      setTodos(todos.concat({id:uuid(), task, complete:false}));
    }
    setTask('');
    event.preventDefault();
  };

  return(
  <div>
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <label>
            <input type="checkbox" checked={todo.complete} onChange={handleChangeCheckbox(todo.id)}/>
            {todo.task}
          </label>
        </li>
      ))}
    </ul>

    <form onSubmit={handleSubmit}>

    <input type="text" value={task} onChange={handleChangeInput} />
        <button type="submit"> Add Todo</button>
    </form>
  </div>
  );
};

export default App;