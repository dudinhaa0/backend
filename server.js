const express = require('express');
const cors = require('cors');
require('dotenv').config();

// ✅ Importações corrigidas vindo da pasta middlewares
const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Middlewares obrigatórios antes das rotas!
app.use(cors());
app.use(express.json()); 
app.use(logger);

// Rota raiz para confirmar que o servidor está no ar
app.get('/', (req, res) => {
    res.send('B7STORE BACKEND ONLINE. Use /api/produtos, /api/categorias ou /api/pedidos');
});

// Declarando as rotas de cada arquivo
app.use('/api/produtos', require('./routes/produtos'));
app.use('/api/categorias', require('./routes/categoria'));
app.use('/api/pedidos', require('./routes/pedidos'));

// Middleware de Erro Global (DEVE SER O ÚLTIMO)
app.use(errorHandler);

const PORTA = process.env.PORT || 3000;
app.listen(PORTA, () => {
    console.log(`🛍️  B7STORE BACKEND ONLINE: http://localhost:${PORTA}`);
});