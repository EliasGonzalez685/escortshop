// app/sitemap.js
export default async function sitemap() {
  const baseUrl = 'https://escortshoppy.com';
  const currentDate = new Date().toISOString();
  
  const departamentos = [
    'alto-paraguay',
    'alto-parana',
    'amambay', 
    'boqueron',
    'caaguazu',
    'caazapa',
    'canindeyu',
    'central',
    'concepcion',
    'cordillera',
    'guaira',
    'itapua',
    'misiones',
    'neembucu',
    'paraguari',
    'presidente-hayes',
    'san-pedro'
  ];
  
  const categorias = ['escorts', 'trans', 'gay', 'parejas'];
  
  const paginasEstaticas = [
    'login',
    'registro',
    'mis-anuncios',
    'nuevo-anuncio',
    'terminos',
    'contacto',
    'admin'
  ];

  // Función para ESCAPAR XML correctamente
  const escapeXml = (text) => {
    if (!text) return '';
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  };

  const urls = [];

  // Página principal
  urls.push({
    url: escapeXml(baseUrl),
    lastModified: currentDate,
    changeFrequency: 'daily',
    priority: 1.0,
  });

  // Categorías principales
  categorias.forEach(categoria => {
    urls.push({
      url: escapeXml(`${baseUrl}/${categoria}`),
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    });
  });

  // Páginas estáticas
  paginasEstaticas.forEach(pagina => {
    urls.push({
      url: escapeXml(`${baseUrl}/${pagina}`),
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    });
  });

  // Página de departamentos
  urls.push({
    url: escapeXml(`${baseUrl}/departamentos`),
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.8,
  });

  // URLs por departamento
  categorias.forEach(categoria => {
    departamentos.forEach(departamento => {
      urls.push({
        url: escapeXml(`${baseUrl}/${categoria}?departamento=${departamento}`),
        lastModified: currentDate,
        changeFrequency: 'daily',
        priority: 0.7,
      });
    });
  });

  return urls;
}