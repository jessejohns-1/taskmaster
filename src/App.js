import React, { useState,useEffect } from 'react';
import './App.css';
//importing compenents
import Form from './components/Form';
import TodoList from './components/TodoList';


function App() {
  //state
  const [inputText, setInputText] = useState('');
  const [todos, setTodos] = useState([]);
  const [status, Setstatus] = useState('all');
  const [filterTodos, setFilteredTodos] = useState([]);
  
  //useEffect for search filterhandler
  //first use effect grabs todos from local storage
  useEffect(() => {
    getLocalTodos()
  } , []);

  useEffect(() => {
      filterHandler()
      saveLocalTodos()
  } , [todos, status]);
  
  //function for search filter
  const filterHandler = () => {
    switch (status) {
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.completed === true));
        break;
      case 'uncompleted':
        setFilteredTodos(todos.filter(todo => todo.completed === false));
      break;
      default:
        setFilteredTodos(todos);
        break;
      }
    };
    //save to local storage
    const saveLocalTodos = () => {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
    //checking local storage for todos
    const getLocalTodos = () => {
      if(localStorage.getItem('todos') === null){
        localStorage.setItem('todos', JSON.stringify([]));
      } else {
        let todoLocal = JSON.parse(localStorage.getItem('todos'));
        setTodos(todoLocal);
      }
    }
    
  return (
    <div className="App">
     <header>
       <h1>Task-Master!</h1>
     </header>
     <Form 
     inputText={inputText}
     setInputText={setInputText}
     todos={todos} 
     setTodos={setTodos} 
     setStatus={Setstatus}
     
     />
     <TodoList filteredTodos={filterTodos} setTodos={setTodos}  todos={todos}/>
    </div>
  );
}

export default App;
