const lookbook = {
  name: 'lookbook',
  title: 'LookBook',
  type: 'document',
  fields: [
      {
        name: 'collection',
        title: 'Nome da Coleção',
        description: 'Padrão ("")',
        type: 'array',
        of: [{ type: 'image' }],
        option: {
          hotspot: true,
        },
        validation: Rule => Rule.required()
      },
    ]
}
//WIP