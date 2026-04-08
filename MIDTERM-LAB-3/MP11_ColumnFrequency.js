/**
 * MP11 – Column Frequency Counter
 * Author: Gonzales, Chris Allen S.
 * Course: Programming 2 – Machine Problem Set
 *
 * Description:
 *   Reads the Pearson VUE exam results CSV file and counts how many times
 *   each unique value appears in a user-selected column. Useful for seeing
 *   distributions like how many took each exam, or how many passed vs. failed.
 *
 * Program Logic:
 *   1. Ask the user for the CSV file path via readline
 *   2. Read the file using Node.js fs module
 *   3. Skip metadata rows until the header row ("Candidate") is found
 *   4. Parse the header row to get column names
 *   5. Display column names and ask the user to choose one
 *   6. Count occurrences of each unique value in the chosen column
 *   7. Display a sorted frequency table with counts and percentages
 *
 * Run with: node MP11_ColumnFrequency.js
 */

// ---- Node.js built-in modules ----
const fs       = require('fs');       // File system: for reading the CSV file
const readline = require('readline'); // For terminal input/output prompts

// Create readline interface connected to terminal
const rl = readline.createInterface({
    input:  process.stdin,
    output: process.stdout
});

// ---------------------------------------------------------------
// Step 1: Ask for file path
// ---------------------------------------------------------------
rl.question('Enter the CSV dataset file path: ', (filePath) => {

    // ---------------------------------------------------------------
    // Step 2: Read the file
    // ---------------------------------------------------------------
    let fileContent;

    try {
        // Read entire file as a UTF-8 string
        fileContent = fs.readFileSync(filePath.trim(), 'utf8');
    } catch (err) {
        console.log('Error: File not found or could not be read – ' + filePath);
        rl.close();
        return;
    }

    // Split file into lines; handle both Windows and Unix line endings
    const lines = fileContent.split(/\r?\n/);

    // ---------------------------------------------------------------
    // Step 3: Parse file into headers and data rows
    // ---------------------------------------------------------------
    let headers    = null;   // Column header names from the header row
    const records  = [];     // All valid data rows
    let headerFound = false; // Flag: true once we've passed the header row

    for (const line of lines) {

        // Skip metadata lines until the header row is found
        // The header row is identified by containing the word "Candidate"
        if (!headerFound) {
            if (line.includes('Candidate')) {
                headerFound = true;
                // Parse the header row to extract column names
                headers = parseCSVLine(line);
            }
            continue;  // Skip this line (it's metadata or the header itself)
        }

        // Skip blank lines
        if (line.trim() === '') continue;

        // Parse data row
        const fields = parseCSVLine(line);

        // Must have at least 8 columns to be valid
        if (fields.length < 8) continue;

        // Skip rows with empty candidate name (footer rows)
        if (fields[0].trim() === '') continue;

        records.push(fields);  // Store the valid row
    }

    // Guard: no data or headers found
    if (!headers || records.length === 0) {
        console.log('Error: No valid data found in the file.');
        rl.close();
        return;
    }

    // ---------------------------------------------------------------
    // Step 4: Display column list and ask user to choose one
    // ---------------------------------------------------------------
    console.log('\nAvailable Columns:');
    console.log('──────────────────────────────');

    // Show only columns that have a non-empty header name
    headers.forEach((col, index) => {
        if (col.trim() !== '') {
            console.log(`  [${index}] ${col.trim()}`);
        }
    });

    console.log('──────────────────────────────');

    rl.question('Enter column number to analyze: ', (input) => {
        rl.close();  // Close input after receiving the column choice

        // Parse the user's column selection
        const selectedCol = parseInt(input.trim(), 10);

        // Validate the selected column index
        if (isNaN(selectedCol) || selectedCol < 0 || selectedCol >= headers.length) {
            console.log('Error: Invalid column number.');
            return;
        }

        const selectedColumnName = headers[selectedCol].trim();

        // ---------------------------------------------------------------
        // Step 5: Count frequency of each unique value in the chosen column
        // ---------------------------------------------------------------

        // Object used as a frequency map: { value: count }
        const frequencyMap = {};

        for (const row of records) {
            // Get cell value; use "(empty)" if column doesn't exist or is blank
            const cellValue = (selectedCol < row.length && row[selectedCol].trim() !== '')
                              ? row[selectedCol].trim()
                              : '(empty)';

            // Increment count for this value (initialize to 0 if not yet seen)
            frequencyMap[cellValue] = (frequencyMap[cellValue] || 0) + 1;
        }

        // Convert map to array and sort by count descending
        const sortedEntries = Object.entries(frequencyMap)
            .sort((a, b) => b[1] - a[1]);  // Sort by count, highest first

        const totalRows = records.length;  // Used to calculate percentages

        // ---------------------------------------------------------------
        // Step 6: Display the frequency table
        // ---------------------------------------------------------------
        console.log();
        console.log('╔══════════════════════════════════════════════════════════╗');
        console.log('║           MP11 – COLUMN FREQUENCY COUNTER                ║');
        console.log('╚══════════════════════════════════════════════════════════╝');
        console.log('  Source   : Pearson VUE – UPHSD Molino Exam Results');
        console.log(`  Column   : ${selectedColumnName}`);
        console.log(`  Total Rows Analyzed: ${totalRows}`);
        console.log('──────────────────────────────────────────────────────────');

        // Table header row
        const valueHeader   = 'Value'.padEnd(54);
        const countHeader   = 'Count'.padStart(6);
        const percentHeader = 'Percent'.padStart(8);
        console.log(`  ${valueHeader}  ${countHeader}  ${percentHeader}`);
        console.log('  ' + '─'.repeat(72));

        for (const [value, count] of sortedEntries) {
            const percent  = ((count / totalRows) * 100).toFixed(2);  // Percentage to 2 decimal places
            const padValue = value.padEnd(54);          // Left-align value
            const padCount = String(count).padStart(6); // Right-align count
            const padPct   = `${percent}%`.padStart(8); // Right-align percent
            console.log(`  ${padValue}  ${padCount}  ${padPct}`);
        }

        console.log('  ' + '─'.repeat(72));

        // Totals row
        const totalLabel = 'TOTAL'.padEnd(54);
        const totalCount = String(totalRows).padStart(6);
        const totalPct   = '100.00%'.padStart(8);
        console.log(`  ${totalLabel}  ${totalCount}  ${totalPct}`);

        console.log('══════════════════════════════════════════════════════════');
        console.log('           End of Column Frequency Report                 ');
        console.log('══════════════════════════════════════════════════════════');
    });
});

// ---------------------------------------------------------------
// Helper function
// ---------------------------------------------------------------

/**
 * parseCSVLine – Parses a single CSV line into an array of string fields.
 *
 * Handles fields enclosed in double-quotes such as "LastName,FirstName".
 * The comma inside the quotes is treated as part of the field, not a separator.
 *
 * @param {string} line  - A raw CSV line
 * @returns {string[]}   - Array of string field values
 */
function parseCSVLine(line) {
    const fields = [];    // Stores each parsed field
    let current  = '';    // Builds up the current field
    let inQuotes = false; // True when parsing inside double-quotes

    for (const char of line) {
        if (char === '"') {
            inQuotes = !inQuotes;  // Toggle in/out of quoted mode
        } else if (char === ',' && !inQuotes) {
            fields.push(current);  // Comma outside quotes = field separator
            current = '';          // Reset for the next field
        } else {
            current += char;       // Regular character: append to current field
        }
    }

    fields.push(current);  // Save the final field (no trailing comma)
    return fields;
}
