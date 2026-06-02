const express = require('express');
const router = express.Router();

// IMPORTANTE: Importa o cliente do Supabase que está na sua pasta routes
const supabase = require('./supabaseClient'); 

// Rota de Login (Atualizada para validar de verdade com o Supabase)
router.post('/login', async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ mensagem: 'E-mail e senha são obrigatórios.' });
    }

    try {
        // Tenta autenticar o usuário com e-mail e senha no Supabase
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        // Se o e-mail não existir ou a senha estiver incorreta
        if (error) {
            return res.status(401).json({ mensagem: 'E-mail ou senha incorretos.' });
        }

        // Se deu tudo certo, devolve o sucesso e os dados da sessão
        return res.status(200).json({
            sucesso: true,
            mensagem: 'Login efetuado com sucesso!',
            session: data.session,
            user: data.user
        });

    } catch (error) {
        // Evita que a requisição trave em caso de erro crítico inesperado
        return res.status(500).json({ mensagem: 'Erro interno no servidor de autenticação.' });
    }
});

// Rota de Cadastro corrigida para salvar no Supabase
router.post('/cadastro', async (req, res, next) => {
    const { email, password } = req.body;

    // Validação básica de segurança no servidor
    if (!email || !password) {
        return res.status(400).json({ mensagem: 'E-mail e senha são obrigatórios.' });
    }

    try {
        // Chame a API real do Supabase para criar o usuário na aba Authentication
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        });

        // Se o Supabase retornar algum erro (ex: e-mail inválido ou já cadastrado)
        if (error) {
            return res.status(400).json({ mensagem: error.message });
        }

        // Se deu certo, responde com o status 201 para o seu cadastro.js
        return res.status(201).json({ 
            sucesso: true, 
            mensagem: 'Usuário cadastrado com sucesso!',
            usuario: data.user 
        });

    } catch (error) {
        // Envia qualquer outro erro inesperado para o errorHandler.js do seu servidor
        next(error); 
    }
});

module.exports = router;