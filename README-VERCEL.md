# 🚀 Deploy na Vercel

## Configuração Automática

O projeto já está configurado para deploy automático na Vercel com:

### Arquivos de Configuração
- `vercel.json` - Configuração principal da Vercel
- `.vercelignore` - Arquivos a serem ignorados no deploy
- `build-vercel.sh` - Script de build customizado

### Como Fazer Deploy

1. **Conecte ao GitHub**
   - Faça push do código para o GitHub
   - Acesse [vercel.com](https://vercel.com)
   - Conecte sua conta GitHub

2. **Import Project**
   - Clique em "New Project"
   - Selecione o repositório do jogo
   - A Vercel detectará automaticamente as configurações

3. **Variáveis de Ambiente**
   ```
   DATABASE_URL=sua-url-do-neon-database
   NODE_ENV=production
   ```

4. **Deploy**
   - Clique em "Deploy"
   - A Vercel fará build e deploy automaticamente
   - Cada push no GitHub = deploy automático

### Estrutura de Build
- Frontend: `client/dist/` (Vite build)
- Backend: `dist/index.js` (esbuild)
- Assets estáticos servidos automaticamente

### URLs Finais
- Produção: `https://seu-projeto.vercel.app`
- API: `https://seu-projeto.vercel.app/api/*`

### Domínio Customizado
Depois do deploy, você pode configurar seu domínio personalizado nas configurações do projeto na Vercel.

Pronto para deploy! 🎯