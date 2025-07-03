import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import PollList from './pages/PollList'
import PollDetail from './pages/PollDetail'
import CreatePoll from './pages/CreatePoll'
import Navbar from './components/Navbar'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<PollList />} />
        <Route path="/polls/:id" element={<PollDetail />} />
        <Route path="/create" element={<CreatePoll />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  )
}

export default App

