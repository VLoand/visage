import { useState } from 'react'
import api from '../services/api'

function CreatePoll() {
  const [question, setQuestion] = useState('')
  const [options, setOptions] = useState([{ text: '' }, { text: '' }])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const handleOptionChange = (index, value) => {
    const newOptions = [...options]
    newOptions[index].text = value
    setOptions(newOptions)
  }

  const addOption = () => {
    setOptions([...options, { text: '' }])
  }

  const removeOption = (index) => {
    if (options.length <= 2) return // minimum 2 options
    setOptions(options.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)

    if (!question.trim()) {
      setError('Question is required')
      setLoading(false)
      return
    }

    const filteredOptions = options.filter(opt => opt.text.trim() !== '')
    if (filteredOptions.length < 2) {
      setError('At least two options are required')
      setLoading(false)
      return
    }

    try {
      const createdBy = 'test@example.com' // temp static, replace with auth user later
      await api.post('/polls', { question, options: filteredOptions, createdBy })
      setSuccess('Poll created successfully!')
      setQuestion('')
      setOptions([{ text: '' }, { text: '' }])
    } catch {
      setError('Failed to create poll')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2>Create New Poll</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Question:</label>
          <input
            type="text"
            value={question}
            onChange={e => setQuestion(e.target.value)}
            disabled={loading}
            required
          />
        </div>

        <div>
          <label>Options:</label>
          {options.map((opt, i) => (
            <div key={i}>
              <input
                type="text"
                value={opt.text}
                onChange={e => handleOptionChange(i, e.target.value)}
                disabled={loading}
                required
              />
              {options.length > 2 && (
                <button type="button" onClick={() => removeOption(i)} disabled={loading}>
                  Remove
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={addOption} disabled={loading}>
            Add Option
          </button>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Poll'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  )
}

export default CreatePoll
