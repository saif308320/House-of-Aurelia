import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { catsFor } from '../catalog/index.js'
import Layout from '../components/Layout.jsx'
import { useHouse, useShop } from '../store.jsx'

export default function Studio({ houseKey }) {
  const house = useHouse(houseKey)
  const { refreshAdded } = useShop()
  const nav = useNavigate()
  const cats = catsFor(house)
  const [msg, setMsg] = useState('')
  const [f, setF] = useState({
    name: '', price: '', cat: cats[0].id, line: house.kind === 'fashion' ? 'Dresses' : 'Lips',
    shade: '', blurb: '', image: '', image2: '', image3: '', notes: 'New, Limited, Floor'
  })
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })

  async function submit(e) {
    e.preventDefault()
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...f, house: houseKey })
    })
    const data = await res.json()
    if (!data.ok) { setMsg(data.error || 'Could not add'); return }
    await refreshAdded(houseKey)
    setMsg(`${data.product.name} is live.`)
    setTimeout(() => nav(`${house.path}/product/${data.product.id}`), 600)
  }

  return (
    <Layout house={house}>
      <div className="studio">
        <div className="kicker">Staff studio</div>
        <h1>Add a {house.kind === 'fashion' ? 'garment' : 'beauty piece'}</h1>
        <p className="story" style={{ margin: '8px 0 24px' }}>
          {house.kind === 'fashion'
            ? 'Clothing only — dresses, pants, girls, boys. Use a clothing photo URL.'
            : 'Makeup only — lips, eyes, face, skin. Use a cosmetics photo URL.'}
        </p>
        <form className="form" onSubmit={submit}>
          <input placeholder="Product name" required value={f.name} onChange={set('name')} />
          <input placeholder="Price" type="number" min="1" required value={f.price} onChange={set('price')} />
          <select value={f.cat} onChange={set('cat')}>
            {cats.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
          </select>
          <input placeholder="Line" value={f.line} onChange={set('line')} />
          <input placeholder={house.kind === 'fashion' ? 'Colour' : 'Shade'} value={f.shade} onChange={set('shade')} />
          <textarea placeholder="Short story" value={f.blurb} onChange={set('blurb')} />
          <input placeholder="Main image URL" required value={f.image} onChange={set('image')} />
          <input placeholder="Image 2 URL" value={f.image2} onChange={set('image2')} />
          <input placeholder="Image 3 URL" value={f.image3} onChange={set('image3')} />
          <input placeholder="Notes, comma separated" value={f.notes} onChange={set('notes')} />
          <button className="btn" type="submit">Publish to the floor</button>
        </form>
        {msg && <p className="ok" style={{ marginTop: 14 }}>{msg}</p>}
      </div>
    </Layout>
  )
}
