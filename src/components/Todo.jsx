import { useState, useRef, useEffect } from 'react'
import { usePrevious } from './Utils'

function Todo({ id, name, completed, toggleTaskCompleted, deleteTask, editTask }) {

  const [isEditing, setIsEditing] = useState(false)
  const [newName, setNewName] = useState('')
  
  const wasEditing = usePrevious(isEditing)

  const editFieldRef = useRef(null)
  const editButtonRef = useRef(null)

  function handleEdit(e) {
    e.preventDefault()
    editTask(id, newName)
    setNewName('')
    setIsEditing(false)
  }
  
  const editingTemplate = (
    <form className="stack-small">
      <div className="form-group">
        <label className="todo-label" htmlFor={id}>
          New name for {name}
        </label>
        <input 
          id={id} 
          ref={editFieldRef} 
          className="todo-text" 
          type="text" 
          value={newName} 
          onChange={e => setNewName(e.target.value)} 
        />
      </div>
      <div className="btn-group">
        <button type="button" className="btn todo-cancel" onClick={() => setIsEditing(false)}>
          Cancel
          <span className="visually-hidden">renaming {name}</span>
        </button>
        <button type="submit" className="btn btn__primary todo-edit" onClick={handleEdit}>
          Save
          <span className="visually-hidden">new name for {name}</span>
        </button>
      </div>
    </form>
  );

  const viewTemplate = (
    <div className="stack-small">
      <div className="c-cb">
        <input
          id={id}
          type="checkbox"
          defaultChecked={completed}
          onChange={() => toggleTaskCompleted(id)}
        />
        <label className="todo-label" htmlFor={id}>
          {name}
        </label>
      </div>
      <div className="btn-group">
        <button ref={editButtonRef} type="button" className="btn" onClick={() => setIsEditing(true)}>
          Edit <span className="visually-hidden">{name}</span>
        </button>
        <button
          type="button"
          className="btn btn__danger"
          onClick={() => deleteTask(id)}>
          Delete <span className="visually-hidden">{name}</span>
        </button>
      </div>
    </div>
  );  

  useEffect(() => {
    if (!wasEditing && isEditing) {
      editFieldRef.current.focus()
    } else if (wasEditing && !isEditing) {
      editButtonRef.current.focus()
    }
  }, [wasEditing, isEditing]);
  
  return (isEditing ? editingTemplate : viewTemplate)
}

export default Todo
