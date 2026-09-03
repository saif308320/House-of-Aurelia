import { useState } from 'react'
import { Link } from 'react-router-dom'
import { money } from '../catalog/index.js'
import Layout from '../components/Layout.jsx'
import Img from '../components/Img.jsx'
import { useHouse, useShop } from '../store.jsx'

export default function Bag({ houseKey }) {
  const house = useHouse(houseKey)
  const { cart, setQty, clearCart } = useShop()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [note, setNote] = useState('')
  const mine = cart.filter((i) => i.house === houseKey)
  const total = mine.reduce((s, i) => s + i.price * i.qty, 0)

  async function checkout(e) {
    e.preventDefault()
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ house: houseKey, name, email, items: mine })
    })
    const data = await res.json()
    setNote(data.message)
    clearCart()
  }

  return (
    <Layout house={house}>
      <div className="bag-page">
        <h2 style={{ fontFamily: 'var(--serif)', fontSize: 48, fontWeight: 500, marginBottom: 24 }}>Your bag</h2>
        {mine.length === 0 && !note && <p className="story">Empty. <Link to={house.path}>Return to the floor.</Link></p>}
        {mine.map((i) => (
          <div className="bag-row" key={i.id + (i.size || '')}>
            <Img src={i.images && i.images[0]} alt={i.name} />
            <div>
              <b>{i.name}</b>
              <div className="story">{i.size || i.colour} · {money(house, i.price)}</div>
            </div>
            <div className="qty">
              <button type="button" onClick={() => setQty(i.id, i.house, i.qty - 1)}>-</button>
              {i.qty}
              <button type="button" onClick={() => setQty(i.id, i.house, i.qty + 1)}>+</button>
            </div>
            <div>{money(house, i.price * i.qty)}</div>
          </div>
        ))}
        {mine.length > 0 && (
          <>
            <p style={{ margin: '20px 0', fontFamily: 'var(--serif)', fontSize: 28 }}>Total {money(house, total)}</p>
            <form className="form" onSubmit={checkout}>
              <input placeholder="Name" required value={name} onChange={(e) => setName(e.target.value)} />
              <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
              <button className="btn" type="submit">Place order with the desk</button>
            </form>
          </>
        )}
        {note && <p className="ok" style={{ marginTop: 16 }}>{note}</p>}
      </div>
    </Layout>
  )
}
