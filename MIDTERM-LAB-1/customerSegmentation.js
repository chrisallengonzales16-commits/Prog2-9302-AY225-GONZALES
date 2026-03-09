'use strict';

const fs       = require('fs');
const path     = require('path');
const readline = require('readline');

// ── Readline interface ────────────────────────────────────────────────────────
const rl = readline.createInterface({
    input:  process.stdin,
    output: process.stdout,
});

// ── DataRecord class (mirrors Java counterpart) ───────────────────────────────
class DataRecord {
    constructor(publisher, totalSales) {
        this.publisher  = publisher;
        this.totalSales = totalSales;           // in millions
        this.purchases  = totalSales * 1000;    // convert → thousands
    }

    getSegment() {
        if (this.purchases > 100000)      return 'Platinum';
        if (this.purchases >= 50000)      return 'Gold';
        if (this.purchases >= 10000)      return 'Silver';
        return 'Bronze';
    }

    toString() {
        return (
            this.publisher.padEnd(40) +
            ` | Sales: ${this.totalSales.toFixed(2).padStart(10)} M` +
            ` | Purchases: ${this.purchases.toFixed(0).padStart(12)}` +
            ` | Segment: ${this.getSegment()}`
        );
    }
}

// ── Utility: parse a CSV line respecting quoted fields ───────────────────────
function parseCsvLine(line) {
    const result = [];
    let current  = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
        const ch = line[i];
        if (ch === '"') {
            inQuotes = !inQuotes;
        } else if (ch === ',' && !inQuotes) {
            result.push(current.trim());
            current = '';
        } else {
            current += ch;
        }
    }
    result.push(current.trim());
    return result;
}

// ── Core processing function ─────────────────────────────────────────────────
function processFile(filePath) {
    let rawData;

    try {
        rawData = fs.readFileSync(filePath, 'utf8');
    } catch (err) {
        console.error(`Error reading file: ${err.message}`);
        rl.close();
        return;
    }

    const lines      = rawData.split(/\r?\n/);
    const publisherSales = {};
    let linesRead    = 0;
    let parseErrors  = 0;

    // Skip header (index 0)
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        try {
            const cols      = parseCsvLine(line);
            if (cols.length < 8) { parseErrors++; continue; }

            const publisher = cols[4];
            const salesRaw  = cols[7];

            if (!publisher || !salesRaw) { parseErrors++; continue; }

            const sales = parseFloat(salesRaw);
            if (isNaN(sales))            { parseErrors++; continue; }

            publisherSales[publisher] = (publisherSales[publisher] || 0) + sales;
            linesRead++;
        } catch {
            parseErrors++;
        }
    }

    // Build DataRecord objects and segment
    const segments = { Platinum: [], Gold: [], Silver: [], Bronze: [] };

    for (const [publisher, totalSales] of Object.entries(publisherSales)) {
        const record = new DataRecord(publisher, totalSales);
        segments[record.getSegment()].push(record);
    }

    // Sort each segment by sales descending
    for (const seg of Object.values(segments)) {
        seg.sort((a, b) => b.totalSales - a.totalSales);
    }

    // ── Display results ───────────────────────────────────────────────────────
    const border  = '='.repeat(100);
    const divider = '-'.repeat(100);

    console.log('\n' + border);
    console.log('  CUSTOMER SEGMENTATION REPORT — Video Game Sales 2024');
    console.log(`  Dataset: ${path.basename(filePath)}  |  Records Processed: ${linesRead}  |  Parse Errors: ${parseErrors}`);
    console.log(border);
    console.log(`  ${'SEGMENT'.padEnd(12)} | ${'COUNT'.padEnd(8)} | THRESHOLD (purchases)`);
    console.log(divider);
    console.log(`  ${'Platinum'.padEnd(12)} | ${String(segments.Platinum.length).padEnd(8)} | > 100,000`);
    console.log(`  ${'Gold'.padEnd(12)} | ${String(segments.Gold.length).padEnd(8)} | 50,000 – 100,000`);
    console.log(`  ${'Silver'.padEnd(12)} | ${String(segments.Silver.length).padEnd(8)} | 10,000 – 49,999`);
    console.log(`  ${'Bronze'.padEnd(12)} | ${String(segments.Bronze.length).padEnd(8)} | < 10,000`);
    console.log(border);

    for (const seg of ['Platinum', 'Gold', 'Silver', 'Bronze']) {
        const group = segments[seg];
        console.log(`\n  ┌─ ${seg.toUpperCase()} SEGMENT (${group.length} publishers)`);
        console.log('  ' + divider);
        if (group.length === 0) {
            console.log('  │  (no publishers in this segment)');
        } else {
            group.forEach(r => console.log('  │  ' + r.toString()));
        }
        console.log('  └' + '─'.repeat(99));
    }

    console.log('\n  END OF REPORT');
    console.log(border + '\n');

    rl.close();
}

// ── File path input & validation loop ────────────────────────────────────────
function askFilePath() {
    rl.question('Enter dataset file path: ', function (inputPath) {
        const trimmed = inputPath.trim();

        if (!fs.existsSync(trimmed)) {
            console.log('Invalid file path. File does not exist. Please try again.\n');
            askFilePath();
            return;
        }

        const stat = fs.statSync(trimmed);
        if (!stat.isFile()) {
            console.log('Path is not a file. Please provide a CSV file path.\n');
            askFilePath();
            return;
        }

        if (!trimmed.toLowerCase().endsWith('.csv')) {
            console.log('File does not appear to be a CSV. Please provide a .csv file.\n');
            askFilePath();
            return;
        }

        console.log('File found. Processing...\n');
        processFile(trimmed);
    });
}

// ── Entry point ───────────────────────────────────────────────────────────────
console.log('='.repeat(100));
console.log('  PROGRAMMING 2 – Customer Segmentation Machine Problem');
console.log('  University of Perpetual Help System DALTA – Molino Campus');
console.log('='.repeat(100));
askFilePath();
