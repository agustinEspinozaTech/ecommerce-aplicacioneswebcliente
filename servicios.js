const baseUrl = 'https://dummyjson.com';

export async function getProductos(limit = 30) {

    const res = await fetch(`${baseUrl}/products?limit=${limit}`);

    if (!res.ok) throw new Error('Se produjo un error al intentar mostrar los productos');

    const data = await res.json();

    return data.products; 
}

export async function getProductoPorId(id) {

    const res = await fetch(`${baseUrl}/products/${id}`);

    if (!res.ok) throw new Error('Producto no encontrado');

    return await res.json();
}
