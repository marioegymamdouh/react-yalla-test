import React from "react";
import './App.css';
import TasksList from "./containers/TasksList/TasksList";

const app = (props) => {
  return (
    <div className="App">
      <TasksList/>
    </div>
  );
};

export default app;
