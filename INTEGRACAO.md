# 🚀 Guia Rápido de Integração

Este guia mostra como integrar os plugins de segurança em seus projetos reais.

## 📦 Instalação Rápida

### Para Projeto Backend (Node.js/Express)

```bash
npm install --save-dev eslint eslint-plugin-security eslint-plugin-sonarjs
```

**`.eslintrc.json`:**
```json
{
  "plugins": ["security", "sonarjs"],
  "extends": ["eslint:recommended"],
  "rules": {
    "security/detect-eval-with-expression": "error",
    "security/detect-unsafe-regex": "error",
    "security/detect-non-literal-fs-filename": "warn",
    "security/detect-child-process": "warn",
    "sonarjs/cognitive-complexity": ["error", 15]
  }
}
```

---

### Para Projeto Frontend (React/Vue)

```bash
npm install --save-dev eslint eslint-plugin-no-unsanitized eslint-plugin-sonarjs
```

**`.eslintrc.json`:**
```json
{
  "plugins": ["no-unsanitized", "sonarjs"],
  "extends": ["eslint:recommended"],
  "env": {
    "browser": true
  },
  "rules": {
    "no-unsanitized/method": "error",
    "no-unsanitized/property": "error",
    "sonarjs/cognitive-complexity": ["error", 15],
    "sonarjs/no-duplicate-string": ["warn", { "threshold": 3 }]
  }
}
```

---

### Para API/Backend Completo

```bash
npm install --save-dev eslint eslint-plugin-security eslint-plugin-security-node eslint-plugin-sonarjs
```

**`.eslintrc.json`:**
```json
{
  "plugins": ["security", "security-node", "sonarjs"],
  "extends": ["eslint:recommended"],
  "rules": {
    "security/detect-eval-with-expression": "error",
    "security/detect-unsafe-regex": "error",
    "security/detect-non-literal-fs-filename": "warn",
    "security/detect-child-process": "warn",
    "security-node/detect-insecure-randomness": "error",
    "security-node/detect-crlf": "warn",
    "sonarjs/cognitive-complexity": ["error", 15]
  }
}
```

---

## 🔧 Scripts NPM

Adicione ao seu **`package.json`**:

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "lint:security": "eslint . --ext .js --plugin security",
    "test": "npm run lint && npm run test:unit"
  }
}
```

---

## 🎯 Integração com CI/CD

### GitHub Actions

**`.github/workflows/lint.yml`:**
```yaml
name: Lint

on: [push, pull_request]

jobs:
  lint:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run ESLint
        run: npm run lint
```

---

### GitLab CI

**`.gitlab-ci.yml`:**
```yaml
lint:
  stage: test
  image: node:18
  script:
    - npm ci
    - npm run lint
  only:
    - merge_requests
    - main
```

---

## 🪝 Pre-commit Hook

Instale o Husky para rodar ESLint antes de cada commit:

```bash
npm install --save-dev husky lint-staged
npx husky init
```

**`.husky/pre-commit`:**
```bash
#!/bin/sh
npx lint-staged
```

**`package.json`:**
```json
{
  "lint-staged": {
    "*.js": [
      "eslint --fix",
      "git add"
    ]
  }
}
```

---

## 📊 Integração com VS Code

**`.vscode/settings.json`:**
```json
{
  "eslint.enable": true,
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ],
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.workingDirectories": [
    { "mode": "auto" }
  ]
}
```

---

## 🎨 Integração com Prettier

```bash
npm install --save-dev prettier eslint-config-prettier
```

**`.eslintrc.json`:**
```json
{
  "extends": [
    "eslint:recommended",
    "prettier"  // Desabilita regras que conflitam com Prettier
  ],
  "plugins": ["security", "sonarjs", "no-unsanitized"]
}
```

---

## 📋 Checklist de Implementação

### Fase 1: Setup Inicial (1 dia)
- [ ] Instalar plugins apropriados
- [ ] Criar `.eslintrc.json` com regras básicas
- [ ] Adicionar scripts npm
- [ ] Testar em arquivos existentes

### Fase 2: Correções (2-5 dias)
- [ ] Rodar `npm run lint` e revisar erros
- [ ] Corrigir vulnerabilidades críticas (errors)
- [ ] Revisar warnings e corrigir os importantes
- [ ] Adicionar `// eslint-disable-next-line` para falsos positivos

### Fase 3: Automação (1 dia)
- [ ] Configurar pre-commit hook
- [ ] Integrar no CI/CD
- [ ] Adicionar badge de status no README
- [ ] Documentar processo para a equipe

### Fase 4: Manutenção
- [ ] Revisar regras mensalmente
- [ ] Atualizar plugins regularmente
- [ ] Treinar equipe em boas práticas
- [ ] Ajustar severidades conforme necessário

---

## ⚙️ Configuração Avançada

### Ignorar Arquivos

**`.eslintignore`:**
```
node_modules/
dist/
build/
coverage/
*.min.js
vendor/
```

### Configuração por Ambiente

```json
{
  "overrides": [
    {
      "files": ["**/*.test.js"],
      "env": {
        "jest": true
      },
      "rules": {
        "sonarjs/cognitive-complexity": "off"
      }
    },
    {
      "files": ["scripts/**/*.js"],
      "rules": {
        "no-console": "off"
      }
    }
  ]
}
```

---

## 🚨 Tratamento de Falsos Positivos

### Desabilitar linha específica
```javascript
// eslint-disable-next-line security/detect-object-injection
const value = obj[key];
```

### Desabilitar bloco
```javascript
/* eslint-disable security/detect-non-literal-require */
const plugin = require(pluginPath);
/* eslint-enable security/detect-non-literal-require */
```

### Desabilitar arquivo inteiro
```javascript
/* eslint-disable security/detect-eval-with-expression */
// Código do arquivo...
```

---

## 📈 Métricas e Monitoramento

### SonarQube Integration

```bash
npm install --save-dev sonarqube-scanner
```

**`sonar-project.properties`:**
```properties
sonar.projectKey=meu-projeto
sonar.sources=src
sonar.eslint.reportPaths=eslint-report.json
```

### Gerar Relatório

```bash
npm run lint -- -f json -o eslint-report.json
```

---

## 🎓 Treinamento da Equipe

### Recursos para Compartilhar

1. **Este POC** - Use como material de treinamento
2. **OWASP Top 10** - https://owasp.org/www-project-top-ten/
3. **Node.js Security Checklist** - https://github.com/goldbergyoni/nodebestpractices#6-security-best-practices
4. **XSS Prevention Cheat Sheet** - https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html

### Workshop Sugerido (2 horas)

1. **Introdução (15 min)** - Por que segurança importa
2. **Demo POC (30 min)** - Mostrar vulnerabilidades detectadas
3. **Hands-on (45 min)** - Time corrige vulnerabilidades em código de exemplo
4. **Integração (20 min)** - Como usar no dia a dia
5. **Q&A (10 min)** - Dúvidas e discussão

---

## 🔍 Troubleshooting

### Erro: "Rule was not found"
```bash
# Reinstale os plugins
rm -rf node_modules package-lock.json
npm install
```

### Performance lenta
```json
{
  "cache": true,
  "cacheLocation": ".eslintcache"
}
```

### Muitos warnings
```javascript
// Comece com "off" e aumente gradualmente
"security/detect-object-injection": "off"
```

---

## 📞 Suporte

- **Issues ESLint:** https://github.com/eslint/eslint/issues
- **Security Plugin:** https://github.com/eslint-community/eslint-plugin-security/issues
- **SonarJS:** https://github.com/SonarSource/eslint-plugin-sonarjs/issues
- **No Unsanitized:** https://github.com/mozilla/eslint-plugin-no-unsanitized/issues

---

## ✅ Próximo Passo

Escolha a configuração apropriada acima, copie para seu projeto e execute:

```bash
npm install
npm run lint
```

Depois, comece a corrigir os problemas detectados! 🚀
