API erros:
- 500 Internal Server Error: O servidor encontrou uma condição inesperada que o impediu de atender à solicitação. É um erro genérico que pode ter diversas causas, como bugs no código do servidor, falhas de conexão com bancos de dados ou problemas de configuração. 

- 501 Not Implemented: O servidor não consegue atender ao pedido, pois não possui a funcionalidade necessária. Isso geralmente indica um problema na implementação do servidor, não no pedido do cliente. 

- 502 Bad Gateway: Um servidor que está a atuar como gateway ou proxy recebeu uma resposta inválida de um servidor de origem, indicando um problema na comunicação entre os servidores. 

- 503 Service Unavailable: O servidor está temporariamente indisponível para atender ao pedido, muitas vezes devido a uma sobrecarga de tráfego ou problemas de manutenção. 

- 504 Gateway Timeout: O servidor que atua como gateway ou proxy não recebeu uma resposta em tempo hábil do servidor de origem. Isso ocorre quando dois ou mais servidores estão envolvidos no processamento da requisição. 

- 505 HTTP Version Not Supported: O servidor não suporta a versão do protocolo HTTP utilizada na requisição.
 
- 508 Resource Limit Is Reached: O servidor atingiu um limite de recursos (como largura de banda ou capacidade de processamento) e não consegue atender ao pedido. 


- [ ] Modo manutenção
- [ ] HUB
  - [x] Logo em cima
  - [x] Capa de Jogo Componente
    - [x] Frente
    - [x] Verso
  - [x] Puxar dados do banco
  - [x] Carrosel
  - [x] Lógica de seleção (Context)
  - [x] Puxar dados
  - [ ] 
  - [x] Animações
  - [x] Botões

# ANTIGO

- [x] Pág. Landing
  - [x] Header
  - [x] Animação
  - [x] Countdown
  - [x] Rodapé
- [ ] Pág. Catalogo
  - [x] Card Produto
  - [ ] Infinite Scroll
  - [ ] Filtragem
- [x] Pág. Produto
- [ ] Pág. Adesivo
- [x] Pág. Checkout
  - [x] Carrinho de Compras
  - [ ] Local Storage
- [ ] Pág. Links
- [ ] Pág. Lookbook
- [x] Rotas de API definidas
 - [x] Asaas
 - [x] Strapi
 - [x] Kangu
 - [x] Whatsapp
- [x] Integração com entregas (kangu)
- [x] Integração de pagamento (asaas.dev/stripe)
- [x] Integração com bot do zap
- [ ] SEO
- [x] Modo Manutenção
- [x] Responsivo
- [ ] Analytics
- [ ] Melhorar final do checkout
- [ ] Mensagem para o cliente
- [x] Error Handling Sentry

# Backlog:

- [ ] Melhorar Context
- [ ] Query state (nuqs)
- [ ] Reduzir info no cartitems
- [x] Salvar vendas e clientes
- [ ] Verificação produto vendido
- [ ] Essência
- [ ] Avaliações
- [ ] FAQ e Sobre
- [ ] Loading state
- [ ] Dark/Light Mode
- [ ] Backup
- [x] Webhooks
- [ ] Segurança Webhook
- [ ] Página de transmissão
- [ ] Melhorar Local Storage
- [ ] Melhorar Página de Produto
- [ ] Melhorar Imagens