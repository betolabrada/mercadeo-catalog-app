import { Transition, Dialog, Disclosure } from '@headlessui/react'
import { XIcon, MinusSmIcon, PlusSmIcon, ShoppingCartIcon, FilterIcon } from '@heroicons/react/outline'
import { SearchIcon } from '@heroicons/react/solid'
import Head from 'next/head'
import { Fragment, useState } from 'react'
import Cart from '../components/Cart'
import ProductGrid from '../components/ProductGrid'

import CartModel from '../models/Cart'
import Product from '../models/Product'
import ProductCart from '../models/ProductCart'


const products: Product[] = [
  {
    id: 1,
    name: 'Earthen Bottle',
    href: '#',
    price: 48,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
    imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
    contentDescription: '12 Piezas De 1 kg'
  },
]

const subCategories = [
  { name: 'Sales Del Valle', href: '#' },
  { name: 'Loltun', href: '#' },
  { name: 'Abarrotes', href: '#' },
  { name: 'Silverline', href: '#' },
  { name: 'Argos', href: '#' },
  { name: 'SaborMex', href: '#' },
]

const filters = [
  {
    id: 'marca',
    name: 'Marca',
    options: [
      { value: 'Argos', label: 'Argos', checked: false },
      { value: 'Loltun', label: 'Loltun', checked: false },
      { value: 'Silverline', label: 'Silverline', checked: true },
      { value: 'Sales Del Valle', label: 'Sales Del Valle', checked: false },
      { value: 'Clemente Jaques', label: 'Clemente Jaques', checked: false },
      { value: 'Tajin', label: 'Tajin', checked: false },
    ],
  },
  {
    id: 'category',
    name: 'Categoría',
    options: [
      { value: 'abarrotes', label: 'Abarrotes', checked: false },
      { value: 'mercancia-general', label: 'Mercancía General', checked: false }
    ],
  },
]


function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Home() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [cart, setCart] = useState(new CartModel([]))

  const addProductToCart = (product: Product, quantity: number) => {
    cart.addToCart(new ProductCart(product, quantity))
    setCartOpen(true)
  }

  const removeProductFromCart = (product: ProductCart) => {
    cart.removeFromCart(product);
    setCart(new CartModel(cart.products));
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="bg-white">
        <div>
          {/* Mobile filter dialog */}
          <Transition.Root show={mobileFiltersOpen} as={Fragment}>
            <Dialog as="div" className="fixed inset-0 flex z-40 lg:hidden" onClose={setMobileFiltersOpen}>
              <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <div className="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-12 flex flex-col overflow-y-auto">
                  <div className="px-4 flex items-center justify-between">
                    <h2 className="text-lg font-medium text-gray-900">Filtrar</h2>
                    <button
                      type="button"
                      className="-mr-2 w-10 h-10 bg-white p-2 rounded-md flex items-center justify-center text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Cerrar Menú</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200">
                    <h3 className="sr-only">Categorías</h3>
                    <ul role="list" className="font-medium text-gray-900 px-2 py-3">
                      {subCategories.map((category) => (
                        <li key={category.name}>
                          <a href={category.href} className="block px-2 py-3">
                            {category.name}
                          </a>
                        </li>
                      ))}
                    </ul>

                    {filters.map((section) => (
                      <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="px-2 py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">{section.name}</span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusSmIcon className="h-5 w-5" aria-hidden="true" />
                                  ) : (
                                    <PlusSmIcon className="h-5 w-5" aria-hidden="true" />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-6">
                                {section.options.map((option, optionIdx) => (
                                  <div key={option.value} className="flex items-center">
                                    <input
                                      id={`filter-mobile-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      type="checkbox"
                                      defaultChecked={option.checked}
                                      className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label
                                      htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                      className="ml-3 min-w-0 flex-1 text-gray-500"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>
                </div>
              </Transition.Child>
            </Dialog>
          </Transition.Root>

          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Cart removeFromCart={removeProductFromCart} cart={cart}  open={cartOpen} setOpen={setCartOpen} />
            <div className="relative z-10 flex items-baseline justify-between pt-24 pb-6 border-b border-gray-200">
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 hidden md:block">Productos Mercadeo</h1>

              <div className="w-full md:w-96 flex items-center">
                <div className="mt-1 flex-auto flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 py-2 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    <SearchIcon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <input
                  
                    autoComplete="off"
                    type="text"
                    name="Buscar"
                    id="buscar"
                    className="border px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                    placeholder="Buscar"
                  />
                </div>

                <button onClick={() => setCartOpen(true)} type="button" className="flex-initial p-2 -m-2 ml-5 sm:ml-7 text-gray-400 hover:text-gray-500">
                  <span className="sr-only">View grid</span>
                  <ShoppingCartIcon className="w-7 h-7" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className="p-2 -m-2 ml-4 sm:ml-6 text-gray-400 hover:text-gray-500 lg:hidden flex-initial"
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  <span className="sr-only">Filters</span>
                  <FilterIcon className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            <section aria-labelledby="products-heading" className="pt-6 pb-24">
              <h2 id="products-heading" className="sr-only">
                Products
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10">
                {/* Filters */}
                <form className="hidden lg:block">
                  <h3 className="sr-only">Categories</h3>
                  <ul role="list" className="text-sm font-medium text-gray-900 space-y-4 pb-6 border-b border-gray-200">
                    {subCategories.map((category) => (
                      <li key={category.name}>
                        <a href={category.href}>{category.name}</a>
                      </li>
                    ))}
                  </ul>

                  {filters.map((section) => (
                    <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
                      {({ open }) => (
                        <>
                          <h3 className="-my-3 flow-root">
                            <Disclosure.Button className="py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">{section.name}</span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusSmIcon className="h-5 w-5" aria-hidden="true" />
                                ) : (
                                  <PlusSmIcon className="h-5 w-5" aria-hidden="true" />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-4">
                              {section.options.map((option, optionIdx) => (
                                <div key={option.value} className="flex items-center">
                                  <input
                                    id={`filter-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    defaultValue={option.value}
                                    type="checkbox"
                                    defaultChecked={option.checked}
                                    className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                  />
                                  <label
                                    htmlFor={`filter-${section.id}-${optionIdx}`}
                                    className="ml-3 text-sm text-gray-600"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </form>

                {/* Product grid */}
                <div className="lg:col-span-3">
                  {/* Replace with your content */}
                  <ProductGrid 
                    products={products}
                    addToCart={addProductToCart}
                    />
                  {/* /End replace */}
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  )
}
