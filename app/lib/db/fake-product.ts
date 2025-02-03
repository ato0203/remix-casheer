import { matchSorter } from "match-sorter";
// @ts-expect-error - no types, but it's a tiny function
import sortBy from "sort-by";
import invariant from "tiny-invariant";
import { Product, ProductMutation } from '../../../types/product'
import { faker } from '@faker-js/faker'

const fakeProducts = {
  records: {} as Record<string, Product>,

  async getAll(): Promise<Product[]> {
    return Object.keys(fakeProducts.records)
      .map((key) => fakeProducts.records[key])
      .sort(sortBy("-createdAt", "last"));
  },

  async get(id: string): Promise<Product | null> {
    return fakeProducts.records[id] || null;
  },

  async create(values: ProductMutation): Promise<Product> {
    const id = values.id || faker.string.uuid();
    const createdAt = new Date().toISOString();
    const newProduct = { id, createdAt, ...values };
    fakeProducts.records[id] = newProduct;
    return newProduct;
  },

  async set(id: string, values: ProductMutation): Promise<Product> {
    const product = await fakeProducts.get(id);
    invariant(product, `No product found for ${id}`);
    const updatedAt = new Date().toISOString();
    const updatedProduct = { ...product, ...values, updatedAt };
    fakeProducts.records[id] = updatedProduct;
    return updatedProduct;
  },

  destroy(id: string): null {
    delete fakeProducts.records[id];
    return null;
  },
};

////////////////////////////////////////////////////////////////////////////////
// Handful of helper functions to be called from route loaders and actions
export async function getProducts(query?: string | null) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  let products = await fakeProducts.getAll();
  if (query) {
    products = matchSorter(products, query, {
      keys: ["first", "last"],
    });
  }
  return products.sort(sortBy("last", "createdAt"));
}

export async function createEmptyProduct() {
  const product = await fakeProducts.create({});
  return product;
}

export async function getProduct(id: string) {
  return fakeProducts.get(id);
}

export async function updateProduct(id: string, updates: ProductMutation) {
  const product = await fakeProducts.get(id);
  if (!product) {
    throw new Error(`No product found for ${id}`);
  }
  await fakeProducts.set(id, { ...product, ...updates });
  return product;
}

export async function deleteProduct(id: string) {
  fakeProducts.destroy(id);
}

[
  {
    name: 'Gula pasir 1Kg',
    barcode: '8994096215969',
    stock: 100,
    price: 17500
  },
  {
    name: 'Telur 1 Karton',
    barcode: '2025020200002',
    stock: 100,
    price: 58000
  },
  {
    name: 'Minyak Kita 1L',
    barcode: '8993496111508',
    stock: 100,
    price: 19000
  },
  {
    name: 'Sunlight 400ml',
    barcode: '8999999572303',
    stock: 100,
    price: 11000
  },
  {
    name: 'Lifebouy 825ml',
    barcode: '8999999515621',
    stock: 100,
    price: 38000
  },
  {
    name: 'Daia fruity 1.6Kg',
    barcode: '8998866604949',
    stock: 100,
    price: 28000
  },
  {
    name: 'Pepsodent 150g',
    barcode: '8999999564421',
    stock: 100,
    price: 18000
  },
  {
    name: 'Aji-no-moto 100g',
    barcode: '8992770011084',
    stock: 100,
    price: 6000
  },
  {
    name: 'Masako Ayam 250g',
    barcode: '8992770034151',
    stock: 100,
    price: 15000
  },
  {
    name: 'Garam Meja Daun 500g',
    barcode: '8993226335006',
    stock: 100,
    price: 6000
  },
  {
    name: 'Energen Coklat 35g',
    barcode: '899001440049',
    stock: 100,
    price: 2000
  },
  {
    name: 'Indofood Lada Bubuk 3g',
    barcode: '089686389005',
    stock: 100,
    price: 1500
  },
  {
    name: 'Ladaku Merica Bubuk 3g',
    barcode: '8997011930612',
    stock: 100,
    price: 1500
  },
  {
    name: 'Totole Kaldu Rasa Jamur 40g',
    barcode: '6922130108057',
    stock: 100,
    price: 8000
  },
  {
    name: 'AMS 318 Botol 1500ml',
    barcode: '8994449930023',
    stock: 100,
    price: 8000
  },
  {
    name: 'AMS 318 Gelas 220ml',
    barcode: '6922130108057',
    stock: 100,
    price: 1000
  },
].forEach((product) => {
  fakeProducts.create({
    ...product
  });
});

