const product = {
    name: 'product',
    title: 'Produtos Brechó',
    type: 'document',
    fields: [
        {
            name: 'image',
            title: 'Imagem (Sempre 3:4)',
            description: 'Primeira Imagem: frente com transparência, Segunda Imagem: trás com transparência, Última Imagem: Artística',
            type: 'array',
            of: [{ type: 'image' }],
            option: {
                hotspot: true,
            },
            validation: Rule => Rule.required()
        },
        {
            name: 'name',
            title: 'Nome',
            description: 'Nome do produto',
            type: 'string',
            validation: Rule => Rule.required().max(21).error('Máximo 21 caracteres')
        },
        {
            name: 'slug',
            title: 'Slug (produto/"slug")',
            description: 'Nome dps da barra no url ex: https://ruadebaixo.com/produtos/camiseta-poggers',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 90,
            },
            validation: Rule => Rule.required()
        },
        {
            name: 'details',
            title: 'Detalhes',
            description: 'Descrição do produto, medida da cintura, tipo de tecido etc...',
            type: 'string',
            validation: Rule => Rule.required()
        },
        {
            name: 'quality',
            title: 'Qualidade',
            description: 'Qualidade da peça',
            type: 'string',
            options: {
                list: [
                    { title: 'Usado', value: 'Usado' },
                    { title: 'Semi-novo', value: 'Semi-novo' },
                    { title: 'Novo', value: 'Novo' }
                ],
                layout: 'radio'
            },
            validation: Rule => Rule.required()
        },
        {
            name: 'category',
            title: 'Categoria',
            description: 'Categoria da peça, especificar se é calça, camisa etc',
            type: 'string',
            options: {
                list: [
                    { title: 'Camiseta',value: 'Camiseta' },
                    { title: 'Boné',value: 'Boné' },
                    { title: 'Calça',value: 'Calça' },
                    { title: 'Shorts',value: 'Shorts' },
                    { title: 'Acessório',value: 'Acessório' },
                ]
            },
            validation: Rule => Rule.required()
        },
        {
            name: 'size',
            title: 'Tamanho',
            description: 'Tamanho da peça(PP,P,M,G,GG)',
            type: 'string',
            validation: Rule => Rule.required().uppercase().error('Somente letras em maíusculo')
        },
        {
            name: 'price',
            title: 'Preço',
            description: 'Preço do produto',
            type: 'number',
            validation: Rule => Rule.required()
        },
        {
            name: 'sold',
            title: 'Vendido',
            description: 'Marque se já foi vendido',
            type: 'boolean',
            validation: Rule => Rule.required()
        }
    ]
}

export default product;