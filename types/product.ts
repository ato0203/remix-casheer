export type ProductMutation = {
  name?: string
  stock?: number
  price?: number
  barcode?: string
}

export type Product = ProductMutation & {
  id: string
  createdAt: string
  updatedAt?: string
}
