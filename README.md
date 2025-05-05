# MDFe SaaS - Frontend

Aplicação frontend para o sistema de emissão e gestão de Manifestos Eletrônicos de Documentos Fiscais (MDFe) em formato SaaS.

## 🚀 Funcionalidades

- Autenticação segura de usuários
- Dashboard com métricas e gráficos
- Gestão de notas fiscais e pedidos
- Emissão de MDFe
- Consulta de status de documentos
- Operações de cancelamento/encerramento
- Interface responsiva e acessível

## 🛠 Tecnologias

- [Next.js](https://nextjs.org/) 15.3.1
- [React](https://react.dev/) 18+
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/) - Componentes UI
- [React Hook Form](https://react-hook-form.com/) - Formulários
- [Zod](https://zod.dev/) - Validação
- [TanStack Query](https://tanstack.com/query/latest) - Gerenciamento de estado

## 📋 Pré-requisitos

- Node.js 18+
- npm 9+ ou yarn 1.22+
- Conexão com o backend MDFe SaaS (ver [PRD](./doc/prd.txt))

## ⚙️ Instalação

1. Clone o repositório:

```bash
git clone https://github.com/otenielpinto/mdfe-saas-front.git
```

2. Instale as dependências:

```bash
npm install
# ou
yarn install
```

3. Configure as variáveis de ambiente:

```bash
cp .env.example .env.local
```

Edite o arquivo `.env.local` com as configurações do seu ambiente.

## 🏃 Execução

Para iniciar o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```

A aplicação estará disponível em [http://localhost:3000](http://localhost:3000)

Para build de produção:

```bash
npm run build
npm run start
```

## 🌐 Ambiente

| Ambiente    | URL                            | Descrição                   |
| ----------- | ------------------------------ | --------------------------- |
| Local       | http://localhost:3000          | Ambiente de desenvolvimento |
| Homologação | https://teste-mdfe.komache.com | Testes e validação          |
| Produção    | https://mdfe.komache.com.br    | Ambiente produtivo          |

## 🔗 Links Úteis

- [Documentação do Backend](./doc/prd.txt)
- [Manual MDFe](https://dfe-portal.svrs.rs.gov.br/Mdfe)
- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/docs)

## 🤝 Contribuição

Contribuições são bem-vindas! Siga os passos:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.
