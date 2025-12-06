const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const dbPath = path.resolve(__dirname, process.env.DB_CONNECTION_STRING || './products.sqlite');
const db = new sqlite3.Database(dbPath);

const schemaPath = path.resolve(__dirname, 'schema.sql');
const schema = fs.readFileSync(schemaPath, 'utf8');

const products = [
    {
        name: 'Smartphone X',
        category: 'Electronics',
        short_desc: 'Latest model with high-res camera.',
        long_desc: 'A powerful smartphone featuring a 108MP camera, 5000mAh battery, and a stunning OLED display.',
        price: 999.99,
        image_url: '/images/smartphone-x.png'
    },
    {
        name: 'Laptop Pro',
        category: 'Electronics',
        short_desc: 'High performance laptop for professionals.',
        long_desc: 'Equipped with the latest M-series chip, 32GB RAM, and 1TB SSD. Perfect for development and design.',
        price: 1999.99,
        image_url: '/images/laptop-pro.png'
    },
    {
        name: 'Wireless Headphones',
        category: 'Audio',
        short_desc: 'Noise cancelling over-ear headphones.',
        long_desc: 'Experience pure silence with our top-tier noise cancelling technology. 30 hours of battery life.',
        price: 299.99,
        image_url: '/images/headphones.png'
    },
    {
        name: 'Ergonomic Chair',
        category: 'Furniture',
        short_desc: 'Comfortable chair for long work hours.',
        long_desc: 'Designed for lumbar support and posture correction. Adjustable height and armrests.',
        price: 350.00,
        image_url: '/images/chair.png'
    },
    {
        name: 'Coffee Maker',
        category: 'Kitchen',
        short_desc: 'Brew the perfect cup every time.',
        long_desc: 'Programmable coffee maker with built-in grinder and thermal carafe.',
        price: 120.50,
        image_url: '/images/coffee-maker.png'
    },
    {
        name: 'Running Shoes',
        category: 'Apparel',
        short_desc: 'Lightweight shoes for daily running.',
        long_desc: 'Breathable mesh upper with shock-absorbing soles for maximum comfort.',
        price: 89.99,
        image_url: '/images/shoes.png'
    },
    {
        name: 'Sci-Fi Novel',
        category: 'Books',
        short_desc: 'A journey through the galaxies.',
        long_desc: 'A best-selling novel about interstellar travel and the mystery of time.',
        price: 15.99,
        image_url: '/images/scifi-novel.png'
    },
    {
        name: 'Fantasy Chronicles',
        category: 'Books',
        short_desc: 'Epic battles and magic.',
        long_desc: 'Dive into a world of dragons, wizards, and ancient prophecies in this thrilling fantasy epic.',
        price: 18.99,
        image_url: '/images/fantasy-book.png'
    }
];

db.serialize(() => {
    // Drop tables to clear data
    db.run("DROP TABLE IF EXISTS enquiries");
    db.run("DROP TABLE IF EXISTS products");

    // Run schema
    db.exec(schema, (err) => {
        if (err) {
            console.error('Error running schema:', err);
            return;
        }
        console.log('Schema applied successfully.');

        // Insert products
        const stmt = db.prepare('INSERT INTO products (name, category, short_desc, long_desc, price, image_url) VALUES (?, ?, ?, ?, ?, ?)');

        products.forEach(product => {
            stmt.run(product.name, product.category, product.short_desc, product.long_desc, product.price, product.image_url, (err) => {
                if (err) console.error('Error inserting product:', err);
            });
        });

        stmt.finalize(() => {
            console.log('Seeding complete.');
            db.close();
        });
    });
});
