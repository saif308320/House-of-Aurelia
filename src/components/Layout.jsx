import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { catsFor } from '../catalog/index.js'
import { useShop } from '../store.jsx'
import Concierge from './Concierge.jsx'

export default function Layout({ house, children }) {
  const { cart, toast } = useShop()
  const loc = useLocation()
  const [menu, setMenu] = useState(false)
  const cats = catsFor(house)
  const count = cart.filter((i) => i.house === house.key).reduce((s, i) => s + i.qty, 0)

  useEffect(() => { setMenu(false); window.scrollTo(0, 0) }, [loc.pathname])

  return (
    <div className="us-root site-root">
      <div className="orb orb-a" />
      <div className="orb orb-b" />
      <div className="orb orb-c" />

      <div className="announce">
        Complimentary shade matching in SoHo · Free overnight in Manhattan · Live stylist on the floor
      </div>

      <header className="nav">
        <div className="nav-main">
          <button className="menu-btn" type="button" aria-label="Menu" onClick={() => setMenu((v) => !v)}>
            <span /><span /><span />
          </button>
          <Link className="brand" to={house.path}>
            <em>Aurelia</em>
            <span>New York</span>
          </Link>
          <nav className="nav-tools">
            <Link to={`${house.path}/studio`}>Studio</Link>
            <a href="#live">Stylist</a>
            <Link to={`${house.path}/bag`} className="bag-link">
              Bag {count > 0 && <span className="bag-count">{count}</span>}
            </Link>
          </nav>
        </div>
        <nav className={`cat-rail ${menu ? 'open' : ''}`}>
          {cats.map((c) => (
            <NavLink key={c.id} to={`${house.path}/c/${c.id}`} className={({ isActive }) => isActive ? 'on' : ''}>
              {c.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <div className="live-pill">
        <span className="dot" />
        Live in {house.city}
      </div>

      <main>{children}</main>

      <footer className="footer">
        <div className="foot-grid">
          <div>
            <h4>Aurelia New York</h4>
            <p>American makeup house. Lips, eyes, face, skin — sculpted for city light.</p>
            <p>{house.city}</p>
            <p>{house.phone}</p>
          </div>
          <div>
            <h4>The floor</h4>
            {cats.map((c) => <Link key={c.id} to={`${house.path}/c/${c.id}`}>{c.label}</Link>)}
          </div>
          <div>
            <h4>House</h4>
            <Link to={house.path}>The counter</Link>
            <Link to={`${house.path}/studio`}>Staff studio</Link>
            <Link to={`${house.path}/bag`}>Your bag</Link>
            <a href="#live">Live stylist</a>
          </div>
          <div>
            <h4>Hours</h4>
            <p>Tue–Sat 11–8</p>
            <p>Sun 12–6</p>
            <p>Mon closed</p>
            <p>Walk-ins for shade match</p>
          </div>
        </div>
        <div className="foot-bar">
          <span>Aurelia NY · SoHo</span>
          <span>Crafted for city light</span>
        </div>
      </footer>

      <Concierge houseKey={house.key} kind={house.kind} />
      {toast && <div className="toast">{toast}</div>}
    </div>
  )
}
