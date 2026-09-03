import { useParams } from 'react-router-dom'
import { byCat, catsFor } from '../catalog/index.js'
import Layout from '../components/Layout.jsx'
import ProductCard from '../components/ProductCard.jsx'
import { useHouse } from '../store.jsx'

export default function Category({ houseKey }) {
  const house = useHouse(houseKey)
  const { cat } = useParams()
  const meta = catsFor(house).find((c) => c.id === cat) || { id: cat, label: cat }
  const list = byCat(house.products, cat)
  return (
    <Layout house={house}>
      <section className="section">
        <div className="section-head">
          <h2>{meta.label}</h2>
          <p>{list.length} pieces · {house.city} · click any card for sizes, price and gallery</p>
        </div>
        <div className="grid-4">
          {list.map((p) => <ProductCard key={p.id} house={house} product={p} />)}
        </div>
      </section>
    </Layout>
  )
}
