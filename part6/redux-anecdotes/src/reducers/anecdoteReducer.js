import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes"

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    incrementVote(state, action) {
      const votedAnecdote = action.payload
      return state.map(anec => anec.id !== votedAnecdote.id ? anec : votedAnecdote)
    },

    appendAnecdote(state, action) {
      state.push(action.payload)
    },

    setAnecdotes(state, action) {
      return action.payload
    }
  }
})


export const { incrementVote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const initAnecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(initAnecdotes))
  }
}

export const newAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const addVote = anecdoteChanged => {
  return async dispatch => {
    const anecdote = await anecdoteService.editVote(anecdoteChanged)
    dispatch(incrementVote(anecdote))
  }
}

export default anecdoteSlice.reducer