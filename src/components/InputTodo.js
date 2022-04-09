import { Fragment, useContext, useRef } from 'react'
import { GlobalContext } from '../context/GlobalTodos'

const InputTodo = () => {
  const { todos, addTodo } = useContext(GlobalContext)
  const inputRef = useRef(null)
  const handleSubmit = async e => {
    e.preventDefault()
    if (!inputRef.current.value) return
    try {
      const maxId = todos.reduce(
        (acc, todo) => (acc > todo.todo_id ? acc : todo.todo_id),
        1
      )
      const body = { todo_id: maxId + 1, description: inputRef.current.value }
      await fetch('http://localhost:5000/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })

      addTodo(body)
    } catch (err) {
      console.error(err.message)
    }
  }
  return (
    <Fragment>
      <h1 className="text-center mt-5">Todo List</h1>
      <form className="d-flex mt-5" onSubmit={handleSubmit}>
        <input type="text" className="form-control" ref={inputRef} />
        <button className="btn btn-success">Add</button>
      </form>
    </Fragment>
  )
}

export default InputTodo
