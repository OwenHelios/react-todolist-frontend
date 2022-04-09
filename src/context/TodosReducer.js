export default function TodosReducer(state, { type, payload }) {
  switch (type) {
    case 'SET_TODOS':
      return {
        ...state,
        todos: payload,
      }
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.todo_id !== payload),
      }
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, payload],
      }
    case 'EDIT_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.todo_id === payload.todo_id ? payload : todo
        ),
      }
    default:
      return state
  }
}
