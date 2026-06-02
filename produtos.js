const express = require('express');
const router = express.Router();
// ✅ Aponta corretamente para o arquivo de conexão do Supabase
const supabase = require('../data/supabase');

// GET /api/produtos - Listar todos os produtos
router.get('/', async (req, res, next) => {
    try {
        const { data, error } = await supabase
            .from('produtos')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        res.json(data);
    } catch (err) {
        next(err);
    }
});

// POST /api/produtos - Cadastrar novo produto
router.post('/', async (req, res, next) => {
    try {
        const { nome, preco, categoria, descricao, imagem_url } = req.body;

        if (!nome || !preco || !categoria) {
            return res.status(400).json({ error: 'Nome, preço e categoria são obrigatórios.' });
        }

        const { data, error } = await supabase
            .from('produtos')
            .insert([{ 
                nome, 
                preco: parseFloat(preco), 
                categoria, 
                descricao: descricao || null, 
                imagem_url: imagem_url || null 
            }])
            .select();

        if (error) throw error;
        res.status(201).json(data[0]);
    } catch (err) {
        next(err);
    }
});

module.exports = router;