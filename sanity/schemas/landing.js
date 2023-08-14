const landing = {
    name: 'landing',
    title: 'Página Inicial',
    type: 'document',
    fields: [
      {
          name: 'top_image',
          title: 'Imagem Superior',
          desc: 'Imagem do Canto Superior Direito',
          type: 'image',
        validation: Rule => Rule.required(),
      },
      {
        name: 'right_image',
        title: 'Imagem Direita',
        desc: 'Imagem do Canto Direito',
        type: 'image',
        validation: Rule => Rule.required(),
      },
      {
        name: 'left_image',
        title: 'Imagem Esquerda',
        desc: 'Imagem do Canto Esquerdo',
        type: 'image',
        validation: Rule => Rule.required(),
      },
    ]
}

export default landing;