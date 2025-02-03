import { LoaderFunctionArgs } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import invariant from "tiny-invariant"
import { getProduct } from "~/lib/db/fake-product"

export const loader = async ({
  params,
}: LoaderFunctionArgs) => {
  invariant(params.productId, 'Missing productId params')
  const product = await getProduct(params.productId)

  if (!product) {
    throw new Response('product not found', { status: 404 })
  }

  return product
}

export default function ProductDetail() {
  const product = useLoaderData<typeof loader>()

  return (
    <div>
      <h3>{product?.name}</h3>
      <p>{product?.price}</p>
      <p>{product?.stock}</p>
      <h3>{product?.barcode}</h3>
    </div>
  )
}
