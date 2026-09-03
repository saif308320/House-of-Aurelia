import express from 'express'
import cors from 'cors'
import { US } from '../src/catalog/us.js'

const app = express()
const PORT = 3002
const extra = { us: [] }

app.use(cors())
app.use(express.json())

app.get('/api/live', (req, res) => {
  const house = req.query.house === 'uk' ? 'Mayfair' : 'SoHo'
  res.json({ advisor: 'Floor stylist', city: house, wait: '0s' })
})

app.get('/api/products', (req, res) => {
  const key = req.query.house || 'us'
  res.json({ ok: true, products: extra[key] || [] })
})

app.post('/api/products', (req, res) => {
  const body = req.body || {}
  const house = body.house || 'us'
  if (!body.name || !body.image) {
    return res.status(400).json({ ok: false, error: 'Name and image required' })
  }
  const id = String(body.name).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Date.now().toString(36)
  const product = {
    id,
    house,
    cat: body.cat || 'lips',
    name: body.name,
    line: body.line || 'New',
    price: Number(body.price) || 32,
    colour: body.shade || 'House',
    blurb: body.blurb || 'New to the floor.',
    story: body.blurb || 'Added from the staff studio.',
    notes: String(body.notes || 'New').split(',').map((s) => s.trim()).filter(Boolean),
    specs: ['Studio', 'NYC', 'Live', 'Floor'],
    sizes: body.shade ? [body.shade] : ['One size'],
    images: [body.image, body.image2, body.image3].filter(Boolean)
  }
  extra[house] = extra[house] || []
  extra[house].unshift(product)
  res.json({ ok: true, product })
})

app.post('/api/reserve', (req, res) => {
  const { name, productName, price } = req.body || {}
  res.json({
    ok: true,
    message: `${name || 'Guest'}, ${productName || 'your piece'} is held at the SoHo desk. ${price ? `$${price}.` : ''} Bring ID.`
  })
})

app.post('/api/checkout', (req, res) => {
  const { name, items } = req.body || {}
  const n = (items || []).reduce((s, i) => s + (i.qty || 1), 0)
  res.json({
    ok: true,
    message: `Thank you ${name || ''}. Order for ${n} piece${n === 1 ? '' : 's'} is with the desk. We will confirm by email.`
  })
})

function replyFor(message, productName) {
  const q = String(message || '').toLowerCase()
  if (/hold|reserv/.test(q)) return 'I can hold it at the Mercer desk until close. Give me a name on the product page.'
  if (/shade|match|colour|color/.test(q)) return 'Come in for a live match — we check daylight then restaurant lamps. Fair 1 through Deep 10, including olive.'
  if (/size|fit/.test(q)) return 'Most beauty is one size or a shade. Foundation is twenty shades. Lip bullets refill.'
  if (/red|broadway/.test(q)) return 'Broadway Red is the blue-red. Opaque, satin, opening-night. Survives humidity.'
  if (/ship|deliver|overnight/.test(q)) return 'Overnight in Manhattan. Two days for the boroughs. Holds are same-day at the desk.'
  if (/vegan|cruel/.test(q)) return 'Formulas are vegan. Brushes are synthetic. Compacts refill where marked.'
  return productName
    ? `Looking at ${productName}. Ask for a shade, a hold, or how it wears in flash.`
    : 'Lips, eyes, face, skin. Ask for a shade or a hold — I am on the SoHo floor.'
}

app.post('/api/concierge', (req, res) => {
  const { message, productName } = req.body || {}
  res.json({ reply: replyFor(message, productName) })
})

app.post('/api/concierge/stream', (req, res) => {
  const { message, productName } = req.body || {}
  const text = replyFor(message, productName)
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')
  let i = 0
  const words = text.split(' ')
  const tick = setInterval(() => {
    if (i >= words.length) {
      clearInterval(tick)
      res.write('data: {"done":true}\n\n')
      res.end()
      return
    }
    res.write(`data: ${JSON.stringify({ token: (i ? ' ' : '') + words[i] })}\n\n`)
    i += 1
  }, 40)
})

app.get('/api/health', (_req, res) => res.json({ ok: true, house: US.name }))

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Aurelia desk on ${PORT}`)
})
