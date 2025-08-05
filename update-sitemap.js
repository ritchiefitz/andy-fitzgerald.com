#!/usr/bin/env node

/**
 * Simple script to update sitemap.xml with current date
 * Run this whenever you update your games or content
 */

const fs = require('fs');
const path = require('path');

const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

const sitemapPath = path.join(__dirname, 'public', 'sitemap.xml');

// Read current sitemap
let sitemap = fs.readFileSync(sitemapPath, 'utf8');

// Update all lastmod dates to current date
sitemap = sitemap.replace(/<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/g, `<lastmod>${currentDate}</lastmod>`);

// Write updated sitemap
fs.writeFileSync(sitemapPath, sitemap);

console.log(`✅ Sitemap updated with date: ${currentDate}`);
console.log(`📍 Updated: ${sitemapPath}`);
