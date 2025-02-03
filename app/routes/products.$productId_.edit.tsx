import { Field, Input, Label } from "@headlessui/react"
import { QrCodeIcon } from "@heroicons/react/16/solid"
import { LoaderFunctionArgs } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import clsx from "clsx"
import { useState } from "react"
import invariant from "tiny-invariant"
import { getProduct } from "~/lib/db/fake-product"

export const loader = async ({
  params,
}: LoaderFunctionArgs) => {
  invariant(params.productId, 'missing productId param')
  const product = await getProduct(params.productId)

  if (!product) {
    throw new Response('product not found', { status: 404 })
  }

  return product
}

export default function EditProduct() {
  const product = useLoaderData<typeof loader>()
  const [showScanner, setShowScanner] = useState(false)

  return (
    <div>
      <h3>Edit Product</h3>

      <form method="post" className="mt-4 space-y-6 text-sm/6">
        <Field>
          <Label className="font-medium">Name</Label>
          <Input 
            type="text" 
            className={clsx(
              'block mt-2 px-3 py-1.5 w-full rounded-md border-none bg-white/5',
              'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-sky-500/50'
            )}
            name="name" 
            defaultValue={product.name} 
          />
        </Field>

        <Field>
          <Label className="font-medium">Price</Label>
          <Input 
            type="number" 
            className={clsx(
              'block mt-2 px-3 py-1.5 rounded-md border-none bg-white/5 w-full',
              'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-sky-500/50'
            )}
            min="0" 
            name="price" 
            defaultValue={product.price} 
          />
        </Field>

        <Field>
          <Label className="font-medium">Stock</Label>
          <Input 
            type="number" 
            className={clsx(
              'block mt-2 px-3 py-1.5 rounded-md border-none bg-white/5 w-full',
              'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-sky-500/50'
            )}
            name="stock" 
            min="0" 
            defaultValue={product.stock} 
          />
        </Field>

        <Field>
          <Label className="font-medium">Barcode</Label>
          <div
            className={clsx(
              'block mt-2 px-3 py-1.5 rounded-md border-none bg-white/5 w-full flex items-center',
              'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-sky-500/50'
            )}
          >
            <Input 
              type="text" 
              className="grow outline-none bg-transparent"
              name="name" 
              defaultValue={product.barcode} 
            />
           <button onClick={(event) => {
            setShowScanner(!showScanner)
            event.preventDefault()
           }}>
              <QrCodeIcon className="size-6" />
            </button>
          </div>
        </Field>

        <div
          className={clsx(
            'border h-[360px] rounded-md bg-white/50',
            showScanner ? 'block' : 'hidden'
          )}
        >
        </div>

        <div className="w-full grid justify-items-end">
          <button 
            type="submit"
            className={clsx(
              'rounded-md px-6 py-2 bg-sky-600 text-sm text-white',
              'data-[hover]:bg-sky-500 data-[active]:bg-sky-700'
            )}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  )
}
