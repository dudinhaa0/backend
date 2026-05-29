// =============================================================
// data/supabase.js — Conexão Centralizada com o Banco de Dados
// =============================================================
// O que este arquivo faz?
//   Ele importa o SDK oficial do Supabase, lê as credenciais secretas
//   do arquivo .env e cria uma instância de conexão ('supabase').
//   
//   Dessa forma, qualquer arquivo de rota (como produtos.js ou categorias.js)
//   só precisa importar este arquivo para ter acesso ao banco de dados,
//   evitando ter que recriar a conexão em vários lugares.
// =============================================================

// ─── 1. Importações das Dependências ─────────────────────────
// '@supabase/supabase-js': Biblioteca oficial para conversar com o banco de dados
const { createClient } = require('@supabase/supabase-js');

// 'dotenv': Garante que o Node consiga ler as variáveis de ambiente criadas no arquivo .env
require('dotenv').config();


// ─── 2. Captura das Variáveis de Ambiente ─────────────────────
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;


// ─── 3. Validação de Segurança ────────────────────────────────
// Verifica se o desenvolvedor esqueceu de configurar o arquivo .env.
// Se faltar alguma chave, o terminal avisa em vermelho antes que o servidor quebre.
if (!supabaseUrl || !supabaseKey) {
    console.log('');
    console.error('❌ [ERRO DE CONFIGURAÇÃO]: SUPABASE_URL ou SUPABASE_KEY não foi encontrado no arquivo .env');
    console.error('📋 Certifique-se de que criou o arquivo .env na raiz do projeto com as credenciais corretas.');
    console.log('');
}


// ─── 4. Inicialização do Cliente Supabase ─────────────────────
// Criamos o objeto que fará os comandos .select(), .insert(), .update(), .delete()
const supabase = createClient(supabaseUrl, supabaseKey);


// ─── 5. Exportação ────────────────────────────────────────────
// Exportamos a conexão pronta para que o routes/produtos.js e outros usem.
module.exports = supabase;