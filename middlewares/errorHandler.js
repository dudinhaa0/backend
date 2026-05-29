// =============================================================
// middlewares/errorHandler.js — Centralizador de Erros Global
// =============================================================
// O que este Middleware faz?
//   Ele é a nossa "Rede de Segurança". Se qualquer rota da B7Store 
//   der um erro catastrófico ou se o Supabase falhar, o erro é jogado 
//   para cá via next(err).
//
//   Evita que o servidor caia (crash) e esconde detalhes técnicos 
//   assustadores do cliente final, devolvendo um JSON limpo com erro 500.
// =============================================================

const errorHandlerMiddleware = (err, req, res, next) => {
    // Mostra o erro real com detalhes vermelhos e completos no terminal do desenvolvedor
    console.error('💥 [ERRO NA API DA B7STORE]:', err.message || err);

    // Identifica se o erro veio diretamente de alguma restrição do Supabase
    if (err.code) {
        return res.status(400).json({
            sucesso: false,
            mensagem: 'Erro de validação ou restrição no Banco de Dados (Supabase).',
            codigo: err.code,
            detalhe: err.details || null
        });
    }

    // Erros genéricos de código (ex: propriedades nulas, chamadas inválidas)
    res.status(500).json({
        sucesso: false,
        mensagem: 'Ocorreu um erro interno no servidor da B7Store.',
        erro: err.message || 'Erro desconhecido'
    });
};

module.exports = errorHandlerMiddleware;