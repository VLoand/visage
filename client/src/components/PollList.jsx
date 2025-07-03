import React, { useEffect, useState } from 'react'

export default function PollList() {
  const [polls, setPolls] = useState([])

  useEffect(() => {
    fetch('http://localhost:4000/api/polls', {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => setPolls(data))
      .catch(err => console.error('fetch polls error:', err))
  }, [])

  return (
    <div>
      <h2>Polls</h2>
      {polls.length === 0 ? (
        <p>No polls available</p>
      ) : (
        polls.map(poll => (
          <div key={poll.id} style={{ marginBottom: 20 }}>
            <h3>{poll.question}</h3>
            <ul>
              {poll.options.map(option => (
                <li key={option.id}>
                  {option.text} — Votes: {option.votes || 0}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  )
}
