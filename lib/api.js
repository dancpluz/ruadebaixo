import { client,urlForImage } from '@/sanity/client';

export const fetchLandingImages = async () => {
  // Retorna as imagens da landing page
  const data = await client.fetch(`*[_type == "landing"][0]{
      ...,
      images[] {
              asset->{
                  ...,
                  metadata
              },
          },
      }`,{ next: { revalidate: 60 } })

  const photos = data.images.map(image => {
    return {
      url: urlForImage(image),
      width: image.asset.metadata.dimensions.width,
      height: image.asset.metadata.dimensions.height,
      blur: image.asset.metadata.lqip,
    }
  });

  return { title: data.title,images: photos }
}


export const fetchLandingProducts = async () => {
  // Retorna os produtos da landing page
  const data = await client.fetch(`
  *[_type == "product" && drop == "Prólogo"] | order(_updatedAt desc) [0..7] {
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
          return {
            url: urlForImage(image),
            width: image.asset.metadata.dimensions.width,
            height: image.asset.metadata.dimensions.height,
            blur: image.asset.metadata.lqip,
          }
        });
        return {
          ...product,
          images: imageObjects,
        };
      });
      
      return products;
    };
    
    export const checkSoldProduct = async (_id) => {
      // Checa se um produto foi vendido
      const data = await client.fetch(`
      *[_type == 'product' && _id == '${_id}'][0] {
        sold
			}`,{ next: { revalidate: 60 } });

      return data.sold;
    };
    
    export const fetchProduct = async (slug) => {
      // Retorna as informações do produto
      const data = await client.fetch(`
      *[_type == 'product' && slug.current == '${slug}'][0] {
        ...,
				images[] {
          asset->{
            ...,
						metadata
					}
				}
			}`,{ cache: 'no-store' });
      
      const imageObjects = data.images.map((image) => {
        return {
          url: urlForImage(image),
          width: image.asset.metadata.dimensions.width,
          height: image.asset.metadata.dimensions.height,
      blur: image.asset.metadata.lqip,
    }
  });
   
  return { ...data,images: imageObjects };
};

export const fetchLookBookInfo = async (slug) => {
  // Retorna as informações do produto
  const data = await client.fetch(`
  *[_type == 'lookbook' && slug.current == '${slug}'][0] {
    name,
    date,
    slug,
  }`);
  
  return data;
};

export const fetchLookBook = async () => {
  // Retorna as informações do produto
  const data = await client.fetch(`
  *[_type == 'lookbook'] | order(date desc) { 
    name,
    slug,
    date,
    cover {
      asset-> {
        ...,
        metadata
      },
    },
  }`);

  const lookbooks = data.map((lookbook) => {
    return {
      ...lookbook,
      cover: {
        url: urlForImage(lookbook.cover),
        blur: lookbook.cover.asset.metadata.lqip,
      }
    }
  });
  //console.log(data)
  // const cover = { url: urlForImage(data.cover), blur: data.cover.asset.metadata.lqip };

  return lookbooks;
};

export const fetchLookbookImages = async (slug,interval) => {
  // Retorna as informações do produto
  const data = await client.fetch(`
  *[_type == 'lookbook' && slug.current == '${slug}'][0] {
    images[${interval * 5}...${(interval + 1) * 5}] {
      asset->{
        ...,
        metadata
      }
    }
  }`);
  
  const imageObjects = data.images.map((image) => {
    return {
      url: urlForImage(image),
      blur: image.asset.metadata.lqip,
    }
  });
  
  return imageObjects;
};

export async function countLookBook(slug) {
  const count = await client.fetch(`
  *[_type == 'lookbook' && slug.current == '${slug}'][0]{ 
    'imageCount': count(images)
  }`);

  return count.imageCount;
};

export const fetchMetadata = async (slug) => {
  // Retorna informações para colocar no metadata do produto
  const data = await client.fetch(`
  *[_type == 'product' && slug.current == '${slug}'][0] {
        ...,
				images[0] {
					asset->{
						...,
						metadata
					}
				}
			}`, { cache: 'no-store' });

  if (!data) {
    return false;
  }

  return { ...data,image: {url: urlForImage(data.images)} };
};

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

export const fetchCatalogProducts = async (searchParams,interval) => {
  // Retorna os produtos do catálogo de acordo com os parâmetros de query
  const query = await buildQuery(searchParams);

  const data = await client.fetch(`
  *[_type == "product" ${query}] | order(price desc) | order(_updatedAt desc) | order(sold==true) [${interval * 10}...${(interval + 1) * 10}] {
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

export async function countProducts(searchParams) {
  const query = await buildQuery(searchParams);

  const count = await client.fetch(`
  count(*[_type == "product" ${query}])`,{ cache: 'no-store' });

  return count;
};

export const fetchFilterOptions = async (option) => {
  // Retorna as opções que existem para fazer as querys
  const data = await client.fetch(`
  *[_type == "product"] {
    ${option}
  }`, { cache: 'no-store' });

  let filterOptions = new Set();
  data.forEach(obj => {
    const value = obj[option];
    if (Array.isArray(value)) {
      value.forEach(e => {
        filterOptions.add(e)
      })
    } else if (typeof value === 'string' && value.trim() !== '') {
      filterOptions.add(value);
    }
  })

  return [...Array.from(filterOptions).sort()];
}

export const fetchStaticParams = async (type) => {
  // Retorna as rotas pra gerar as páginas dos produtos previamente
  const data = await client.fetch(`
  *[_type == '${type}']{
    slug
  }`,{ cache: 'no-store' });

  const slugRoutes = data.map((product) => product.slug.current);

  return slugRoutes;
}

export const fetchSiteMapData = async (type) => {
  // Retorna as rotas e a data de modificação pra gerar o sitemap.xml
  const data = await client.fetch(`
  *[_type == '${type}'] {
    slug, _updatedAt,
  }`, { cache: 'no-store' });

  const routes = data.map((product) => {return { slug: product.slug.current, lastModified: product._updatedAt }});

  return routes;
}

export const updateOrderedProduct = async (id) => {
  // Atualiza o produto pra marcá-lo como vendido
  await client
    .patch(id)
    .set({sold: true})
    .commit()
    .then(() => {
      console.log('Atualizado com sucesso!')
    })
    .catch((err) => {
      console.error('Erro ao atualizar: ', err.message)
    })
}

export const fetchLinks = async () => {
  // Retorna os links para a página de links
  const data = await client.fetch(`
  *[_type == "links"]
  `,{ next: { revalidate: 300 } });

  return data[0];
}

export const fetchConfig = async () => {
  // Retorna as configurações do site
  const data = await client.fetch(`
  *[_type == "config"][0]{local_storage_version,maintenance_mode,maintenance_text}
  `,{ next: { revalidate: 300 } });

  return data;
}
