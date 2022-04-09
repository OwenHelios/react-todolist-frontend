import { createContext, useReducer } from 'react'
import TodosReducer from './TodosReducer'

export const GlobalContext = createContext()

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(TodosReducer, { todos: [] })

  function setTodos(todos) {
    dispatch({
      type: 'SET_TODOS',
      payload: todos,
    })
  }
  function deleteTodo(id) {
    dispatch({
      type: 'DELETE_TODO',
      payload: id,
    })
  }

  function addTodo(todo) {
    dispatch({
      type: 'ADD_TODO',
      payload: todo,
    })
  }

  function editTodo(todo) {
    dispatch({
      type: 'EDIT_TODO',
      payload: todo,
    })
  }

  return (
    <GlobalContext.Provider
      value={{
        todos: state.todos,
        setTodos,
        deleteTodo,
        addTodo,
        editTodo,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
