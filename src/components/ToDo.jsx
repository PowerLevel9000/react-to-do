import React, { Component } from 'react';
import Title from './Title';

export default class ToDo extends Component {
  constructor(props) {
    super(props);
    const todosFromStorage = JSON.parse(localStorage.getItem('todos')) || [];
    this.state = {
      input: '',
      todos: todosFromStorage,
    };
    this.handleChange = this.handleChange.bind(this);
    this.addToDo = this.addToDo.bind(this);
    this.markCompleted = this.markCompleted.bind(this);
  }

  handleChange = (event) => {
    this.setState({
      input: event.target.value,
    });
  };

  markCompleted = (id) => {
    this.setState((prevState) => {
      const updatedTodos = prevState.todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
      localStorage.setItem('todos', JSON.stringify(updatedTodos));
      return {
        todos: updatedTodos,
      };
    });
  };

  addToDo(event) {
    event.preventDefault();
    const { input, todos } = this.state;
    const newTodo = {
      id: Date.now(),
      task: input,
      completed: false,
    };
    const updatedTodos = [...todos, newTodo];
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    this.setState({
      todos: updatedTodos,
      input: '',
    });
  }

  removeToDo(id) {
    this.setState((prevState) => {
      const updatedTodos = prevState.todos.filter((todo) => todo.id !== id);
      localStorage.setItem('todos', JSON.stringify(updatedTodos));
      return {
        todos: updatedTodos,
      };
    });
  }

  render() {
    const { input, todos } = this.state;
    return (
      <div className="tasks">
        <Title />
        <form className="screen" onSubmit={this.addToDo}>
          <input value={input} onChange={this.handleChange} />
          <button type="submit">Add</button>
        </form>
        <div>
          {todos.map(({ id, completed, task }) => (
            <div className="to-do" key={id}>
              <input key={id} type="checkbox" checked={completed} onChange={() => this.markCompleted(id)} />
              <p>{task}</p>
              <button type="button" onClick={() => this.removeToDo(id)}>remove</button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
