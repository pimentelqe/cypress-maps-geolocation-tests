# Hope - Sistema de Cadastro e Visualização de Orfanatos

Este projeto é uma aplicação completa para cadastro, visualização e gerenciamento de orfanatos, composta por:
- **API** (Node.js/Express/MongoDB)
- **Frontend** (React)
- **Testes automatizados** (Cypress)

## Estrutura do Projeto

```
cypress-xp/hope/
├── api/         # Backend Node.js/Express/MongoDB
├── web/         # Frontend React
│   └── cypress/ # Testes E2E com Cypress
```

## Requisitos
- Node.js >= 16.x
- MongoDB (local ou Atlas)
- Yarn ou npm

## Instalação

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/cypress-xp.git
   cd cypress-xp/hope
   ```

2. **Instale as dependências do backend e frontend:**
   ```bash
   cd api
   yarn install
   cd ../web
   yarn install
   ```

3. **Configure as variáveis de ambiente:**
   - No backend (`api/.env`), configure a string de conexão do MongoDB:
     ```
     MONGO_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/HopeDB
     ```

## Executando o Projeto

1. **Inicie o backend:**
   ```bash
   cd api
   yarn dev
   ```
   O backend estará disponível em `http://localhost:3334`.

2. **Inicie o frontend:**
   ```bash
   cd web
   yarn start
   ```
   O frontend estará disponível em `http://localhost:3001`.

## Testes Automatizados

Os testes E2E estão configurados com Cypress.

1. **Abra o Cypress:**
   ```bash
   cd web
   yarn cypress open
   ```
   Ou execute em modo headless:
   ```bash
   yarn cypress run
   ```

2. **Configuração de resolução:**
   Os testes já definem a resolução recomendada (`1280x720`) via `cy.viewport`.

## Estrutura dos Testes

- `cypress/e2e/register.cy.js`: Testes de cadastro de orfanatos.
- `cypress/e2e/map.cy.js`: Testes de interação com o mapa.
- `cypress/fixtures/orphanages.json`: Dados de teste.

## Observações

- Certifique-se que o backend está rodando antes de executar os testes.
- As variáveis de ambiente do Cypress estão configuradas em `web/cypress.config.js`.
- O projeto utiliza o plugin `cypress-mongodb` para manipulação do banco durante os testes.

## Licença

MIT

---

Desenvolvido por [Fernando Pimentel].
