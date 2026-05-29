const express = require('express');
const router = express.Router();
// ✅ Aponta corretamente para o arquivo de conexão do Supabase
const supabase = require('../data/supabase');

// GET /api/pedidos - Listar pedidos
router.get('/', async (req, res, next) => {
    try {
        const { data, error } = await supabase
            .from('pedidos')
            .select('*')
            .order('id', { ascending: false });

        if (error) throw error;
        res.json(data);
    } catch (err) {
        next(err);
    }
});

module.exports = router;