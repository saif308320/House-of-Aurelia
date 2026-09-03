import { Link } from 'react-router-dom'
import { money } from '../catalog/index.js'
import { useShop } from '../store.jsx'
import Img from './Img.jsx'

export default function ProductCard({ house, product, badge }) {
  const { addToCart } = useShop()
  const src = product.images && product.images[0]
  if (!src) return null
  return (
    <article className="card tilt-card">
      <Link to={`${house.path}/product/${product.id}`} className="photo">
        {badge && <span className="badge">{badge}</span>}
        <Img src={src} alt={product.name} />
      </Link>
      <div className="info">
        <div className="line">{product.line} · {product.colour}</div>
        <Link to={`${house.path}/product/${product.id}`}><h3>{product.name}</h3></Link>
        <div className="price">{money(house, product.price)}</div>
        <div className="size-hint">{(product.sizes || []).slice(0, 4).join(' · ')}</div>
        <button className="add" type="button" onClick={() => addToCart(product, house.key)}>Add to bag</button>
      </div>
    </article>
  )
}
