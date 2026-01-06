# 🔒 POC - Plugins de Segurança ESLint + TypeScript

Esta POC demonstra 4 plugins essenciais do ESLint focados em segurança para projetos **TypeScript/JavaScript**.

## 📦 Plugins Incluídos

### 1. **eslint-plugin-security** 
Padrão ouro para segurança em Node.js, detecta:
- ❌ Uso de `eval()`
- ❌ RegEx que causam DoS (ReDoS)
- ❌ Directory Traversal em paths de arquivos
- ❌ Command Injection
- ❌ Timing attacks

**Ideal para:** Projetos Backend (Node.js)

### 2. **eslint-plugin-sonarjs**
Focado em complexidade cognitiva e bugs lógicos:
- ❌ Funções muito complexas
- ❌ Código duplicado
- ❌ Condições idênticas
- ❌ Branches duplicados

**Ideal para:** Qualquer projeto TypeScript/JavaScript

### 3. **eslint-plugin-no-unsanitized**
Plugin da Mozilla para prevenir XSS:
- ❌ `innerHTML` sem sanitização
- ❌ `insertAdjacentHTML` com dados não confiáveis
- ❌ `document.write` com input do usuário

**Ideal para:** Projetos Frontend (React, Vue, Vanilla JS)

### 4. **eslint-plugin-security-node**
Versão moderna focada em APIs:
- ❌ Cookies inseguros
- ❌ Sessions mal configuradas
- ❌ Desabilitar verificação SSL
- ❌ `Math.random()` para tokens

**Ideal para:** APIs Express/Fastify

## 🚀 Como Usar

### 1. Instalar dependências

```bash
npm install
```

### 2. Verificar tipos TypeScript (opcional)

```bash
npm run type-check
```

### 3. Executar linting em todos os arquivos

```bash
npm run lint
```

### 4. Executar linting por categoria

```bash
# Testar vulnerabilidades backend (eslint-plugin-security)
npm run lint:backend

# Testar código complexo (eslint-plugin-sonarjs)
npm run lint:complex

# Testar vulnerabilidades XSS (eslint-plugin-no-unsanitized)
npm run lint:frontend

# Testar segurança de APIs (eslint-plugin-security-node)
npm run lint:api
```

## 📁 Estrutura dos Exemplos

```
examples/
├── backend-vulnerabilities.ts  # eslint-plugin-security
├── api-security.ts             # eslint-plugin-security-node
├── complex-code.ts             # eslint-plugin-sonarjs
├── frontend-xss.ts             # eslint-plugin-no-unsanitized
└── SOLUCOES-SEGURAS.ts         # ✅ Como corrigir as vulnerabilidades
```

> **💡 Dica:** O arquivo `SOLUCOES-SEGURAS.ts` mostra como implementar CORRETAMENTE cada funcionalidade detectada como vulnerável nos outros arquivos.

## 🎯 Principais Vulnerabilidades Demonstradas

### Backend (backend-vulnerabilities.ts)

| Vulnerabilidade | Risco | Detecção |
|----------------|-------|----------|
| `eval()` | Execução de código arbitrário | `security/detect-eval-with-expression` |
| ReDoS | Denial of Service | `security/detect-unsafe-regex` |
| Directory Traversal | Acesso a arquivos sensíveis | `security/detect-non-literal-fs-filename` |
| Command Injection | Execução de comandos maliciosos | `security/detect-child-process` |
| Object Injection | Prototype Pollution | `security/detect-object-injection` |

### API Security (api-security.ts)

| Vulnerabilidade | Risco | Detecção |
|----------------|-------|----------|
| Cookie inseguro | Roubo de sessão/XSS | `security-node/detect-insecure-cookie` |
| `Math.random()` | Tokens previsíveis | `security-node/detect-insecure-randomness` |
| SSL desabilitado | Man-in-the-Middle | `security-node/detect-option-rejectunauthorized` |
| Buffer inseguro | Vazamento de memória | `security-node/detect-buffer-unsafe-allocation` |

### Código Complexo (complex-code.ts)

| Problema | Impacto | Detecção |
|----------|---------|----------|
| Alta complexidade | Bugs escondidos | `sonarjs/cognitive-complexity` |
| Código duplicado | Manutenção difícil | `sonarjs/no-identical-functions` |
| Strings duplicadas | Magic strings | `sonarjs/no-duplicate-string` |
| Condições idênticas | Código morto | `sonarjs/no-identical-conditions` |

### Frontend XSS (frontend-xss.ts)

| Vulnerabilidade | Risco | Detecção |
|----------------|-------|----------|
| `innerHTML` | XSS | `no-unsanitized/property` |
| `insertAdjacentHTML` | XSS | `no-unsanitized/method` |
| `document.write` | XSS | `no-unsanitized/method` |
| Template literals | XSS | `no-unsanitized/property` |

## ✅ Boas Práticas Demonstradas

### Prevenção de XSS
```javascript
// ❌ INSEGURO
div.innerHTML = userInput;

// ✅ SEGURO
div.textContent = userInput;
// ou
div.innerHTML = DOMPurify.sanitize(userInput);
```

### Cookies Seguros
```javascript
// ❌ INSEGURO
res.cookie('session', value, { httpOnly: false });

// ✅ SEGURO
res.cookie('session', value, {
  httpOnly: true,
  secure: true,
  sameSite: 'strict'
});
```

### Random Seguro
```javascript
// ❌ INSEGURO
Math.random().toString(36);

// ✅ SEGURO
crypto.randomBytes(16).toString('hex');
```

## 📊 Resultados Esperados

Ao executar `npm run lint`, você deve ver:

- **Errors:** Vulnerabilidades críticas que DEVEM ser corrigidas
- **Warnings:** Problemas que DEVEM ser revisados
- Cada erro mostra:
  - Arquivo e linha
  - Nome da regra violada
  - Descrição do problema

## 🔧 Configuração

O arquivo [.eslintrc.json](.eslintrc.json) contém todas as regras ativadas. Você pode:

- Ajustar severidade: `"error"`, `"warn"`, `"off"`
- Personalizar limites (ex: complexidade cognitiva)
- Adicionar exceções quando necessário

## 📚 Recursos Adicionais

- [eslint-plugin-security](https://github.com/eslint-community/eslint-plugin-security)
- [eslint-plugin-sonarjs](https://github.com/SonarSource/eslint-plugin-sonarjs)
- [eslint-plugin-no-unsanitized](https://github.com/mozilla/eslint-plugin-no-unsanitized)
- [eslint-plugin-security-node](https://www.npmjs.com/package/eslint-plugin-security-node)

## ⚠️ Importante

**ATENÇÃO:** Os arquivos de exemplo contêm código INTENCIONALMENTE INSEGURO para demonstração. **NUNCA** use esses padrões em código de produção!

## � Por Que TypeScript?

Esta POC usa **TypeScript** para demonstrar que os plugins de segurança funcionam perfeitamente com projetos TypeScript modernos. Benefícios:

- ✅ **Type Safety** - TypeScript detecta erros de tipo em tempo de desenvolvimento
- ✅ **Melhor IntelliSense** - Autocomplete e documentação inline
- ✅ **Interfaces & Types** - Define contratos claros para dados
- ✅ **Compatibilidade** - Todos os plugins ESLint funcionam com TypeScript via `@typescript-eslint`
- ✅ **Produção-Ready** - A maioria dos projetos modernos usa TypeScript

### Configuração TypeScript

A POC inclui:
- **`tsconfig.json`** - Configuração do compilador TypeScript com strict mode
- **`@typescript-eslint/parser`** - Parser para ESLint entender TypeScript
- **`@typescript-eslint/eslint-plugin`** - Regras específicas de TypeScript
- **Tipagens completas** - Todos os exemplos têm tipos explícitos

## �🎓 Próximos Passos

1. Execute `npm run lint` e analise os erros
2. Estude cada vulnerabilidade detectada
3. Compare com as alternativas seguras nos comentários
4. Integre esses plugins em seus projetos reais
5. Configure CI/CD para rodar ESLint automaticamente

## 📝 Licença

MIT - Sinta-se livre para usar em seus projetos!
