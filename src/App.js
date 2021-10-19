import React from 'react';
import Header from './components/Header';
import TodoList from './components/TodoList';
import Footer from './components/Footer';

class App extends React.Component {
  state = {
    todos: [],
    filter: 'all',
  };

  handleSubmit = (newTodo) => {
    this.setState(prevState => ({
      todos: [
        ...prevState.todos,
        {
          id: new Date().getTime(),
          text: newTodo,
          complete: 'active',
        },
      ],
    }));
  };

  changeStatus = (id) => {
    const newTodos = [...this.state.todos];
    const todo = newTodos.find(currentTodo => currentTodo.id === id);

    if (todo.complete === 'active') {
      todo.complete = 'completed';
    } else {
      todo.complete = 'active';
    }

    this.setState({
      todos: [...newTodos],
    });
  };

  changeAllStatus = (toggleAll) => {
    let newTodos = [...this.state.todos];

    if (!toggleAll) {
      newTodos = newTodos.map(todo => ({
        ...todo,
        complete: 'completed',
      }));
    } else {
      newTodos = newTodos.map(todo => ({
        ...todo,
        complete: 'active',
      }));
    }

    this.setState({
      todos: [...newTodos],
    });
  };

  handleClear = (id) => {
    this.setState(prevState => (
      {
        todos: prevState.todos.filter(todo => todo.id !== id),
      }
    ));
  };

  clearCompleted = () => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.complete === 'active'),
    }));
  };

  handleFilter = (filter) => {
    this.setState({
      filter,
    });
  };

  render() {
    const { todos, filter } = this.state;
    const countOfActive = todos.filter(
      todo => todo.complete === 'active'
    ).length;
    let filteredTodos = [];

    if (filter !== 'all') {
      filteredTodos = todos.filter(todo => todo.complete === filter);
    } else {
      filteredTodos = todos;
    }

    return (
      <section className="todoapp">
        <Header onSubmit={this.handleSubmit} />

        {(todos.length !== 0)
          ? (
            <>
              <TodoList
                filtredTodos={filteredTodos}
                onChangeStatus={this.changeStatus}
                onDestroyTodo={this.handleClear}
                toggleAll={countOfActive === 0 && true}
                onChangeAllStatus={this.changeAllStatus}
              />

              <Footer
                active={countOfActive}
                completed={todos.length - countOfActive > 0}
                filter={filter}
                onFilter={this.handleFilter}
                onClear={this.clearCompleted}
              />
            </>
          )
          : ''
        }

      </section>
    );
  }
}

export default App;
