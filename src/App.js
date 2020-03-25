import React, {useState, useReducer} from 'react';
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
  const [filter, dispatchFilter] = useReducer(filterReducer,'ALL');

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

  //Todo Filter

  const filteredTodos

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

  //Complex State Hook Functions

  const handleShowAll = () => {
    dispatchFilter({type: 'SHOW_ALL'})
  };

  const handleShowComplete = () =>{
    dispatchFilter({type: 'SHOW_COMPLETE'})
  };

  const handleShowIncomplete = () =>{
    dispatchFilter({type: 'SHOW_INCOMPLETE'})
  }

  //Fiter reducer

  const filterReducer = (state, action) =>{
    switch(action.type){
      case 'SHOW_ALL':
        return 'ALL';
      case 'SHOW_COMPLETE':
        return 'COMPLETE';
      case 'SHOW_INCOMPLETE':
        return 'INCOMPLETE';
      default:
        throw new Error();
    }
  };

  return(
  <div>

    <div>
      <button type="button" onClick={handleShowAll}>
        Show All
      </button>
      <button type="button" onClick={handleShowComplete}>
        Show Complete
      </button>
      <button type="button" onClick={handleShowIncomplete}>
        Show Incomplete
      </button>
    </div>

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