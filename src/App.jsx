
import { useState, useRef, useEffect } from 'react'
import Todo from './components/Todo'
import Form from './components/Form'
import FilterButton from './components/FilterButton'

const FILTER_MAP = {
  all: () => true,
  active: task => !task.completed,
  completed: task => task.completed
}

const FILTER_NAMES = Object.keys(FILTER_MAP)

function usePrevious(value) {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

function App({ _tasks }) {

  function addTask(name) {
    const id = crypto.randomUUID()
    const newTask = { id, name, completed: false }
    setTasks([...tasks, newTask])
  }

  function toggleTaskCompleted(id) {
    setTasks(tasks.map(task => {
      if (id === task.id) {
        return { ...task, completed: !task.completed }
      }
      return task
    }))
  }

  function editTask(id, newName) {
    setTasks(tasks.map(task => {
      if (id === task.id) {
        return { ...task, name: newName }
      }
      return task
    }))
  }

  function deleteTask(id) {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const [tasks, setTasks] = useState(_tasks)
  const [filter, setFilter] = useState('all')
  const headingText = `${tasks.length} ${tasks.length === 1 ? 'task' : 'tasks'} remaining`

  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map(task => (
      <Todo 
        id={task.id} 
      name={task.name} 
      completed={task.completed} 
      key={task.id} 
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  ))

  const filterList = FILTER_NAMES.map(name => (
    <FilterButton key={name} name={name} isPressed={name === filter} setFilter={setFilter} />
  ))

  const listHeadingRef = useRef(null)

  const prevTaskLength = usePrevious(tasks.length)

  useEffect(() => {
    if (tasks.length < prevTaskLength) {
      listHeadingRef.current.focus()
    }
  }, [tasks.length, prevTaskLength])
  
  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>{headingText}</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
        {taskList}
      </ul>
    </div>
  );
}

export default App;
