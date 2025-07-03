import { useEffect, useState } from 'react'
import api from '../services/api'

function PollList() {
  const [polls, setPolls] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    api.get('/polls')
      .then(res => {
        setPolls(res.data)
        setError(null)
      })
      .catch(err => {
        console.error('Failed to fetch polls', err)
        setError('Failed to load polls.')
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p>Loading polls...</p>
  if (error) return <p>{error}</p>

  return (
    <div>
      <h2>Polls</h2>
      {polls.length === 0 ? (
        <p>No polls yet.</p>
      ) : (
        <ul>
        {polls.map(poll => (
          <li key={poll.id || poll._id}>
            <strong>{poll.question}</strong>
            <ul>
              {poll.options.map((opt, idx) => (
                <li key={opt.id || opt._id || idx}>
                  {opt.text} — Votes: {opt.votes || 0}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      
      )}
    </div>
  )
}

export default PollList
