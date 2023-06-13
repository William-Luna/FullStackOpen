import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotificationAndTimeout } from '../reducers/notificationReducer'

const AnecdoteList = () => {

  const anecdotesUnsorted = useSelector(({ filter, anecdotes }) => {
    if (filter === '') return anecdotes
    return anecdotes.filter(anecdote => anecdote.content.includes(filter))
  })
  const anecdotes = [...anecdotesUnsorted].sort((a, b) => b.votes - a.votes)
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    console.log('vote', anecdote.id)
    const anecdoteChanged = { ...anecdote, votes: anecdote.votes + 1 }
    dispatch(addVote(anecdoteChanged))
    dispatch(setNotificationAndTimeout(`Vote added for ${anecdoteChanged.content}`, 5000))
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
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )

}

export default AnecdoteList