import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { getAnecdotes, incrementVote } from './requests'
import { useNotificationDispatch } from './NotificationContext'

const App = () => {

  const notiDispatch = useNotificationDispatch()

  const queryClient = useQueryClient()
  const addVoteMutation = useMutation(incrementVote, {
    //onSuccess: () => queryClient.invalidateQueries('anecdotes')
    onSuccess: (updatedAnecdote) => {
      const anecs = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes',
        anecs.map(anec => anec.id !== updatedAnecdote.id ? anec : updatedAnecdote))
    },
    onError: (error) => {
      notiDispatch({ type: "SEND", payload: `Error adding vote to anecdote - ${error}` })
      setTimeout(() => {
        notiDispatch({ type: "CLEAR" })
      }, 5000)
    }
  })

  const result = useQuery(
    'anecdotes',
    getAnecdotes,
    {
      retry: 1,
      refetchOnWindowFocus: false
    }
  )

  if (result.isLoading) {
    return <div>Loading Data...</div>
  }

  if (result.isError) {
    return <div>Anecdote service not available due to server problems.</div>
  }

  const anecdotes = result.data

  const handleVote = (anecdote) => {
    addVoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    notiDispatch({ type: "SEND", payload: `Vote added to "${anecdote.content}"` })
    setTimeout(() => {
      notiDispatch({ type: "CLEAR" })
    }, 5000)
  }



  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
