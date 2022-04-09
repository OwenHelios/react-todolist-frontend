import { Fragment, useContext, useState } from 'react'
import { GlobalContext } from '../context/GlobalTodos'

const EditTodo = ({ todo }) => {
  const { editTodo } = useContext(GlobalContext)
  const [description, setDescription] = useState(todo.description)

  const updateTodo = async e => {
    e.preventDefault()
    try {
      const body = { description }
      await fetch(`http://localhost:5000/todos/${todo.todo_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
      editTodo({ ...todo, description })
    } catch (err) {
      console.error(err.message)
    }
  }
  return (
    <Fragment>
      <button
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target={`#todo${todo.todo_id}`}
      >
        Edit
      </button>
      {/* html ids can't be just numbers, so add 'todo' prefix to make it a string */}
      <div className="modal" id={`todo${todo.todo_id}`}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Todo</h4>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                onChange={e => setDescription(e.target.value)}
                value={description}
              />
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={e => updateTodo(e)}
              >
                Save
              </button>
              <button className="btn btn-danger" data-bs-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default EditTodo
