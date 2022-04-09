import { Fragment, useEffect, useContext, useState } from 'react'
import { GlobalContext } from '../context/GlobalTodos'
import EditTodo from './EditTodo'
const ListTodos = () => {
  const { todos, setTodos, deleteTodo } = useContext(GlobalContext)
  const [loading, setLoading] = useState(true)

  const getTodos = async () => {
    try {
      const response = await fetch('http://localhost:5000/todos')
      const jsonData = await response.json()
      setTodos(jsonData)
    } catch (err) {
      console.error(err.message)
    }
    setLoading(false)
  }

  const handleDelete = async id => {
    try {
      await fetch(`http://localhost:5000/todos/${id}`, {
        method: 'DELETE',
      })
      deleteTodo(id)
    } catch (err) {
      console.error(err.message)
    }
  }

  useEffect(() => {
    getTodos()
  }, [])

  return (
    <Fragment>
      {loading ? (
        <div
          className="w-100 d-flex justify-content-center align-items-center"
          style={{ height: '300px' }}
        >
          <div className="spinner-border"></div>
        </div>
      ) : (
        <table className="table mt-5 text-center">
          <thead>
            <tr>
              <th>Description</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {todos.map(todo => (
              <tr key={todo.todo_id}>
                <td>{todo.description}</td>
                <td>
                  <EditTodo todo={todo} />
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(todo.todo_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Fragment>
  )
}

export default ListTodos
