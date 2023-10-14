export const productTypes = [
    { title: 'Camiseta',value: 'Camiseta' },
    { title: 'Camisa',value: 'Camisa' },
    { title: 'Casaco',value: 'Casaco' },
    { title: 'Polo',value: 'Polo' },
    { title: 'Suéter',value: 'Suéter' },
    { title: 'Jaqueta',value: 'Jaqueta' },
    { title: 'Boné',value: 'Boné' },
    { title: 'Calça',value: 'Calça' },
    { title: 'Bermuda',value: 'Bermuda' },
    { title: 'Shorts',value: 'Shorts' },
    { title: 'Óculos',value: 'Óculos' },
    { title: 'Acessório',value: 'Acessório' },
    { title: 'Tênis',value: 'Tênis' },
    { title: 'Outro',value: '' },
];

export const productTags = [
    { title: 'Internacional',value: 'Internacional' },
    { title: 'Customizado',value: 'Customizado' },
    { title: 'Vintage',value: 'Vintage' },
    { title: 'Original',value: 'Original' },
];

export const productQualities = [
    { title: 'Usado',value: 'Usado' },
    { title: 'Novo',value: 'Novo' },
];

export const productDrops = [
    { title: 'Skate',value: '' },
    { title: 'NegoJapa',value: 'NegoJapa' },
    { title: 'Valendo uma Coca',value: 'Valendo uma Coca' },
    { title: 'MiniDrops',value: 'MiniDrops' },
    { title: 'Outros',value: 'Outros' },
];

const product = {
    name: 'product',
    title: 'Produtos Brechó',
    type: 'document',
    fields: [
        {
            name: 'id',
            title: 'ID',
            description: 'Código do produto, de acordo com a planilha',
            type: 'string',
            validation: Rule => Rule.custom((value,context) => {
                if (!/^\d+$/.test(value)) {
                    return 'ID deve ter caracteres númericos';
                }
                return true;
            }).required().min(3).max(3)
        },
        {
            name: 'images',
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
            initialValue: '',
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
            initialValue: '',
        },
        {
            name: 'size',
            title: 'Tamanho na Etiqueta',
            description: 'Tamanho da peça(PP,P,M,G,GG)',
            type: 'string',
            validation: Rule => Rule.required().uppercase().error('Somente letras em maíusculo')
        },
        {
            name: 'measures',
            title: 'Medidas',
            description: 'Medida da peça em centímetros',
            type: 'object',
            fields: [
                {
                    name: 'length',
                    title: 'Largura',
                    type: 'number',
                    description: 'Largura da peça em centímetros',
                    validation: Rule => Rule.required().min(0)
                },
                {
                    name: 'height',
                    title: 'Altura',
                    type: 'number',
                    description: 'Altura da peça em centímetros',
                    validation: Rule => Rule.required().min(0)
                }
            ],
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
            description: 'Define se o produto foi pedido ou não (Será marcado automaticamente)',
            type: 'boolean',
            initialValue: false
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