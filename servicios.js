import { AIRTABLE_TOKEN, BASE_ID, TABLE_NAME } from './env.js';

const baseUrl = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;
const headers = {
  Authorization: `Bearer ${AIRTABLE_TOKEN}`,
  'Content-Type': 'application/json',
};

const adaptOut = (r) => ({
  id: r.id,
  title: r.fields.title,
  description: r.fields.description,
  price: r.fields.price,
  stock: r.fields.stock,
  talle: r.fields.talle,
  thumbnail: r.fields.thumbnail,
});

const adaptIn = (p) => {
  const fields = {};
  if (p.title !== undefined) fields.title = p.title;
  if (p.description !== undefined) fields.description = p.description;
  if (p.price !== undefined) fields.price = p.price;
  if (p.stock !== undefined) fields.stock = p.stock;
  if (p.talle !== undefined) fields.talle = p.talle;
  if (p.thumbnail !== undefined) fields.thumbnail = p.thumbnail;
  return { fields };
};

async function request(url, options = {}) {
  const res = await fetch(url, { headers, ...options });
  if (!res.ok) {
    let msg = 'Error en la solicitud';
    try {
      const err = await res.json();
      if (err?.error?.message) msg = err.error.message;
    } catch {}
    throw new Error(msg);
  }
  return res.json();
}

export async function getProductos(limit = 30) {
  const data = await request(`${baseUrl}?maxRecords=${limit}`);
  return data.records.map(adaptOut);
}

export async function getProductoPorId(id) {
  const data = await request(`${baseUrl}/${id}`);
  return adaptOut(data);
}

export async function postProducto(producto) {
  const body = JSON.stringify(adaptIn(producto));
  const data = await request(baseUrl, { method: 'POST', body });
  return adaptOut(data);
}

export async function putProducto(id, productoParcial) {
  const body = JSON.stringify(adaptIn(productoParcial));
  const data = await request(`${baseUrl}/${id}`, { method: 'PATCH', body });
  return adaptOut(data);
}

export async function deleteProducto(id) {
  const data = await request(`${baseUrl}/${id}`, { method: 'DELETE' });
  return { id: data.id, deleted: data.deleted === true };
}
