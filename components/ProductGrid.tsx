import { useState } from 'react'
import ProductDialog from './ProductDialog'


export default function ProductGrid({ products, addToCart }: { products: any[], addToCart: Function }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <ProductDialog 
              product={product} 
              key={product.id} 
              addToCart={addToCart}
              />
          ))}
        </div>
      </div>
    </div>
  )
}
