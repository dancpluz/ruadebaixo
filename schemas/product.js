export const productTypes = {
    list: [
        { title: 'Camiseta',value: 'camiseta' },
        { title: 'Boné',value: 'boné' },
        { title: 'Calça',value: 'calça' },
        { title: 'Shorts',value: 'shorts' },
        { title: 'Acessório',value: 'acessório' },
    ]
}

export const productTags = {
    list: [
        { title: 'Internacional',value: 'internacional' },
        { title: 'Customizado',value: 'customizado' },
        { title: 'Vintage',value: 'vintage' },
    ]
}

export const productQualities = {
    list: [
        { title: 'Usado',value: 'usado' },
        { title: 'Semi-novo',value: 'semi-novo' },
        { title: 'Novo',value: 'novo' },
    ]
}

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
            name: 'type',
            title: 'Tipo da Peça',
            description: 'Nome dps da barra no url ex: https://ruadebaixo.com/produtos/camiseta-poggers',
            type: 'string',
            options: {
                productTypes
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
                productQualities,
                layout: 'radio'
            },
            validation: Rule => Rule.required()
        },
        {
            name: 'tag',
            title: 'Tag',
            description: 'Categoria da peça, internacional, vintage, customizado',
            type: 'string',
            options: {
                productTags
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