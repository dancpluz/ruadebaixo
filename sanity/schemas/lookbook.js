const lookbook = {
  name: 'lookbook',
  title: 'LookBook',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Nome da Coleção/Drop',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'date',
      title: 'Data',
      description: 'Formato "DD/MM/YYYY"',
      type: 'date',
      options: {
        dateFormat: 'DD/MM/YYYY',
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'images',
      title: 'Imagens',
      type: 'array',
      of: [{ type: 'image' }],
      option: {
        hotspot: true,
      },
      validation: Rule => Rule.required()
    },
  ]
}

export default lookbook;