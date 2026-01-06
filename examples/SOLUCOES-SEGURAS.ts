/**
 * SOLUÇÕES SEGURAS - Como corrigir as vulnerabilidades detectadas
 * 
 * Este arquivo mostra a forma CORRETA de implementar as funcionalidades
 */

const fs = require('fs');
const { exec } = require('child_process');
const crypto = require('crypto');
const path = require('path');

// ✅ SOLUÇÃO: Evite eval(), use alternativas seguras
function calculateUserInputSafe(operation, a, b) {
  // Use um objeto com operações permitidas
  const operations = {
    'add': (x, y) => x + y,
    'subtract': (x, y) => x - y,
    'multiply': (x, y) => x * y,
    'divide': (x, y) => x / y
  };
  
  if (operations[operation]) {
    return operations[operation](a, b);
  }
  throw new Error('Operação inválida');
}

// ✅ SOLUÇÃO: Use regex simples ou bibliotecas validadas
function validateEmailSafe(email) {
  // Regex simples e segura
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
  
  // Ou use uma biblioteca como validator.js:
  // const validator = require('validator');
  // return validator.isEmail(email);
}

// ✅ SOLUÇÃO: Valide e sanitize paths
function readUserFileSafe(filename) {
  // Define um diretório base permitido
  const baseDir = '/var/uploads';
  
  // Normalize e valide o path
  const safePath = path.normalize(path.join(baseDir, filename));
  
  // Garanta que o path está dentro do diretório permitido
  if (!safePath.startsWith(baseDir)) {
    throw new Error('Acesso negado');
  }
  
  // Verifique se o arquivo existe
  if (!fs.existsSync(safePath)) {
    throw new Error('Arquivo não encontrado');
  }
  
  return fs.readFileSync(safePath, 'utf8');
}

// ✅ SOLUÇÃO: Use execFile com array de argumentos
function pingServerSafe(address) {
  // Valide o input primeiro
  if (!/^[a-zA-Z0-9.-]+$/.test(address)) {
    throw new Error('Endereço inválido');
  }
  
  // Use execFile ao invés de exec
  const { execFile } = require('child_process');
  
  // Argumentos separados (não interpolados)
  execFile('ping', ['-c', '4', address], (error, stdout, stderr) => {
    if (error) {
      console.error('Erro:', error);
      return;
    }
    console.log(stdout);
  });
}

// ✅ SOLUÇÃO: Use whitelist de módulos permitidos
function loadPluginSafe(pluginName) {
  // Lista de plugins permitidos
  const allowedPlugins = ['plugin-a', 'plugin-b', 'plugin-c'];
  
  if (!allowedPlugins.includes(pluginName)) {
    throw new Error('Plugin não permitido');
  }
  
  return require(`./plugins/${pluginName}`);
}

// ✅ SOLUÇÃO: Valide chaves antes de acessar
function getUserDataSafe(userData, key) {
  // Lista de campos permitidos
  const allowedFields = ['name', 'email', 'age', 'address'];
  
  if (!allowedFields.includes(key)) {
    throw new Error('Campo não permitido');
  }
  
  // Use hasOwnProperty para evitar prototype pollution
  if (Object.prototype.hasOwnProperty.call(userData, key)) {
    return userData[key];
  }
  
  return undefined;
}

// ✅ SOLUÇÃO: Use crypto.randomBytes para segurança
function generateTokenSafe() {
  // Use randomBytes (não pseudoRandomBytes)
  return crypto.randomBytes(32).toString('hex');
}

// ✅ SOLUÇÃO: Use timing-safe comparison
function comparePasswordsSafe(userPassword, correctPassword) {
  // Converta para Buffers
  const userBuf = Buffer.from(userPassword, 'utf8');
  const correctBuf = Buffer.from(correctPassword, 'utf8');
  
  // Use timingSafeEqual
  try {
    return userBuf.length === correctBuf.length && 
           crypto.timingSafeEqual(userBuf, correctBuf);
  } catch (e) {
    return false;
  }
}

// ✅ SOLUÇÃO: Configure cookies de forma segura
function setCookieSafe(res, sessionId) {
  res.cookie('sessionId', sessionId, {
    httpOnly: true,      // ✅ Previne acesso via JavaScript
    secure: true,        // ✅ Apenas HTTPS
    sameSite: 'strict',  // ✅ Previne CSRF
    maxAge: 3600000,     // 1 hora
    signed: true         // ✅ Assina o cookie
  });
}

// ✅ SOLUÇÃO: Configure session de forma segura
function setupSessionSafe(app, sessionMiddleware) {
  app.use(sessionMiddleware({
    name: 'sid',                    // ✅ Nome customizado
    secret: process.env.SESSION_SECRET, // ✅ Use variável de ambiente
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: true,                 // ✅ Em produção, use HTTPS
      sameSite: 'strict',
      maxAge: 3600000
    },
    store: null // Use um store adequado (Redis, MongoDB, etc)
  }));
}

// ✅ SOLUÇÃO: Use Buffer.alloc ou Buffer.from
function createSafeBuffer(size) {
  // Buffer.alloc zera a memória
  return Buffer.alloc(size);
  
  // Ou use Buffer.from para criar de uma string/array
  // return Buffer.from('data', 'utf8');
}

// ✅ SOLUÇÃO: Sanitize headers
function setHeaderSafe(res, userInput) {
  // Remova caracteres CRLF
  const sanitized = userInput.replace(/[\r\n]/g, '');
  res.setHeader('X-User-Data', sanitized);
}

// ✅ SOLUÇÃO: Use bibliotecas de validação com regex seguras
function validateInputSafe(input) {
  // Regex simples sem backtracking
  const regex = /^[a-z]+$/i;
  return regex.test(input);
  
  // Ou use validator.js, joi, yup, etc.
}

// ✅ SOLUÇÃO: Simplifique código complexo
function processOrderSafe(order, user, discount, isVIP) {
  // Divida em funções menores
  let total = calculateItemsTotal(order.items);
  
  if (discount) {
    total = applyDiscount(total, discount);
  }
  
  if (isVIP) {
    total = applyVIPBenefits(total, user, order);
  }
  
  return total;
}

function calculateItemsTotal(items) {
  if (!items || items.length === 0) return 0;
  
  return items
    .filter(item => item.inStock || item.allowBackorder)
    .reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

function applyDiscount(total, discount) {
  if (discount.type === 'percentage' && discount.value > 0 && discount.value <= 100) {
    return total * (1 - discount.value / 100);
  }
  if (discount.type === 'fixed') {
    return Math.max(0, total - discount.value);
  }
  return total;
}

function applyVIPBenefits(total, user, order) {
  if (total > 1000) {
    total *= 0.9; // 10% de desconto VIP
  }
  
  if (user.loyaltyPoints > 500) {
    total -= 50;
  }
  
  if (order.isExpress) {
    total += 20;
  }
  
  return total;
}

// ✅ SOLUÇÃO: Use constantes ao invés de strings duplicadas
const USER_NOT_FOUND = 'User not found';

function showUserMessagesSafe() {
  console.log(USER_NOT_FOUND);
  alert(USER_NOT_FOUND);
  throw new Error(USER_NOT_FOUND);
  document.title = USER_NOT_FOUND;
}

// ✅ SOLUÇÃO: Extraia funções duplicadas
function calculateTax(amount, rate = 0.15) {
  const tax = amount * rate;
  const total = amount + tax;
  return Math.round(total * 100) / 100;
}

// ✅ SOLUÇÃO: Combine condições
function checkUserAccessSafe(user) {
  // Use && ao invés de if aninhados
  return user && user.isActive;
}

// ✅ SOLUÇÃO: Use if-else ao invés de switch pequeno
function getStatusMessageSafe(status) {
  return status === 'active' ? 'User is active' : 'Unknown status';
}

// ✅ SOLUÇÃO: Retorne diretamente
function calculateTotalSafe(price, quantity) {
  return price * quantity;
}

// ✅ SOLUÇÃO FRONTEND: Use textContent
function displayUserCommentSafe(comment) {
  const div = document.getElementById('comment-section');
  div.textContent = comment; // ✅ Seguro - não interpreta HTML
}

// ✅ SOLUÇÃO FRONTEND: Crie elementos programaticamente
function createUserCardSafe(userName, userBio) {
  const card = document.createElement('div');
  card.className = 'user-card';
  
  const title = document.createElement('h3');
  title.textContent = userName; // ✅ Seguro
  
  const bio = document.createElement('p');
  bio.textContent = userBio; // ✅ Seguro
  
  card.appendChild(title);
  card.appendChild(bio);
  
  return card;
}

// ✅ SOLUÇÃO FRONTEND: Use DOMPurify quando precisar de HTML
function displayRichContentSafe(htmlContent) {
  // Instale: npm install dompurify
  // Para Node.js: npm install dompurify jsdom
  
  const createDOMPurify = require('dompurify');
  const { JSDOM } = require('jsdom');
  
  const window = new JSDOM('').window;
  const DOMPurify = createDOMPurify(window);
  
  // Sanitize o HTML
  return DOMPurify.sanitize(htmlContent, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p'],
    ALLOWED_ATTR: ['href']
  });
}

// ✅ SOLUÇÃO: HTTPS request seguro
function makeSecureRequest() {
  const https = require('https');
  
  const options = {
    hostname: 'example.com',
    port: 443,
    path: '/',
    method: 'GET',
    rejectUnauthorized: true // ✅ SEMPRE true em produção
  };
  
  https.request(options, (res) => {
    console.log(res.statusCode);
  });
}

module.exports = {
  calculateUserInputSafe,
  validateEmailSafe,
  readUserFileSafe,
  pingServerSafe,
  loadPluginSafe,
  getUserDataSafe,
  generateTokenSafe,
  comparePasswordsSafe,
  setCookieSafe,
  setupSessionSafe,
  createSafeBuffer,
  setHeaderSafe,
  validateInputSafe,
  processOrderSafe,
  displayUserCommentSafe,
  createUserCardSafe,
  displayRichContentSafe,
  makeSecureRequest
};
