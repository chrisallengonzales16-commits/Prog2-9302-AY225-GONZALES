/**
 * MP09 – Display Dataset Statistics
 * Author: Gonzales, Chris Allen S.
 * Course: BSCSIT 1203L 9302-AY225 (Programming 2 - Lab)


 *
 * Description:
 *   Reads the Pearson VUE exam results CSV file and displays statistical
 *   information including total records, pass/fail counts, score statistics
 *   (min, max, average), participant type breakdown, and exam frequency.
 *
 * Program Logic:
 *   1. Ask the user for the CSV file path via readline
 *   2. Read the file using Node.js fs module
 *   3. Skip metadata rows until the real header row ("Candidate") is found
 *   4. Parse each data row using a quote-aware CSV parser
 *   5. Accumulate statistics and display a formatted report
 *
 * Run with: node MP09_DatasetStatistics.js
 */

// ---- Node.js built-in modules ----
const fs       = require('fs');       // File system module for reading files
const readline = require('readline'); // Module for reading user input from terminal

// Create a readline interface connected to standard input/output
const rl = readline.createInterface({
    input:  process.stdin,
    output: process.stdout
});

// Prompt the user to enter the file path
rl.question('Enter the CSV dataset file path: ', (filePath) => {
    rl.close();  // Close the input prompt after receiving the answer

    // ---------------------------------------------------------------
    // Read the file
    // ---------------------------------------------------------------
    let fileContent;

    try {
        // Read the entire file as a UTF-8 string
        fileContent = fs.readFileSync(filePath.trim(), 'utf8');
    } catch (err) {
        console.log('Error: File not found or could not be read – ' + filePath);
        return;
    }

    // Split file into individual lines (handle both Windows \r\n and Unix \n)
    const lines = fileContent.split(/\r?\n/);

    // ---------------------------------------------------------------
    // Statistics variables
    // ---------------------------------------------------------------
    let totalRecords = 0;   // Total valid data rows
    let passCount    = 0;   // Rows where Result = PASS
    let failCount    = 0;   // Rows where Result = FAIL
    let studentCount = 0;   // Rows where Type = Student
    let facultyCount = 0;   // Rows where Type = Faculty
    let nteCount     = 0;   // Rows where Type = NTE
    let scoreSum     = 0;   // Sum of all numeric scores
    let scoreMin     = Infinity;    // Lowest score found
    let scoreMax     = -Infinity;   // Highest score found

    // Object used as a frequency map: { examTitle: count }
    const examCount = {};

    // ---------------------------------------------------------------
    // Parse lines
    // ---------------------------------------------------------------
    let headerFound = false;  // Flag: have we passed the header row yet?

    for (const line of lines) {

        // Skip metadata lines until the real header row is found
        // The header row contains the word "Candidate"
        if (!headerFound) {
            if (line.includes('Candidate')) {
                headerFound = true;
            }
            continue;  // Skip this line (metadata or header itself)
        }

        // Skip blank lines
        if (line.trim() === '') continue;

        // Parse the CSV line into an array of string fields
        const fields = parseCSVLine(line);

        // Must have at least 8 columns to be a valid data row
        if (fields.length < 8) continue;

        // Column index reference:
        // 0 = Candidate, 1 = Type,   2 = Column1(blank),
        // 3 = Exam,      4 = Language, 5 = Date,
        // 6 = Score,     7 = Result,   8 = Time Used
        const candidate = fields[0].trim();
        const type      = fields[1].trim();
        const exam      = fields[3].trim();
        const scoreStr  = fields[6].trim();
        const result    = fields[7].trim();

        // Skip rows with no candidate name (footer rows)
        if (candidate === '') continue;

        totalRecords++;

        // Count pass / fail
        if      (result.toUpperCase() === 'PASS') passCount++;
        else if (result.toUpperCase() === 'FAIL') failCount++;

        // Count by participant type
        const typeLower = type.toLowerCase();
        if      (typeLower === 'student') studentCount++;
        else if (typeLower === 'faculty') facultyCount++;
        else if (typeLower === 'nte')     nteCount++;

        // Accumulate score statistics
        const score = parseFloat(scoreStr);
        if (!isNaN(score)) {
            scoreSum += score;
            if (score < scoreMin) scoreMin = score;
            if (score > scoreMax) scoreMax = score;
        }

        // Count exam frequency
        examCount[exam] = (examCount[exam] || 0) + 1;
    }

    // Guard: no records found
    if (totalRecords === 0) {
        console.log('No valid data records found in the file.');
        return;
    }

    // Compute derived statistics
    const scoreAvg = scoreSum / totalRecords;
    const passRate = (passCount / totalRecords * 100).toFixed(2);

    // Sort exams by count descending
    const sortedExams = Object.entries(examCount)
        .sort((a, b) => b[1] - a[1]);  // Sort by count, highest first

    // ---------------------------------------------------------------
    // Output – Formatted Statistics Report
    // ---------------------------------------------------------------
    console.log();
    console.log('╔══════════════════════════════════════════════════╗');
    console.log('║        MP09 – DATASET STATISTICS REPORT          ║');
    console.log('╚══════════════════════════════════════════════════╝');
    console.log('  Source : Pearson VUE – UPHSD Molino Exam Results');
    console.log('──────────────────────────────────────────────────');

    console.log(`  Total Records         : ${totalRecords}`);
    console.log(`  Total PASS            : ${passCount}`);
    console.log(`  Total FAIL            : ${failCount}`);
    console.log(`  Pass Rate             : ${passRate}%`);
    console.log('──────────────────────────────────────────────────');

    console.log('  Participant Type Breakdown:');
    console.log(`    Students            : ${studentCount}`);
    console.log(`    Faculty             : ${facultyCount}`);
    console.log(`    NTE                 : ${nteCount}`);
    console.log('──────────────────────────────────────────────────');

    console.log('  Score Statistics:');
    console.log(`    Minimum Score       : ${scoreMin}`);
    console.log(`    Maximum Score       : ${scoreMax}`);
    console.log(`    Average Score       : ${scoreAvg.toFixed(2)}`);
    console.log(`    Total Score Sum     : ${scoreSum}`);
    console.log('──────────────────────────────────────────────────');

    console.log('  Exam Frequency (sorted by count, descending):');
    for (const [examTitle, count] of sortedExams) {
        // Pad exam title to 54 characters for alignment
        const padded = examTitle.padEnd(54, ' ');
        console.log(`    ${padded} : ${count}`);
    }

    console.log('══════════════════════════════════════════════════');
    console.log('               End of Statistics                  ');
    console.log('══════════════════════════════════════════════════');
});

// ---------------------------------------------------------------
// Helper function
// ---------------------------------------------------------------

/**
 * parseCSVLine – Parses a single CSV line into an array of string fields.
 *
 * Handles candidate names like "LastName,FirstName" (quoted commas).
 * Characters inside double-quotes are treated as one field even if
 * they contain commas.
 *
 * @param {string} line  - A single raw line from the CSV file
 * @returns {string[]}   - Array of string field values
 */
function parseCSVLine(line) {
    const fields = [];       // Array to collect parsed fields
    let current  = '';       // Accumulates characters for the current field
    let inQuotes = false;    // Whether we are currently inside a quoted section

    for (const char of line) {
        if (char === '"') {
            inQuotes = !inQuotes;  // Toggle quote mode on/off
        } else if (char === ',' && !inQuotes) {
            fields.push(current);  // End of a field; save it
            current = '';          // Reset for the next field
        } else {
            current += char;       // Append character to current field
        }
    }

    fields.push(current);  // Push the last field (no trailing comma)
    return fields;
}
