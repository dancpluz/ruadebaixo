const landing = {
    name: 'landing',
    title: 'Página Inicial',
    type: 'document',
    fields: [
      {
        name: 'text',
        title: 'Texto',
        desc: 'Legenda para a página inicial',
        type: 'string',
      },
      {
        name: 'images',
        title: 'Imagens',
        desc: 'Imagens para ser utilizadas na página inicial',
        type: 'array',
        of: [{ type: 'image' }],
        option: {
          hotspot: true,
        },
        validation: Rule => Rule.required()
      }
    ]
}

export default landing;