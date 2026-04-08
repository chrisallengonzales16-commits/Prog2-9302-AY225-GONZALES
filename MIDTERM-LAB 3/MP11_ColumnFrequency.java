import java.io.*;
import java.util.*;

/**
 * MP11 – Column Frequency Counter
 * Author: Gonzales, Chris Allen S.
 * Course: Programming 2 – Machine Problem Set
 *
 * Description:
 *   Reads the Pearson VUE exam results CSV file and counts how many times
 *   each unique value appears in a user-selected column. The user can choose
 *   any column (e.g., Exam, Result, Type) to see a frequency distribution.
 *
 * Program Logic:
 *   1. Ask the user for the CSV file path
 *   2. Skip metadata rows until the real header row ("Candidate") is found
 *   3. Display the available column names and ask the user to pick one
 *   4. Parse each data row and collect values from the selected column
 *   5. Count occurrences of each unique value using a Map
 *   6. Display a sorted frequency table with counts and percentages
 */
public class MP11_ColumnFrequency {

    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);

        // Prompt user to enter the path to the CSV file
        System.out.print("Enter the CSV dataset file path: ");
        String filePath = scanner.nextLine().trim();

        // ---------------------------------------------------------------
        // Step 1: Load all data rows into memory
        // ---------------------------------------------------------------
        String[] headers = null;          // Array of column header names
        List<String[]> records = new ArrayList<>();  // All valid data rows

        try (BufferedReader br = new BufferedReader(new FileReader(filePath))) {

            String line;
            boolean headerFound = false;  // Flag: have we passed the header row?

            while ((line = br.readLine()) != null) {

                // Skip metadata lines until the real header row is found
                // Header row contains the word "Candidate"
                if (!headerFound) {
                    if (line.contains("Candidate")) {
                        headerFound = true;
                        // This line IS the header row; parse it for column names
                        headers = parseCSVLine(line);
                    }
                    continue;  // Don't treat this line as a data row
                }

                // Skip blank lines
                if (line.trim().isEmpty()) continue;

                // Parse the data row
                String[] fields = parseCSVLine(line);

                // Must have at least 8 columns to be valid
                if (fields.length < 8) continue;

                // Skip rows with empty candidate name (footer rows)
                if (fields[0].trim().isEmpty()) continue;

                records.add(fields);  // Store the valid row
            }

        } catch (FileNotFoundException e) {
            System.out.println("Error: File not found – " + filePath);
            return;
        } catch (IOException e) {
            System.out.println("Error reading file: " + e.getMessage());
            return;
        }

        // Guard: file was empty or no headers found
        if (headers == null || records.isEmpty()) {
            System.out.println("Error: No valid data found in the file.");
            return;
        }

        // ---------------------------------------------------------------
        // Step 2: Display columns and let user choose one
        // ---------------------------------------------------------------
        System.out.println();
        System.out.println("Available Columns:");
        System.out.println("──────────────────────────────");

        for (int i = 0; i < headers.length; i++) {
            // Only show columns that have a non-empty header name
            if (!headers[i].trim().isEmpty()) {
                System.out.printf("  [%d] %s%n", i, headers[i].trim());
            }
        }

        System.out.println("──────────────────────────────");
        System.out.print("Enter column number to analyze: ");

        int selectedCol;  // The column index chosen by the user

        try {
            selectedCol = Integer.parseInt(scanner.nextLine().trim());
        } catch (NumberFormatException e) {
            System.out.println("Error: Please enter a valid column number.");
            return;
        }

        // Validate the column number is within range
        if (selectedCol < 0 || selectedCol >= headers.length) {
            System.out.println("Error: Column number out of range.");
            return;
        }

        String selectedColumnName = headers[selectedCol].trim();

        // ---------------------------------------------------------------
        // Step 3: Count the frequency of each unique value in the column
        // ---------------------------------------------------------------

        // Map: unique value -> how many times it appears in the selected column
        Map<String, Integer> frequencyMap = new LinkedHashMap<>();

        for (String[] row : records) {
            // Safely get the cell value; default to "(empty)" if column doesn't exist
            String cellValue = (selectedCol < row.length && !row[selectedCol].trim().isEmpty())
                               ? row[selectedCol].trim()
                               : "(empty)";

            // Increment the count for this value
            frequencyMap.put(cellValue, frequencyMap.getOrDefault(cellValue, 0) + 1);
        }

        // Sort entries by count descending for easy reading
        List<Map.Entry<String, Integer>> sortedEntries = new ArrayList<>(frequencyMap.entrySet());
        sortedEntries.sort((a, b) -> b.getValue() - a.getValue());

        int totalRows = records.size();  // Used to calculate percentages

        // ---------------------------------------------------------------
        // Step 4: Display the frequency table
        // ---------------------------------------------------------------
        System.out.println();
        System.out.println("╔══════════════════════════════════════════════════════════╗");
        System.out.println("║           MP11 – COLUMN FREQUENCY COUNTER                ║");
        System.out.println("╚══════════════════════════════════════════════════════════╝");
        System.out.println("  Source   : Pearson VUE – UPHSD Molino Exam Results");
        System.out.printf ("  Column   : %s%n", selectedColumnName);
        System.out.printf ("  Total Rows Analyzed: %d%n", totalRows);
        System.out.println("──────────────────────────────────────────────────────────");

        // Table header row
        System.out.printf("  %-54s  %6s  %7s%n", "Value", "Count", "Percent");
        System.out.println("  " + "─".repeat(70));

        for (Map.Entry<String, Integer> entry : sortedEntries) {
            String value   = entry.getKey();    // The unique value
            int count      = entry.getValue();  // How many times it appears
            double percent = (count * 100.0) / totalRows;  // Percentage of total

            System.out.printf("  %-54s  %6d  %6.2f%%%n", value, count, percent);
        }

        System.out.println("  " + "─".repeat(70));
        System.out.printf("  %-54s  %6d  %6.2f%%%n", "TOTAL", totalRows, 100.0);

        System.out.println("══════════════════════════════════════════════════════════");
        System.out.println("           End of Column Frequency Report                 ");
        System.out.println("══════════════════════════════════════════════════════════");
    }

    /**
     * parseCSVLine – Parses a single CSV line into an array of string fields.
     *
     * Handles fields enclosed in double-quotes such as "LastName,FirstName".
     * Commas inside quoted fields are treated as part of the field, not separators.
     *
     * @param line  A raw CSV line
     * @return      Array of parsed string field values
     */
    static String[] parseCSVLine(String line) {
        List<String> fields = new ArrayList<>();
        StringBuilder current = new StringBuilder();  // Builds the current field
        boolean inQuotes = false;  // Whether we're currently inside a quoted section

        for (char c : line.toCharArray()) {
            if (c == '"') {
                inQuotes = !inQuotes;  // Toggle quote mode
            } else if (c == ',' && !inQuotes) {
                fields.add(current.toString());  // Field separator found; save field
                current.setLength(0);            // Reset buffer for next field
            } else {
                current.append(c);  // Regular character; add to current field
            }
        }
        fields.add(current.toString());  // Add the final field

        return fields.toArray(new String[0]);
    }
}
