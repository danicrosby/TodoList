import React, { useState, useRef } from 'react';
import TodoList from './TodoList';
import {v4 as uuidv4} from 'uuid';
import './App.scss';

const LOCAL_STORAGE_KEY = 'todoApp.todo';

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value;
    if (name === '') return;
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }]
    });
    todoNameRef.current.value = null
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }


  return (
    <div className='App'>
      <TodoList todos={todos} toggleTodo={toggleTodoo}/>
      <input ref={todoNameRef} type="text" />
      <button onClick={handleAddTodo}>Add</button>
      <button onClick={handleClearTodos}>Clear</button>
      <div>{todos.filter(todo => !todo.complete).length}left to do</div>
    </div>
  );
}

export default App;
