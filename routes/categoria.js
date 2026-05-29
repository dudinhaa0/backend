const express = require('express');
const router = express.Router();
// ✅ Aponta corretamente para o arquivo de conexão do Supabase
const supabase = require('../data/supabase');

// Listar todas as categorias
router.get('/', async (req, res, next) => {
    try {
        const { data, error } = await supabase
            .from('categorias')
            .select('*')
            .order('id', { ascending: true });

        if (error) throw error;
        res.json(data);
    } catch (err) {
        next(err);
    }
});

module.exports = router;