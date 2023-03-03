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
  }

  handleChange = (event) => {
    this.setState({
      input: event.target.value,
    });
    console.log(this.state);
  };

  render() {
    const { input, todos } = this.state;
    return (
      <div>
        <div className="screen">
          <input value={input} onChange={this.handleChange} />
          <button type="button">Add</button>
        </div>
        <ul className="todos">
          {todos.map(({ id, completed, task }) => (
            <li key={id}>
              <input type="checkbox" checked={completed} />
              {task}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
