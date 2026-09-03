import { US, US_CATS } from './us.js'

export const houses = { us: US }

export function money(house, n) {
  const v = Number(n) || 0
  return `${house.currency}${v.toFixed(0)}`
}

export function findProduct(house, id) {
  return (house.products || []).find((p) => p.id === id)
}

export function byCat(products, cat) {
  return (products || []).filter((p) => p.cat === cat)
}

export function catsFor() {
  return US_CATS
}

export function mergeHouse(base, extra = []) {
  const seen = new Set(base.products.map((p) => p.id))
  const more = extra.filter((p) => p && p.id && !seen.has(p.id))
  return { ...base, products: [...base.products, ...more] }
}
