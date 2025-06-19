import type { Schema, Struct } from '@strapi/strapi';

export interface CheckoutCheckout extends Struct.ComponentSchema {
  collectionName: 'components_checkout_checkouts';
  info: {
    description: '';
    displayName: 'Checkout';
    icon: 'shoppingCart';
  };
  attributes: {
    feedback: Schema.Attribute.Text;
    freight: Schema.Attribute.Decimal & Schema.Attribute.DefaultTo<0>;
    local_pickup: Schema.Attribute.Enumeration<
      ['UnB', 'Rodovi\u00E1ria', 'Guar\u00E1 II', 'Asa Norte', 'Parano\u00E1']
    >;
    parcels: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      > &
      Schema.Attribute.DefaultTo<1>;
    payment_type: Schema.Attribute.Enumeration<['credit', 'pix']>;
    shipping_type: Schema.Attribute.Enumeration<['retirada', 'entrega']>;
    subtotal: Schema.Attribute.Decimal &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    total: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
  };
}

export interface CheckoutClientInfo extends Struct.ComponentSchema {
  collectionName: 'components_checkout_client_infos';
  info: {
    description: '';
    displayName: 'ClientInfo';
    icon: 'user';
  };
  attributes: {
    address: Schema.Attribute.String;
    cep: Schema.Attribute.String;
    city: Schema.Attribute.String;
    complement: Schema.Attribute.String;
    cpf: Schema.Attribute.String;
    district: Schema.Attribute.String;
    email: Schema.Attribute.Email;
    insta: Schema.Attribute.String;
    number: Schema.Attribute.String;
    state: Schema.Attribute.String;
  };
}

export interface FaqQuestion extends Struct.ComponentSchema {
  collectionName: 'components_faq_questions';
  info: {
    displayName: 'Question';
    icon: 'emotionHappy';
  };
  attributes: {
    content: Schema.Attribute.Blocks;
    title: Schema.Attribute.String;
  };
}

export interface LinkLink extends Struct.ComponentSchema {
  collectionName: 'components_link_links';
  info: {
    displayName: 'Link';
    icon: 'earth';
  };
  attributes: {
    instagram: Schema.Attribute.String;
    linkedin: Schema.Attribute.String;
    tiktok: Schema.Attribute.String;
    youtube: Schema.Attribute.String;
  };
}

export interface ProductMeasure extends Struct.ComponentSchema {
  collectionName: 'components_product_measures';
  info: {
    displayName: 'Measure';
    icon: 'scissors';
  };
  attributes: {
    body_part: Schema.Attribute.String & Schema.Attribute.Required;
    measuring_unit: Schema.Attribute.String & Schema.Attribute.Required;
    sizes: Schema.Attribute.Component<'product.size', true> &
      Schema.Attribute.Required;
  };
}

export interface ProductProductInfo extends Struct.ComponentSchema {
  collectionName: 'components_product_product_infos';
  info: {
    description: '';
    displayName: 'ProductInfo';
    icon: 'shirt';
  };
  attributes: {
    categories: Schema.Attribute.JSON &
      Schema.Attribute.CustomField<
        'plugin::multi-select.multi-select',
        ['Internacional', 'Customizado', 'Vintage', 'Original']
      > &
      Schema.Attribute.DefaultTo<'[]'>;
    clicked: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    details: Schema.Attribute.Blocks;
    gifts: Schema.Attribute.Relation<'oneToMany', 'api::gift.gift'>;
    manifesto: Schema.Attribute.String;
    type: Schema.Attribute.Enumeration<
      [
        'Anel',
        'Bermuda',
        'Bon\u00E9',
        'Cal\u00E7a',
        'Camisa',
        'Camiseta',
        'Casaco',
        'Cinto',
        'Colar',
        'Colete',
        'Isqueiro',
        'Jaqueta',
        'Macac\u00E3o',
        '\u00D3culos',
        'Polo',
        'Pulseira',
        'Rel\u00F3gio',
        'Short',
        'Shoulder Bag',
        'Su\u00E9ter',
        'T\u00EAnis',
      ]
    > &
      Schema.Attribute.Required;
  };
}

export interface ProductSize extends Struct.ComponentSchema {
  collectionName: 'components_product_sizes';
  info: {
    displayName: 'Size';
    icon: 'collapse';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    quantity: Schema.Attribute.Integer & Schema.Attribute.Required;
  };
}

export interface ProductVariant extends Struct.ComponentSchema {
  collectionName: 'components_product_variants';
  info: {
    displayName: 'Variant';
    icon: 'star';
  };
  attributes: {
    description: Schema.Attribute.Blocks;
    discount: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    images: Schema.Attribute.Media<'images', true> & Schema.Attribute.Required;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    price: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    sizes: Schema.Attribute.Component<'product.size', true> &
      Schema.Attribute.Required;
    table: Schema.Attribute.Relation<'oneToOne', 'api::table.table'>;
  };
}

export interface TopicTopic extends Struct.ComponentSchema {
  collectionName: 'components_topic_topics';
  info: {
    displayName: 'Topic';
    icon: 'bulletList';
  };
  attributes: {
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'checkout.checkout': CheckoutCheckout;
      'checkout.client-info': CheckoutClientInfo;
      'faq.question': FaqQuestion;
      'link.link': LinkLink;
      'product.measure': ProductMeasure;
      'product.product-info': ProductProductInfo;
      'product.size': ProductSize;
      'product.variant': ProductVariant;
      'topic.topic': TopicTopic;
    }
  }
}
