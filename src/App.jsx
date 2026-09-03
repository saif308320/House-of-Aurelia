import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Category from './pages/Category.jsx'
import Product from './pages/Product.jsx'
import Bag from './pages/Bag.jsx'
import Studio from './pages/Studio.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home houseKey="us" />} />
      <Route path="/us" element={<Home houseKey="us" />} />
      <Route path="/us/c/:cat" element={<Category houseKey="us" />} />
      <Route path="/us/product/:id" element={<Product houseKey="us" />} />
      <Route path="/us/bag" element={<Bag houseKey="us" />} />
      <Route path="/us/studio" element={<Studio houseKey="us" />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
