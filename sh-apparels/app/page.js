import Image from 'next/image'
import ProductGrid from './components/ProductGrid'
import PostData from './components/PostData'

export default function Home() {
  return (
    <div>
      <ProductGrid />
      <PostData />
      </div>
  )
}
