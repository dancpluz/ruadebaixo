export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID

export const pageview = () => {
  window.fbq('track','PageView')
}

// https://developers.facebook.com/docs/facebook-pixel/advanced/
export const event = (name,options = {}) => {
  window.fbq('track',name,options)
}

export const buyer = (fn,em,ph) => {
  window.fbq('init',FB_PIXEL_ID,{
    em: em.toLowerCase(),
    fn: fn.split(' ')[0].toLowerCase(),
    ph: '55' + ph
  }
  );
}

export const purchase = (value,cart,delivery) => {
  window.fbq('track','Purchase',
    {
      value: value,
      currency: 'BRL',
      contents: getCartContents(cart),
      content_type: 'product',
      num_items: cart.length,
      delivery_category: delivery == 'Entrega' ? 'home_delivery' : 'curbside'
    }
  );
}

function getCartContents(cart) {
  let contents = []
  cart.forEach(item => {
    contents.push({
      id: item.id,
      name: item.name,
      category: item.type,
      quantity: 1
    })
  })
  return contents;
};

export const addcart = (item) => {
  window.fbq('track','AddToCart',{
    value: item.price - item.discount,
    currency: 'BRL',
    content_id: item.id,
    content_name: item.name,
    content_type: 'product',
  });
}

