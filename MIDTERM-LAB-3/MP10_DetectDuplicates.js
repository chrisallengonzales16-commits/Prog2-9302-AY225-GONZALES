/**
 * MP10 – Detect Duplicate Records
 * Author: Gonzales, Chris Allen S.
 * Course: BSCSIT 1203L 9302-AY225 (Programming 2 - Lab)


 *
 * Description:
 *   Reads the Pearson VUE exam results CSV file and detects duplicate records.
 *   A duplicate is defined as two or more rows that share the same
 *   Candidate name, Exam title, and Exam Date combination.
 *
 * Program Logic:
 *   1. Ask the user for the CSV file path via readline
 *   2. Read the file using Node.js fs module
 *   3. Skip metadata rows until the header row ("Candidate") is found
 *   4. Parse each data row using a quote-aware CSV parser
 *   5. Build a composite key: Candidate + "|" + Exam + "|" + Date
 *   6. Use a Map to group rows by their composite key
 *   7. Report any group that has more than one row (= duplicate)
 *
 * Run with: node MP10_DetectDuplicates.js
 */

// ---- Node.js built-in modules ----
const fs       = require('fs');       // File system: for reading the CSV file
const readline = require('readline'); // For prompting user input in the terminal

// Create a readline interface connected to terminal input/output
const rl = readline.createInterface({
    input:  process.stdin,
    output: process.stdout
});

// Prompt the user to enter the CSV file path
rl.question('Enter the CSV dataset file path: ', (filePath) => {
    rl.close();  // Close the prompt after receiving the input

    // ---------------------------------------------------------------
    // Read the file
    // ---------------------------------------------------------------
    let fileContent;

    try {
        // Read entire file as a UTF-8 string
        fileContent = fs.readFileSync(filePath.trim(), 'utf8');
    } catch (err) {
        console.log('Error: File not found or could not be read – ' + filePath);
        return;
    }

    // Split the file into lines; handle both Windows (\r\n) and Unix (\n) line endings
    const lines = fileContent.split(/\r?\n/);

    // ---------------------------------------------------------------
    // Data containers
    // ---------------------------------------------------------------

    // Map where:
    //   key   = composite string "Candidate|Exam|Date"
    //   value = array of rows (each row is an array of field strings)
    const keyMap = new Map();

    let totalRecords = 0;  // Total valid rows processed
    let headerFound  = false;  // Flag: true once we've passed the header row

    // ---------------------------------------------------------------
    // Parse each line
    // ---------------------------------------------------------------
    for (const line of lines) {

        // Skip metadata lines until the real header row is found
        // The header row is identified by containing the word "Candidate"
        if (!headerFound) {
            if (line.includes('Candidate')) {
                headerFound = true;
            }
            continue;  // Skip this line (metadata or the header itself)
        }

        // Skip blank lines
        if (line.trim() === '') continue;

        // Parse the CSV line into an array of string fields
        const fields = parseCSVLine(line);

        // Skip rows with fewer than 8 columns (not a valid data row)
        if (fields.length < 8) continue;

        // Column index reference:
        // 0 = Candidate, 1 = Type,     2 = Column1(blank),
        // 3 = Exam,      4 = Language, 5 = Date,
        // 6 = Score,     7 = Result,   8 = Time Used
        const candidate = fields[0].trim();
        const exam      = fields[3].trim();
        const date      = fields[5].trim();

        // Skip empty candidate rows (footer lines)
        if (candidate === '') continue;

        totalRecords++;

        // Build the composite key for duplicate detection
        // Format: "CandidateName|ExamTitle|ExamDate"
        const compositeKey = `${candidate}|${exam}|${date}`;

        // Group rows by composite key using the Map
        if (!keyMap.has(compositeKey)) {
            keyMap.set(compositeKey, []);  // Initialize empty array for new key
        }
        keyMap.get(compositeKey).push(fields);  // Add this row to the group
    }

    // Guard: no valid records found
    if (totalRecords === 0) {
        console.log('No valid records found in the file.');
        return;
    }

    // ---------------------------------------------------------------
    // Identify duplicates: groups with more than one row
    // ---------------------------------------------------------------
    const duplicates = [];  // Array of [compositeKey, rowsArray] pairs

    for (const [key, rows] of keyMap.entries()) {
        if (rows.length > 1) {
            duplicates.push([key, rows]);  // This group has duplicates
        }
    }

    const duplicateGroups = duplicates.length;

    // Count total rows that are part of duplicate groups
    let totalDuplicateRows = 0;
    for (const [, rows] of duplicates) {
        totalDuplicateRows += rows.length;
    }

    // ---------------------------------------------------------------
    // Output – Formatted Duplicate Detection Report
    // ---------------------------------------------------------------
    console.log();
    console.log('╔══════════════════════════════════════════════════════════╗');
    console.log('║          MP10 – DUPLICATE RECORDS DETECTION              ║');
    console.log('╚══════════════════════════════════════════════════════════╝');
    console.log('  Source    : Pearson VUE – UPHSD Molino Exam Results');
    console.log('  Duplicate Key: Candidate + Exam + Date');
    console.log('──────────────────────────────────────────────────────────');
    console.log(`  Total Records Scanned       : ${totalRecords}`);
    console.log(`  Duplicate Groups Found      : ${duplicateGroups}`);
    console.log(`  Total Rows in Duplicates    : ${totalDuplicateRows}`);
    console.log('──────────────────────────────────────────────────────────');

    if (duplicateGroups === 0) {
        // No duplicates were found
        console.log('  ✔ No duplicate records were detected in the dataset.');
    } else {
        console.log('  Duplicate Records Found:');
        console.log();

        let groupNumber = 1;  // Label counter for each duplicate group

        for (const [key, rows] of duplicates) {
            // Split the composite key back into its individual parts
            const keyParts       = key.split('|');
            const candidateName  = keyParts[0] || 'N/A';
            const examTitle      = keyParts[1] || 'N/A';
            const examDate       = keyParts[2] || 'N/A';

            console.log(`  [Duplicate Group #${groupNumber++}]`);
            console.log(`    Candidate : ${candidateName}`);
            console.log(`    Exam      : ${examTitle}`);
            console.log(`    Date      : ${examDate}`);
            console.log(`    Count     : ${rows.length} occurrence(s)`);
            console.log('    Rows:');

            // Print each duplicate row's score, result, and time for comparison
            rows.forEach((row, index) => {
                const score  = row[6] ? row[6].trim() : 'N/A';
                const result = row[7] ? row[7].trim() : 'N/A';
                const time   = row[8] ? row[8].trim() : 'N/A';
                console.log(`      Row ${index + 1}: Score=${score.padEnd(6)}  Result=${result.padEnd(6)}  Time=${time}`);
            });

            console.log();
        }
    }

    console.log('══════════════════════════════════════════════════════════');
    console.log('            End of Duplicate Detection Report             ');
    console.log('══════════════════════════════════════════════════════════');
});

// ---------------------------------------------------------------
// Helper function
// ---------------------------------------------------------------

/**
 * parseCSVLine – Parses a single CSV line into an array of string fields.
 *
 * Correctly handles candidate names enclosed in double-quotes like
 * "LastName,FirstName", treating the comma inside quotes as part of
 * the field rather than as a field separator.
 *
 * @param {string} line  - A single raw line from the CSV file
 * @returns {string[]}   - Array of string field values
 */
function parseCSVLine(line) {
    const fields = [];   // Stores each parsed field
    let current  = '';   // Builds up the current field character by character
    let inQuotes = false; // Tracks whether we are inside a double-quoted field

    for (const char of line) {
        if (char === '"') {
            inQuotes = !inQuotes;  // Toggle in/out of quoted mode
        } else if (char === ',' && !inQuotes) {
            fields.push(current);  // Comma outside quotes = field separator
            current = '';          // Reset for the next field
        } else {
            current += char;       // Regular character: add to current field
        }
    }

    fields.push(current);  // Add the final field (no trailing comma)
    return fields;
}
