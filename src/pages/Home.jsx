import { Link } from 'react-router-dom'
import { catsFor } from '../catalog/index.js'
import Layout from '../components/Layout.jsx'
import ProductCard from '../components/ProductCard.jsx'
import Img from '../components/Img.jsx'
import { useHouse } from '../store.jsx'

export default function Home({ houseKey }) {
  const house = useHouse(houseKey)
  const cats = catsFor(house)
  const products = house.products
  const hero = products.slice(0, 4)
  const featured = products.slice(0, 8)
  const night = products.filter((p) => /lip|eye|kit/i.test(p.cat)).slice(0, 6)
  const looks = products.slice(8, 13)

  return (
    <Layout house={house}>
      <section className="hero">
        <div className="hero-copy">
          <div className="kicker">SoHo counter · live shade match</div>
          <h1>Makeup that{'\n'}holds the city.</h1>
          <p>
            Aurelia is an American makeup house. Lips, eyes, face, skin — cut for daylight,
            flash, and the hour between dinner and the last train.
          </p>
          <div className="row">
            <Link className="btn" to={`${house.path}/c/lips`}>Shop lips</Link>
            <Link className="btn ghost" to={`${house.path}/c/face`}>Match your veil</Link>
          </div>
          <div className="hero-stats">
            <div><b>20</b><span>Foundation shades</span></div>
            <div><b>32</b><span>Pieces on the floor</span></div>
            <div><b>0s</b><span>Live stylist wait</span></div>
          </div>
        </div>
        <div className="hero-stage">
          <div className="hero-mosaic float-3d">
            {hero.map((p, i) => (
              <Link key={p.id} to={`${house.path}/product/${p.id}`} className={`tile t${i}`}>
                <Img src={p.images[0]} alt={p.name} />
                <span>{p.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="ticker">
        <div className="ticker-track">
          {['SoHo shade matching', 'Vegan formulas', 'Refillable bullets', 'Overnight Manhattan', 'Live stylist', 'Magnetic caps', 'City SPF 40', 'SoHo shade matching', 'Vegan formulas', 'Refillable bullets', 'Overnight Manhattan', 'Live stylist', 'Magnetic caps', 'City SPF 40'].map((t, i) => (
            <span key={i}>{t}</span>
          ))}
        </div>
      </div>

      <section className="section tight">
        <div className="section-head">
          <h2>The rooms</h2>
          <p>Six counters. One house. Click through.</p>
        </div>
        <div className="cat-tiles cat-tiles-6">
          {cats.map((c, i) => {
            const p = products.find((x) => x.cat === c.id) || products[i]
            return (
              <Link key={c.id} className="cat-tile tilt" to={`${house.path}/c/${c.id}`}>
                <Img src={p.images[0]} alt={c.label} />
                <span>{c.label}</span>
              </Link>
            )
          })}
        </div>
      </section>

      <section className="section alt">
        <div className="section-head">
          <h2>On the counter</h2>
          <p>What the desk is actually selling this week.</p>
        </div>
        <div className="grid-4">
          {featured.map((p) => <ProductCard key={p.id} house={house} product={p} badge={p.notes?.[0]} />)}
        </div>
      </section>

      <section className="split">
        <Img src={products[12]?.images[1] || products[0].images[0]} alt="Skin veil" />
        <div className="split-copy">
          <div className="kicker">Face architecture</div>
          <h2>Skin Veil. Twenty shades. Live match.</h2>
          <p>
            Second-skin coverage that still looks like you. Olive and deep are not an afterthought.
            Sit at the SoHo desk — we match in daylight, then check under the restaurant lamps.
          </p>
          <div className="row">
            <Link className="btn" to={`${house.path}/product/skin-veil`}>Meet Skin Veil</Link>
            <Link className="btn ghost" to={`${house.path}/c/face`}>All face</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>After dark</h2>
          <p>Reds, chromes, kohl. Night architecture.</p>
        </div>
        <div className="grid-3">
          {night.map((p) => <ProductCard key={p.id} house={house} product={p} />)}
        </div>
      </section>

      <div className="look">
        {looks.map((p, i) => (
          <Link key={p.id} to={`${house.path}/product/${p.id}`} className={i === 0 ? 'tall' : ''}>
            <Img src={p.images[i % p.images.length]} alt={p.name} />
          </Link>
        ))}
      </div>

      <section className="section ink">
        <div className="section-head">
          <h2>The house</h2>
          <p>Numbers the floor actually keeps.</p>
        </div>
        <div className="stats">
          <div className="stat"><b>2019</b><span>House founded</span></div>
          <div className="stat"><b>32</b><span>SKUs on floor</span></div>
          <div className="stat"><b>20</b><span>Veil shades</span></div>
          <div className="stat"><b>SoHo</b><span>One counter</span></div>
        </div>
      </section>

      <section className="section alt">
        <div className="section-head">
          <h2>From the city</h2>
          <p>Notes from the floor, not a campaign.</p>
        </div>
        <div className="reviews">
          <article className="review">
            <b>Broadway Red survived humidity.</b>
            <p>Opening night, then a walk to the subway. Still opaque. The blue-red photographs expensive.</p>
          </article>
          <article className="review">
            <b>They matched olive. Finally.</b>
            <p>Skin Veil Light 4 is the first foundation that did not turn me peach under restaurant light.</p>
          </article>
          <article className="review">
            <b>The stylist held my shade.</b>
            <p>Asked in the chat, picked up on Mercer the same evening. No theatre. Just the desk.</p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Journal</h2>
          <p>How the house thinks about light.</p>
        </div>
        <div className="journal">
          <article>
            <Img src={products[6].images[0]} alt="" />
            <div>
              <div className="kicker">Eyes</div>
              <h3>Kohl after last call</h3>
              <p className="story">Graphite that smudges on purpose. First coffee still works.</p>
            </div>
          </article>
          <article>
            <Img src={products[21].images[0]} alt="" />
            <div>
              <div className="kicker">Skin</div>
              <h3>A primer that grips August</h3>
              <p className="story">Four extra hours. No pilling under the veil.</p>
            </div>
          </article>
          <article>
            <Img src={products[0].images[0]} alt="" />
            <div>
              <div className="kicker">Lips</div>
              <h3>Nude as architecture</h3>
              <p className="story">Warm, New York, never beige. Built for flash.</p>
            </div>
          </article>
        </div>
      </section>

      <section className="section tight">
        <div className="ig">
          {products.slice(14, 20).map((p) => (
            <Link key={p.id} to={`${house.path}/product/${p.id}`}>
              <Img src={p.images[0]} alt={p.name} />
            </Link>
          ))}
        </div>
      </section>

      <section className="section alt news">
        <div>
          <div className="kicker">The desk list</div>
          <h2 className="h-serif">Shade drops, holds, and evening hours.</h2>
          <p className="story">No campaigns. Just what the SoHo counter is doing this week.</p>
        </div>
        <form className="news-form" onSubmit={(e) => e.preventDefault()}>
          <input type="email" required placeholder="Email" />
          <button className="btn" type="submit">Join</button>
        </form>
      </section>

      <section className="section hours">
        <Img src={products[2].images[1] || products[2].images[0]} alt="SoHo counter" />
        <div>
          <div className="kicker">Visit</div>
          <h2 className="h-serif">Mercer Street counter</h2>
          <p className="story">Walk in for a live match. Holds ready at the desk.</p>
          <ul>
            <li>Tue–Sat 11:00–20:00</li>
            <li>Sunday 12:00–18:00</li>
            <li>Monday closed</li>
            <li>{house.phone}</li>
            <li>{house.city}</li>
          </ul>
        </div>
      </section>
    </Layout>
  )
}
