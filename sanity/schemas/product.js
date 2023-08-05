export const productTypes = [
    { title: 'Camiseta',value: 'camiseta' },
    { title: 'Boné',value: 'boné' },
    { title: 'Calça',value: 'calça' },
    { title: 'Shorts',value: 'shorts' },
    { title: 'Jaqueta',value: 'jaqueta' },
    { title: 'Óculos', value: 'óculos'},
    { title: 'Acessório',value: 'acessório' },
];

export const productTags = [
    { title: 'Internacional',value: 'internacional' },
    { title: 'Customizado',value: 'customizado' },
    { title: 'Vintage',value: 'vintage' },
    { title: 'Original',value: 'original' },
];

export const productQualities = [
    { title: 'Usado',value: 'usado' },
    { title: 'Semi-novo',value: 'semi-novo' },
    { title: 'Novo',value: 'novo' },
];

export const productDrops = [
    { title: 'Valendo uma Coca',value: 'Valendo uma Coca' },
    { title: 'MiniDrops',value: 'MiniDrops' },
    { title: 'Skate',value: '' },
    { title: 'Carro',value: '' },
    { title: 'Lixo',value: '' },
];

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
            name: 'type',
            title: 'Tipo da Peça',
            description: 'Tipo da peça, camiseta, boné, calça etc...',
            type: 'string',
            options: { 
                list: productTypes
            },
            validation: Rule => Rule.required()
        },
        {
            name: 'name',
            title: 'Nome',
            description: 'Nome do produto, colocar marca se for boa (Não colocar tipo, exemplo: "Internacional 1992")',
            type: 'string',
            validation: Rule => Rule.required().max(21).error('Máximo 21 caracteres')
        },
        {
            name: 'slug',
            title: 'Slug (produto/"slug")',
            description: 'Só clicar em "gerar", nome dps da barra no url ex: https://ruadebaixo.com/produtos/camiseta-poggers',
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
            description: 'Descrição do produto, tipo de tecido, furos, problemas etc...',
            type: 'array',
            of: [{ type: 'string' }],
            validation: Rule => Rule.required()
        },
        {
            name: 'quality',
            title: 'Qualidade',
            description: 'Qualidade da peça',
            type: 'string',
            options: {
                list: productQualities,
                layout: 'radio'
            },
            validation: Rule => Rule.required()
        },
        {
            name: 'tag',
            title: 'Tag',
            description: 'Categoria da peça, internacional, vintage, custom etc',
            type: 'array',
            of: [{ type: 'string' }],
            options: {
                list: productTags
            },
        },
        {
            name: 'drop',
            title: 'Drop',
            description: 'De qual drop é essa peça?',
            type: 'string',
            options: {
                list: productDrops,
                layout: 'radio'
            },
            validation: Rule => Rule.required()
        },
        {
            name: 'drop',
            title: 'Drop',
            description: 'De qual drop é essa peça?',
            type: 'string',
            options: {
                list: productDrops,
                layout: 'radio'
            },
            validation: Rule => Rule.required()
        },
        {
            name: 'size',
            title: 'Tamanho na Etiqueta',
            description: 'Tamanho da peça(PP,P,M,G,GG)',
            type: 'string',
            validation: Rule => Rule.required().uppercase().error('Somente letras em maíusculo')
        },
        {
            name: 'wears',
            title: 'Veste',
            description: 'Tamanho da peça de acordo com nossa tabela',
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
            name: 'discount',
            title: 'Desconto padrão',
            description: 'Opcional, desconto aplicado (Preço - desconto)',
            type: 'number',
            initialValue: 0
        },
        {
            name: 'ordered',
            title: 'Pedido',
            description: 'Define quantos pessoas pediram',
            type: 'number',
            initialValue: 0
        },
        {
            name: 'sold',
            title: 'Vendido',
            description: 'Marque se já foi vendido',
            type: 'boolean',
            initialValue: false
        }
    ]
}

export default product;