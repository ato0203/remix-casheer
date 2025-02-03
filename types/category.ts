export type CategoryMutation = {
  title?: string
  parentId?: string
}

export type Category = CategoryMutation & {
  id: string
  createdAt: string
  updatedAt?: string
}
