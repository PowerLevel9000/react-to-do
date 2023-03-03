import React, { Component } from 'react';

export default class ToDo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      todos: [
        {
          id: 1,
          task: 'complete your work',
          completed: true,
        },
        {
          id: 2,
          task: 'give him the review',
          completed: false,
        },
        {
          id: 3,
          task: 'go fuck yourself',
          completed: false,
        },
      ],
    };
    this.handleChange = this.handleChange.bind(this);
    this.addToDo = this.addToDo.bind(this);
    this.markCompleted = this.markCompleted.bind(this);
  }

  handleChange(event) {
    this.setState({
      input: event.target.value,
    });
  }

  markCompleted(id) {
    this.setState((prevState) => {
      const updatedTodos = prevState.todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
      return {
        todos: updatedTodos,
      };
    });
  }

  addToDo(event) {
    event.preventDefault();
    this.setState((state) => ({
      todos: [
        ...state.todos,
        {
          id: state.todos.length + 1,
          task: state.input,
          completed: false,
        },
      ],
      input: '',
    }));
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
              <input type="checkbox" checked={completed} onChange={() => this.markCompleted(id)} />
              {task}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
