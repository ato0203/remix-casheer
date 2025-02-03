import { useLoaderData } from "@remix-run/react"
import clsx from "clsx"
import { getProducts } from "~/lib/db/fake-product"
import { Link } from "@remix-run/react"
import { formatCurrency } from "~/lib/utils"

export const loader = async () => {
  const products = await getProducts()

  return products
}

export default function ProductList() {
  const products = useLoaderData<typeof loader>()

  return (
    <div>
      <h3 className="text-gray-300">Product List</h3>

      <div className="relative overflow-x-auto mt-2">
        <table className="w-full table-auto text-sm text-left text-gray-400">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-6 py-3">#</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Stock</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
          {products.length == 0 && (
            <tr>
              <td colSpan={4}>No product yet</td>
            </tr>
          )}
          {products.map((product, i) => (
            <tr className="border-b border-b-gray-700 text-gray-300">
              <td className="px-6 py-3">{ i + 1 }</td>
              <td className="px-6 py-3 whitespace-nowrap">{product.name}</td>
              <td className="px-6 py-3">{formatCurrency(product.price)}</td>
              <td
                className={clsx('px-6 py-3', product?.stock <= 10 && 'text-rose-600')}
              >
                {product.stock}
              </td>
              <td className="px-6 py-3 flex items-center justify-between">
                <Link 
                  className={clsx(
                    'px-2 py-1 bg-sky-600 rounded',
                    'hover:bg-sky-500 focus:bg-sky-700'
                  )}
                  to={`/products/${product.id}`}
                >
                  View
                </Link>

                <Link 
                  className={clsx(
                    'px-2 py-1 bg-sky-600 rounded',
                    'hover:bg-sky-500 focus:bg-sky-700'
                  )}
                  to={`/products/${product.id}/edit`}
                >
                  Edit
                </Link>

                <Link 
                  className={clsx(
                    'px-2 py-1 bg-rose-600 rounded',
                    'hover:bg-rose-500 focus:bg-rose-700'
                  )}
                  to={`/products/${product.id}/edit`}
                >
                  Delete
                </Link>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
