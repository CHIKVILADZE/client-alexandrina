import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import TodoEditModal from './TodoEditModal';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PDFFile from './PDFFile';

const TodoList = ({ todos, setTodos, t }) => {
  const getTodos = async () => {
    try {
      const response = await axios.get(
        'https://server-alexandina.onrender.com/todos'
      );
      const data = response.data;
      setTodos(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  // Delete Todo

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`https://server-alexandina.onrender.com/todos/${id}`);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.todo_id !== id));
    } catch (error) {
      console.error(error.message);
    }
  };
  console.log('todss', todos);
  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-end">
        <PDFDownloadLink
          document={<PDFFile t={t} todos={todos} />}
          fileName="todo-list.pdf"
        >
          {({ blob, url, loading, error }) =>
            loading ? 'Loading document...' : 'Download PDF'
          }
        </PDFDownloadLink>
      </div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">{t('table.title')}</th>
            <th scope="col">{t('table.description')}</th>
            <th scope="col">{t('table.status')}</th>
            <th scope="col">{t('buttons.editTodo')}</th>
            <th scope="col">{t('buttons.deleteTodo')}</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.todo_id}>
              <td>{todo.title}</td>
              <td>{todo.description}</td>
              <td>{todo.status}</td>
              <td>
                <TodoEditModal todo={todo} setTodos={setTodos} t={t} />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTodo(todo.todo_id)}
                >
                  {t('buttons.deleteTodo')}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoList;
