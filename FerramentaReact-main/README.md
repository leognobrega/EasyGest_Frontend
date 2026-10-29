# EasyGest Frontend

## Configuração do backend

Configure `VITE_API_URL` no Vercel somente com a URL pública do backend, sem barra final. Esta variável não contém credenciais.

O frontend não possui usuário ou senha fixos. Quando o backend exigir HTTP Basic, utilize o botão **Entrar**; a credencial digitada fica apenas na `sessionStorage` do navegador atual e é enviada ao backend pelo módulo centralizado de API.

A arquitetura com HTTP Basic compartilhado é adequada apenas como acesso administrativo temporário. Para acesso público, recomenda-se migrar para autenticação individual baseada em sessão segura ou token, mantendo HTTPS, CSRF compatível, CORS restrito e autorização por função.

```text
VITE_API_URL=https://easygest-backend.onrender.com
```

Variáveis de produção do backend configuradas no Render:

```text
SPRING_MONGODB_URI
EASYGEST_SECURITY_USERNAME
EASYGEST_SECURITY_PASSWORD
EASYGEST_CORS_ALLOWED_ORIGINS
```

A origem CORS deve conter explicitamente o domínio real do Vercel, por exemplo `https://easygest.vercel.app`.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
