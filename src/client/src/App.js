import React, {Component} from 'react';
// @ts-ignore
import logo from './logo.svg';
import './App.css';
import AddTask from './components/add-tasks/AddTask';
import ListTasks from './components/list-tasks/ListTasks';

function App() {
  return (
    <div className="container mt-5">
      <AddTask></AddTask>
      <hr />
      <ListTasks></ListTasks>
    </div>
  );
}

export default App;
