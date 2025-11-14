import { getProductos } from '../servicios.js';

export async function inicializarBuscador() {
  const form = document.getElementById('buscador');
  const lista = document.querySelector('.listaProductos');
  if (!form || !lista) return; 

  const selectFiltro = form.querySelector('select[name="filtro"]');
  const input = form.querySelector('input[type="search"]');
  const button = form.querySelector('button');

  let productos = [];
  let htmlOriginal = null;

  const productsToHTML = (arr) =>
    arr.map(
      (p) => `
      <li>
        <article class="producto">
          <figure><img src="${p.thumbnail}" alt="${p.title}"></figure>
          <div>
            <h3>${p.title}</h3>
            <p class="precio">$${p.price}</p>
            <div class="acciones">
              <a href="#detalleProducto" class="verDetalle" data-id="${p.id}">Ver detalle</a>
              <button>Comprar</button>
            </div>
          </div>
        </article>
      </li>`
    ).join('');

  const ensureHtmlOriginal = () => {
    if (htmlOriginal == null || htmlOriginal.trim() === '') {
      const current = lista.innerHTML.trim();
      htmlOriginal = current || productsToHTML(productos);
    }
  };

  try {
    productos = await getProductos(30);
    ensureHtmlOriginal();
  } catch (error) {
    console.error('Error al obtener productos:', error);
  }

  form.addEventListener('submit', (e) => e.preventDefault());

  const normalizar = (t) =>
    t?.toString().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '') || '';

  function filtrarProductos(campo, valor) {
    const q = normalizar(valor);
    if (q.length < 2) return null;
    return productos.filter((p) => normalizar(p[campo]).includes(q));
  }

  function render(listaFiltrada) {
    if (listaFiltrada === null) {
      ensureHtmlOriginal();
      lista.innerHTML = htmlOriginal;
      return;
    }
    if (listaFiltrada.length === 0) {
      lista.innerHTML = '<li><p>No se encontraron resultados</p></li>';
      return;
    }
    lista.innerHTML = productsToHTML(listaFiltrada);
  }

  let t;
  const triggerBusqueda = () => {
    const campo = selectFiltro.value;
    const valor = input.value.trim();
    const resultados = filtrarProductos(campo, valor);
    render(resultados);
  };

  input.addEventListener('input', () => {
    clearTimeout(t);
    t = setTimeout(triggerBusqueda, 250);
  });

  button.addEventListener('click', (e) => {
    e.preventDefault();
    triggerBusqueda();
  });

  input.addEventListener('search', triggerBusqueda);
}


document.addEventListener('DOMContentLoaded', inicializarBuscador);
