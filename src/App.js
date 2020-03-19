import React, {useState} from 'react';
const initialTodos = [
  {
    id: 'a',
    task: 'Learn React',
    complete: true,
  },
  {
    id: 'b',
    task: 'Learn Firebase',
    complete: true,
  },
  {
    id: 'c',
    task: 'Learn GraphQL',
    complete: false,
  },
];

const App = () => {

  //States
  const [task, setTask] = useState('');

  //Event method to handle input on every change
  const handleChangeInput = event => {
    setTask(event.target.value)
  };

  //Event method to handle the submission
  const handleSubmit = event => {
    if(task){

    }

    setTask('');


    event.preventDefault();
  };

  return(
  <div>
    <ul>
      {initialTodos.map(todo => (
        <li key={todo.id}>
          <label>{todo.task}</label>
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