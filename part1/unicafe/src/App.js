import { useState } from 'react'

const Header = ({ text }) => {
  return (
    <div>
      <h1>{text}</h1>
    </div>
  )
}

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const Display = ({ text, number, isPercent }) => {
  if (isPercent) {
    return (
      <tr>
        <td>{text}</td>
        <td>{number}%</td>
      </tr>
    )
  }
  return (
    <tr>
      <td>{text}</td>
      <td>{number}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <Header text="statistics" />
      <table>
        <tbody>
          <Display text="good" number={good} isPercent={false} />
          <Display text="neutral" number={neutral} isPercent={false} />
          <Display text="bad" number={bad} isPercent={false} />
          <Display text="all" number={good + neutral + bad} isPercent={false} />
          <Display text="average" number={(good - bad) / (good + neutral + bad)} isPercent={false} />
          <Display text="positive" number={(good / (good + neutral + bad)) * 100} isPercent={true} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGood = () => setGood(good + 1);
  const addNeutral = () => setNeutral(neutral + 1);
  const addBad = () => setBad(bad + 1);

  return (
    <div>
      <Header text="give feedback" />
      <Button onClick={addGood} text="good" />
      <Button onClick={addNeutral} text="neutral" />
      <Button onClick={addBad} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App