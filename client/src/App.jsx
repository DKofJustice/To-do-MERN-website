import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import AddTask from './Pages/AddTask'
import TaskList from './Pages/TaskList'
import NotFound from './Pages/NotFound'
import UpdateTask from './Pages/UpdateTask'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<TaskList/>} />
        <Route path='/task/new' element={<AddTask/>} />
        <Route path='/task/update' element={<UpdateTask/>} />
        <Route path='*' element={<NotFound/>} />
      </Routes>
    </div>
  )
}

export default App
