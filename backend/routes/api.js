const express = require('express');
const router = express.Router();
const db = require('../db/database');

// GET /api/products
router.get('/products', (req, res) => {
    const { search, category, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    let query = 'SELECT * FROM products WHERE 1=1';
    let countQuery = 'SELECT COUNT(*) as count FROM products WHERE 1=1';
    const params = [];

    if (search) {
        query += ' AND (name LIKE ? OR short_desc LIKE ?)';
        countQuery += ' AND (name LIKE ? OR short_desc LIKE ?)';
        params.push(`%${search}%`, `%${search}%`);
    }

    if (category) {
        query += ' AND category = ?';
        countQuery += ' AND category = ?';
        params.push(category);
    }

    query += ' LIMIT ? OFFSET ?';
    const queryParams = [...params, limit, offset];

    db.get(countQuery, params, (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        const total = row.count;

        db.all(query, queryParams, (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({
                products: rows,
                total,
                page: parseInt(page),
                totalPages: Math.ceil(total / limit)
            });
        });
    });
});

// GET /api/products/:id
router.get('/products/:id', (req, res) => {
    const { id } = req.params;
    db.get('SELECT * FROM products WHERE id = ?', [id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: 'Product not found' });
        res.json(row);
    });
});

// POST /api/enquiries
router.post('/enquiries', (req, res) => {
    const { product_id, name, email, phone, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Name, email, and message are required.' });
    }

    const stmt = db.prepare('INSERT INTO enquiries (product_id, name, email, phone, message) VALUES (?, ?, ?, ?, ?)');
    stmt.run(product_id || null, name, email, phone, message, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: this.lastID, message: 'Enquiry submitted successfully.' });
    });
    stmt.finalize();
});

// GET /api/enquiries
router.get('/enquiries', (req, res) => {
    db.all('SELECT * FROM enquiries ORDER BY created_at DESC', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

module.exports = router;
