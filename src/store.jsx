import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { US } from './catalog/us.js'
import { mergeHouse } from './catalog/index.js'

const Shop = createContext(null)

export function ShopProvider({ children }) {
  const [cart, setCart] = useState([])
  const [toast, setToast] = useState('')
  const [extra, setExtra] = useState({ us: [] })

  async function refreshAdded(houseKey = 'us') {
    try {
      const res = await fetch(`/api/products?house=${houseKey}`)
      const data = await res.json()
      setExtra((e) => ({ ...e, [houseKey]: data.products || [] }))
    } catch {
      /* desk offline */
    }
  }

  useEffect(() => { refreshAdded('us') }, [])

  function ping(text) {
    setToast(text)
    window.clearTimeout(ping._t)
    ping._t = window.setTimeout(() => setToast(''), 2000)
  }

  function addToCart(product, house) {
    const size = product.size || (product.sizes && product.sizes[0]) || ''
    setCart((c) => {
      const i = c.findIndex((x) => x.id === product.id && x.house === house && x.size === size)
      if (i >= 0) {
        const n = [...c]
        n[i] = { ...n[i], qty: n[i].qty + 1 }
        return n
      }
      return [...c, { ...product, house, size, qty: 1 }]
    })
    ping('Added to bag')
  }

  function setQty(id, house, qty) {
    setCart((c) => {
      if (qty < 1) return c.filter((x) => !(x.id === id && x.house === house))
      return c.map((x) => (x.id === id && x.house === house ? { ...x, qty } : x))
    })
  }

  function clearCart() {
    setCart([])
  }

  const value = useMemo(
    () => ({ cart, toast, extra, addToCart, setQty, clearCart, refreshAdded, ping }),
    [cart, toast, extra]
  )

  return <Shop.Provider value={value}>{children}</Shop.Provider>
}

export function useShop() {
  return useContext(Shop)
}

export function useHouse(houseKey = 'us') {
  const { extra } = useShop()
  return useMemo(
    () => mergeHouse(US, extra[houseKey] || []),
    [houseKey, extra]
  )
}
