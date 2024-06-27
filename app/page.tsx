import Image from 'next/image'
import Container from './Components/Container'
import HomeBanner from './Components/HomeBanner'
import { products } from '@/utils/produts'
import { Truncate } from '@/utils/Truncate'
import ProductCard from './Components/Products/ProductCard'

export default function Home() {
  return (
    <div className='p-8'>
      <Container>
        <div>
          <HomeBanner />
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl-grid-cols-5 2x1:grid-cols-6 gap:8'>
          {products.map((product : any) => {
            return <ProductCard data={product} />
          })}
        </div>
      </Container>
    </div>
  )
}
