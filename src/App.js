import React, {useState, useReducer, useContext, createContext} from 'react';
import uuid from 'uuid/v4';

const TodoContext = createContext(null);

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

  const filterReducer = (state, action) => {
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

  const todoReducer = (state, action) => {
    switch (action.type) {
      case 'DO_TODO':
        return state.map(todo => {
          if(todo.id === action.id){
            return {...todo, complete:true };
          }
          else{
            return todo;
          }
        });
      case 'UNDO_TODO':
          return state.map(todo => {
            if(todo.id === action.id){
              return {...todo, complete:false };
            }
            else{
              return todo;
            }
          });
      case 'ADD_TODO':
            return state.concat({
              task: action.task,
              id: action.id,
              complete: false,
            });

      default:
        throw new Error();
    }
  }

const App = () => {

  //States
  const [todos, dispatchTodos] = useReducer(todoReducer, initialTodos);
  const [task, setTask] = useState('');
  const [filter, dispatchFilter] = useReducer(filterReducer,'ALL');

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


  //Todo Filter

  const filteredTodos = todos.filter(todo => {
    if (filter === 'ALL'){
      return true;
    }
    if (filter === 'COMPLETE' && todo.complete){
      return true;
    }
    if (filter === 'INCOMPLETE' && !todo.complete){
      return true
    }

    return false
  });

    //Labels the todo as complete from the id
    const handleChangeCheckbox = todo => {
      dispatchTodos({
        type: todo.complete ? 'UNDO_TODO' : 'DO_TODO',
        id: todo.id,
      });
    };
    
  //Event method to handle input on every change
  const handleChangeInput = event => {
    setTask(event.target.value)
  };

  //Event method to handle the submission
  const handleSubmit = event => {
    if(task){
      dispatchTodos({ type: 'ADD_TODO', task, id: uuid() })
    }
    setTask('');
    event.preventDefault();
  };


  return (
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
        {filteredTodos.map(todo => (
          <li key={todo.id}>
            <label>
              <input
                type="checkbox"
                checked={todo.complete}
                onChange={() => handleChangeCheckbox(todo)}
              />
              {todo.task}
            </label>
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={task}
          onChange={handleChangeInput}
        />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
};

export default App;