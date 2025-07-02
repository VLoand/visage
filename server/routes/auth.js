const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET

// REGISTER
router.post('/register', async (req, res) => {
  const { email, password } = req.body
  try {
    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) return res.status(400).json({ message: 'User already exists' })

    const hashed = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
      data: { email, password: hashed }
    })

    res.status(201).json({ message: 'User created' })
  } catch (err) {
    res.status(500).json({ message: 'Registration failed' })
  }
})

// LOGIN
router.post('/login', async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) return res.status(400).json({ message: 'Invalid credentials' })

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) return res.status(401).json({ message: 'Invalid credentials' })

    const accessToken = jwt.sign({ id: user.id }, ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
    const refreshToken = jwt.sign({ id: user.id }, REFRESH_TOKEN_SECRET, { expiresIn: '7d' })

    // optional: set refresh token as HTTP-only cookie
    res.cookie('jid', refreshToken, {
      httpOnly: true,
      secure: false, // set to true in production (https only)
      sameSite: 'lax',
      path: '/api/auth/refresh'
    })

    res.json({ accessToken })
  } catch (err) {
    res.status(500).json({ message: 'Login failed' })
  }
})

module.exports = router
