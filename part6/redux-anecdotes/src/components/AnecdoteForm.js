import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const NewAnecdote = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()

    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const newAnecdote = await anecdoteService.create(content)
    dispatch(createAnecdote(newAnecdote))
    dispatch(setNotification(`New anecdote added: ${content}`))
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