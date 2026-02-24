# mockup-ordem-de-servico

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Deploy no GitHub Pages

1. **No repositório no GitHub:** Settings → Pages → em "Build and deployment" escolha **GitHub Actions** como source.

2. **Push para `main` ou `master`:** o workflow `.github/workflows/deploy-gh-pages.yml` faz o build e publica em GitHub Pages.

3. **URL:** se o repositório for `mockup-ordem-de-servico`, a URL fica:
   - `https://<seu-usuario>.github.io/mockup-ordem-de-servico/`

4. **Se o nome do repositório for outro:** edite no workflow o valor de `VUE_APP_PUBLIC_PATH` (ex.: `/outro-nome/`) ou, no deploy, defina a variável de ambiente correspondente.

5. **Build local para testar:** `npm run build` — a pasta `dist` já usa o mesmo `publicPath` configurado para o projeto.
