import React, { Component } from 'react';

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
    const { input, todos } = this.state;
    event.preventDefault();
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

  render() {
    const { input, todos } = this.state;
    return (
      <div>
        <form className="screen" onSubmit={this.addToDo}>
          <input value={input} onChange={this.handleChange} />
          <button type="submit">Add</button>
        </form>
        <ul className="todos">
          {todos.map(({ id, completed, task }) => (
            <li key={id}>
              <input key={id} type="checkbox" checked={completed} onChange={() => this.markCompleted(id)} />
              {task}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
