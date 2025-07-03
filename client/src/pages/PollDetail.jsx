import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../services/api'

function PollDetail() {
  const { id } = useParams()
  const [poll, setPoll] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [voting, setVoting] = useState(false)

  useEffect(() => {
    fetchPoll()
  }, [id])

  const fetchPoll = async () => {
    setLoading(true)
    try {
      const res = await api.get(`/polls/${id}`)
      setPoll(res.data)
      setError(null)
    } catch (err) {
      setError('Failed to load poll')
      setPoll(null)
    } finally {
      setLoading(false)
    }
  }

  const handleVote = async (optionIndex) => {
    if (voting) return // prevent multiple clicks
    setVoting(true)
    try {
      const res = await api.post(`/polls/${id}/vote`, { optionIndex })
      setPoll(res.data)
      setError(null)
    } catch (err) {
      setError('Failed to cast vote')
    } finally {
      setVoting(false)
    }
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p style={{ color: 'red' }}>{error}</p>
  if (!poll) return <p>No poll found.</p>

  console.log('poll:', poll)
  console.log('poll.options:', poll?.options)

  return (
    <div>
      <h2>{poll.question}</h2>
      <ul>
        {poll.options.map((opt, idx) => (
          <li key={idx}>
            {opt.text} — Votes: {opt.votes}
            <button
              onClick={() => handleVote(idx)}
              disabled={voting}
              style={{ marginLeft: '10px' }}
            >
              Vote
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PollDetail
