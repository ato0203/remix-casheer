import { matchSorter } from "match-sorter";
// @ts-expect-error - no types, but it's a tiny function
import sortBy from "sort-by";
import invariant from "tiny-invariant";
import { Category, CategoryMutation } from '../../../types/category'
import { faker } from '@faker-js/faker'

const fakeCategories = {
  records: {} as Record<string, Category>,

  async getAll(): Promise<Category[]> {
    return Object.keys(fakeCategories.records)
      .map((key) => fakeCategories.records[key])
      .sort(sortBy("-createdAt", "title"));
  },

  async get(id: string): Promise<Category | null> {
    return fakeCategories.records[id] || null;
  },

  async create(values: CategoryMutation): Promise<Category> {
    const id = values.id || faker.string.uuid();
    const createdAt = new Date().toISOString();
    const newCategory = { id, createdAt, ...values };
    fakeCategories.records[id] = newCategory;
    return newCategory;
  },

  async set(id: string, values: CategoryMutation): Promise<Category> {
    const category = await fakeCategories.get(id);
    invariant(category, `No category found for ${id}`);
    const updatedAt = new Date().toISOString();
    const updatedCategory = { ...category, ...values, updatedAt };
    fakeCategories.records[id] = updatedCategory;
    return updatedCategory;
  },

  destroy(id: string): null {
    delete fakeCategories.records[id];
    return null;
  },
};

////////////////////////////////////////////////////////////////////////////////
// Handful of helper functions to be called from route loaders and actions
export async function getCategories(query?: string | null) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  let categorys = await fakeCategories.getAll();
  if (query) {
    categorys = matchSorter(categorys, query, {
      keys: ["first", "last"],
    });
  }
  return categorys.sort(sortBy("last", "createdAt"));
}

export async function createEmptyCategory() {
  const category = await fakeCategories.create({});
  return category;
}

export async function getCategory(id: string) {
  return fakeCategories.get(id);
}

export async function updateCategory(id: string, updates: CategoryMutation) {
  const category = await fakeCategories.get(id);
  if (!category) {
    throw new Error(`No category found for ${id}`);
  }
  await fakeCategories.set(id, { ...category, ...updates });
  return category;
}

export async function deleteCategory(id: string) {
  fakeCategories.destroy(id);
}

// data from klikindomaret.com
[
  { title: 'Makanan' },
  { title: 'Aneka Roti & Kue' },
  { title: 'Buah & Dessert' },
  { title: 'Cemilan & Biskuit' },
  { title: 'Coklat & Permen' },
  { title: 'Es Krim' },
  { title: 'Makanan Instan' },
  { title: 'Sarapan & Selai' },
  { title: 'Dapur & Bahan Masakan' },
  { title: 'Minyak' },
  { title: 'Bahan Masakan' },
  { title: 'Beras & Biji-Bijian' },
  { title: 'Gula & Tepung' },
  { title: 'Kecap & Saus' },
  { title: 'Keju & Mentega' },
  { title: 'Makanan Beku' },
  { title: 'Makanan Kaleng' },
  { title: 'Makanan Kering' },
  { title: 'Telur' },
  { title: 'Minuman' },
  { title: 'Minuman Instan' },
  { title: 'Minuman Ringan' },
  { title: 'Air Mineral' },
  { title: 'Jus' },
  { title: 'Kopi' },
  { title: 'Susu & Olahan' },
  { title: 'Teh' },
  { title: 'Ibu & Anak' },
  { title: 'Susu & Keperluan Ibu' },
  { title: 'Makanan & Susu Bayi' },
  { title: 'Perlengkapan Anak' },
  { title: 'Perlengkapan Bayi' },
  { title: 'Popok Bayi' },
  { title: 'Kesehatan & Kebersihan' },
  { title: 'Deodoran' },
  { title: 'Obat & Suplemen' },
  { title: 'Parfum' },
  { title: 'Peralatan Kesehatan' },
  { title: 'Perawatan Badan' },
  { title: 'Perawatan Kewanitaan' },
  { title: 'Perawatan Mulut' },
  { title: 'Perawatan Rambut' },
  { title: 'Popok Dewasa' },
  { title: 'Kebutuhan Rumah' },
  { title: 'Air Galon & Gas' },
  { title: 'Deterjen' },
  { title: 'Jas Hujan & Payung' },
  { title: 'Mekanik & Elektrik' },
  { title: 'Pembasmi Kuman & Pewangi' },
  { title: 'Pembersih' },
  { title: 'Perlengkapan Peliharaan' },
  { title: 'Perlengkapan Rumah Tangga' },
  { title: 'Tisu' },
  { title: 'Kosmetik' },
  { title: 'Mata' },
  { title: 'Alat Kecantikan' },
  { title: 'Bibir' },
  { title: 'Kapas' },
  { title: 'Serum' },
  { title: 'Wajah' },
  { title: 'Lainnya' },
  { title: 'Pembayaran Digital' },
  { title: 'Fashion' },
  { title: 'Alat Tulis & Perlengkapan Kantor' },
  { title: 'Mainan' },
  { title: 'Gadget & Elektronik' },
  { title: 'Produk Lainnya' },
  { title: 'Materai' }
].forEach((category) => {
  fakeCategories.create({
    ...category
  });
});

