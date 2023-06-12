import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {

  const anecdotesUnsorted = useSelector(({ filter, anecdotes }) => {
    if (filter === '') return anecdotes
    return anecdotes.filter(anecdote => anecdote.content.includes(filter))
  })
  const anecdotes = [...anecdotesUnsorted].sort((a, b) => b.votes - a.votes)
  const dispatch = useDispatch()

  const vote = (id, content) => {
    console.log('vote', id)
    dispatch(addVote(id))
    dispatch(setNotification(`Vote added for ${content}`))

    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }



  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )

}

export default AnecdoteList