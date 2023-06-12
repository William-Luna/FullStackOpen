import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const NewAnecdote = () => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()

    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(anecdote))
    dispatch(setNotification(`New anecdote added: ${anecdote}`))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }

  return (
    <div>
      <h2>Create New Anecdote</h2>
      <form onSubmit={addAnecdote}>
        <input name="anecdote" />
        <button type="submit">Add</button>
      </form>
    </div>
  )
}

export default NewAnecdote