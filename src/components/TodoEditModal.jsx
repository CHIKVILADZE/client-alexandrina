import axios from 'axios';
import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const TodoEditModal = ({ todo, setTodos, t }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);
  const [status, setStatus] = useState(todo.status);

  const originalValues = () => {
    setTitle(todo.title);
    setDescription(todo.description);
    setStatus(todo.status);
    handleClose();
  };

  const updateTodo = async (e) => {
    e.preventDefault();
    try {
      const body = { title, description, status };
      const response = await axios.put(
        `https://server-alexandina.onrender.com/todos/${todo.todo_id}`,
        body,
        {
          headers: {
            'Content-Type': 'application/json',
            body: JSON.stringify(body),
          },
        }
      );

      setTodos((prevTodos) =>
        prevTodos.map((item) =>
          item.todo_id === todo.todo_id ? { ...item, ...body } : item
        )
      );
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Button className="btn btn-warning" onClick={handleShow}>
        {t('buttons.editTodo')}
      </Button>

      <Modal show={show} onHide={originalValues}>
        <Modal.Header closeButton>
          <Modal.Title>{t('modal.editTodo')} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="w-100vw  border borde-secondary rounded-3 p-3 bg-light ">
            <div className="mb-3" style={{ height: '50px' }}>
              <label>{t('modal.editTitle')} </label>
              <input
                type="text"
                className="form-control "
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-3" style={{ height: '90px' }}>
              <label>{t('modal.editDescription')} </label>
              <textarea
                className="form-control no-resize"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="mb-3" style={{ height: '50px' }}>
              <label>{t('modal.editStatus')} </label>
              <select
                className="form-select"
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Done">Done</option>
                <option value="In Progress">In Progress</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="success"
            className="mt-2"
            onClick={(e) => updateTodo(e)}
          >
            {t('modal.saveChanges')}{' '}
          </Button>
          <Button variant="secondary" onClick={originalValues}>
            {t('modal.close')}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TodoEditModal;
