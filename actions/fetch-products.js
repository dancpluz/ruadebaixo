import { client,urlForImage } from '@/sanity/client';

async function buildQuery(searchParams) {
  const params = new URLSearchParams(searchParams)
  const translate = { 'tipo': 'type','tamanho': 'size','categoria': 'tag','qualidade': 'quality','drop': 'drop' };
  let queryArray = [];

  for (const [key,value] of params.entries()) {
    const translatedKey = translate[key];
    if (translatedKey === 'tag') {
      value.split(',').forEach((tag) => {
        queryArray.push(` || ${JSON.stringify(tag)} in ${translatedKey}`);
      });
    } else {
      queryArray.push(` && ${translatedKey} in ${JSON.stringify(value.split(','))}`)
    }
  }

  const queryString = queryArray.length === 1 ? queryArray[0] : queryArray.join('');

  return queryArray.length == 0 ? '' : '&& ' + queryString.slice(3);
}

export const fetchProducts = async (searchParams, interval) => {
  // Retorna os produtos do catálogo de acordo com os parâmetros de query
  const query = await buildQuery(searchParams);

  const data = await client.fetch(`
  *[_type == "product" ${query}] | order(_createdAt desc) | order(sold==true) [${interval * 10}...${(interval + 1) * 10}] {
        ...,
				images[] {
					asset->{
						...,
						metadata
					}
				}
			}`,{ cache: 'no-store' });

  const products = data.map((product) => {
    const imageObjects = product.images.map((image) => {
      if (image.asset) {
        return {
          url: urlForImage(image),
          width: image.asset.metadata.dimensions.width,
          height: image.asset.metadata.dimensions.height,
          blur: image.asset.metadata.lqip,
        }
      }
    });
    return {
      ...product,
      images: imageObjects,
    };
  });

  return products;
};

export async function fetchCountProducts(searchParams) {
  const query = await buildQuery(searchParams);

  const count = await client.fetch(`
  count(*[_type == "product" ${query}])`,{ cache: 'no-store' });

  return count;
};