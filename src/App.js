import { Fragment } from 'react'
import './App.css'
//components
import InputTodo from './components/InputTodo'
import ListTodos from './components/ListTodos'
//context
import { GlobalProvider } from './context/GlobalTodos'

function App() {
  return (
    <GlobalProvider>
      <Fragment>
        <div className="container">
          <InputTodo />
          <ListTodos />
        </div>
      </Fragment>
    </GlobalProvider>
  )
}

export default App
