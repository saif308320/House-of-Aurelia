import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { findProduct, money } from '../catalog/index.js'
import Layout from '../components/Layout.jsx'
import ProductCard from '../components/ProductCard.jsx'
import Img from '../components/Img.jsx'
import { useHouse, useShop } from '../store.jsx'

export default function Product({ houseKey }) {
  const house = useHouse(houseKey)
  const { addToCart } = useShop()
  const { id } = useParams()
  const product = findProduct(house, id) || house.products[0]
  const [shot, setShot] = useState(0)
  const [size, setSize] = useState((product.sizes && product.sizes[0]) || '')
  const [note, setNote] = useState('')
  const [form, setForm] = useState({ name: '', email: '' })

  useEffect(() => {
    setShot(0)
    setSize((product.sizes && product.sizes[0]) || '')
    setNote('')
  }, [product.id])
  const related = house.products.filter((p) => p.cat === product.cat && p.id !== product.id).slice(0, 4)
  const shots = (product.images || []).filter(Boolean)
  const fashion = house.kind === 'fashion'
  const sizeLabel = fashion ? 'Size' : 'Shade'

  async function hold(e) {
    e.preventDefault()
    const res = await fetch('/api/reserve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ house: house.key, name: form.name, productName: `${product.name} · ${size}`, price: product.price })
    })
    const data = await res.json()
    setNote(data.message)
  }

  return (
    <Layout house={house}>
      <div className="pdp">
        <div className="gallery">
          <div className="thumbs">
            {shots.map((src, i) => (
              <button key={src + i} className={i === shot ? 'on' : ''} onClick={() => setShot(i)} type="button">
                <Img src={src} alt="" />
              </button>
            ))}
          </div>
          <div className="main-wrap">
            <Img className="main-shot" src={shots[shot] || shots[0]} alt={product.name} />
          </div>
        </div>
        <div className="pdp-copy">
          <div className="kicker">{product.line} · {product.colour}</div>
          <h1>{product.name}</h1>
          <div className="price">{money(house, product.price)}</div>
          <p className="story">{product.story}</p>
          <p className="story" style={{ marginTop: 12 }}>{product.blurb}</p>
          <div className="chips">{(product.notes || []).map((n) => <span className="chip" key={n}>{n}</span>)}</div>
          <div className="specs">{(product.specs || []).map((s) => <div key={s}>{s}</div>)}</div>

          <p className="kicker" style={{ marginTop: 8 }}>{sizeLabel}</p>
          <div className="size-row">
            {(product.sizes || []).map((s) => (
              <button type="button" key={s} className={s === size ? 'size on' : 'size'} onClick={() => setSize(s)}>{s}</button>
            ))}
          </div>

          <div className="row" style={{ marginTop: 22 }}>
            <button className="btn" type="button" onClick={() => addToCart({ ...product, size }, house.key)}>Add to bag · {size}</button>
            <Link className="btn ghost" to={`${house.path}/c/${product.cat}`}>More {product.line}</Link>
          </div>

          <form className="form" style={{ marginTop: 28 }} onSubmit={hold}>
            <input placeholder="Your name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input type="email" placeholder="Email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <button className="btn ghost" type="submit">Hold {size} at the desk</button>
          </form>
          {note && <p className="ok" style={{ marginTop: 12 }}>{note}</p>}
        </div>
      </div>
      {related.length > 0 && (
        <section className="section">
          <div className="section-head"><h2>Same room</h2><p>More {product.line.toLowerCase()} on this floor.</p></div>
          <div className="grid-4">
            {related.map((p) => <ProductCard key={p.id} house={house} product={p} />)}
          </div>
        </section>
      )}
    </Layout>
  )
}
