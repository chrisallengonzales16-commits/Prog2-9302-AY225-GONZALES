import java.io.*;
import java.util.*;

/**
 * MP10 – Detect Duplicate Records
 * Author: Gonzales, Chris Allen S.
 * Course: BSCSIT 1203L 9302-AY225 (Programming 2 - Lab)


 *
 * Description:
 *   Reads the Pearson VUE exam results CSV file and detects duplicate records.
 *   A duplicate is defined as two or more rows that share the same Candidate name,
 *   Exam title, and Exam Date. This helps identify if any candidate appears to have
 *   taken the same exam more than once on the same day.
 *
 * Program Logic:
 *   1. Ask the user for the CSV file path
 *   2. Skip metadata rows until the header row is found ("Candidate")
 *   3. Parse each data row using a quote-aware CSV parser
 *   4. Build a composite key from: Candidate + Exam + Date
 *   5. Store each key in a map; count how many times each key appears
 *   6. Display all keys that appear more than once (duplicates)
 */
public class MP10_DetectDuplicates {

    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);

        // Prompt the user to enter the path of the CSV file
        System.out.print("Enter the CSV dataset file path: ");
        String filePath = scanner.nextLine().trim();

        // ---------------------------------------------------------------
        // Data containers
        // ---------------------------------------------------------------

        // Map: composite key -> list of full row data (for display purposes)
        // Key format: "CandidateName|ExamTitle|ExamDate"
        Map<String, List<String[]>> keyMap = new LinkedHashMap<>();

        // Total count of records processed
        int totalRecords = 0;

        // ---------------------------------------------------------------
        // File Reading
        // ---------------------------------------------------------------
        try (BufferedReader br = new BufferedReader(new FileReader(filePath))) {

            String line;
            boolean headerFound = false;  // Flag: true after the header row is passed

            while ((line = br.readLine()) != null) {

                // Skip metadata lines until the header row containing "Candidate" is found
                if (!headerFound) {
                    if (line.contains("Candidate")) {
                        headerFound = true;
                    }
                    continue;
                }

                // Skip blank lines
                if (line.trim().isEmpty()) continue;

                // Parse the CSV line into an array of fields
                String[] fields = parseCSVLine(line);

                // Ensure the row has at least 8 columns
                if (fields.length < 8) continue;

                // Extract fields by their column index
                String candidate = fields[0].trim();  // Column 0: Candidate name
                // fields[1] = Type (Student/Faculty/NTE)
                // fields[2] = Column1 (blank)
                String exam      = fields[3].trim();  // Column 3: Exam title
                // fields[4] = Language
                String date      = fields[5].trim();  // Column 5: Exam date
                String score     = fields[6].trim();  // Column 6: Score
                String result    = fields[7].trim();  // Column 7: PASS or FAIL

                // Skip empty candidate rows (footer rows)
                if (candidate.isEmpty()) continue;

                totalRecords++;

                // Build a composite key to identify unique exam attempts
                // Format: "CandidateName|ExamTitle|ExamDate"
                String compositeKey = candidate + "|" + exam + "|" + date;

                // Add this row to the map under its composite key
                // If the key doesn't exist yet, create a new list for it
                keyMap.computeIfAbsent(compositeKey, k -> new ArrayList<>())
                      .add(fields);
            }

        } catch (FileNotFoundException e) {
            System.out.println("Error: File not found – " + filePath);
            return;
        } catch (IOException e) {
            System.out.println("Error reading file: " + e.getMessage());
            return;
        }

        // Guard: no records loaded
        if (totalRecords == 0) {
            System.out.println("No valid records found in the file.");
            return;
        }

        // ---------------------------------------------------------------
        // Identify duplicates: keys that appear more than once
        // ---------------------------------------------------------------
        List<Map.Entry<String, List<String[]>>> duplicates = new ArrayList<>();

        for (Map.Entry<String, List<String[]>> entry : keyMap.entrySet()) {
            if (entry.getValue().size() > 1) {
                duplicates.add(entry);  // This key has 2 or more rows = duplicate
            }
        }

        int duplicateGroups = duplicates.size();  // Number of groups with duplicates

        // Count total duplicate rows (all extra appearances beyond the first)
        int totalDuplicateRows = 0;
        for (Map.Entry<String, List<String[]>> entry : duplicates) {
            totalDuplicateRows += entry.getValue().size();  // Count all rows in the group
        }

        // ---------------------------------------------------------------
        // Output – Duplicate Detection Report
        // ---------------------------------------------------------------
        System.out.println();
        System.out.println("╔══════════════════════════════════════════════════════════╗");
        System.out.println("║          MP10 – DUPLICATE RECORDS DETECTION              ║");
        System.out.println("╚══════════════════════════════════════════════════════════╝");
        System.out.println("  Source  : Pearson VUE – UPHSD Molino Exam Results");
        System.out.printf ("  Duplicate Key Used: Candidate + Exam + Date%n");
        System.out.println("──────────────────────────────────────────────────────────");
        System.out.printf ("  Total Records Scanned       : %d%n", totalRecords);
        System.out.printf ("  Duplicate Groups Found      : %d%n", duplicateGroups);
        System.out.printf ("  Total Rows in Duplicates    : %d%n", totalDuplicateRows);
        System.out.println("──────────────────────────────────────────────────────────");

        if (duplicateGroups == 0) {
            // No duplicates found
            System.out.println("  ✔ No duplicate records were detected in the dataset.");
        } else {
            // Display each duplicate group
            System.out.println("  Duplicate Records Found:");
            System.out.println();

            int groupNumber = 1;  // Counter for labeling each duplicate group

            for (Map.Entry<String, List<String[]>> entry : duplicates) {

                // Split the composite key back into its parts for display
                String[] keyParts = entry.getKey().split("\\|");
                String candidateName = keyParts.length > 0 ? keyParts[0] : "N/A";
                String examTitle     = keyParts.length > 1 ? keyParts[1] : "N/A";
                String examDate      = keyParts.length > 2 ? keyParts[2] : "N/A";

                System.out.printf("  [Duplicate Group #%d]%n", groupNumber++);
                System.out.printf("    Candidate : %s%n", candidateName);
                System.out.printf("    Exam      : %s%n", examTitle);
                System.out.printf("    Date      : %s%n", examDate);
                System.out.printf("    Count     : %d occurrence(s)%n", entry.getValue().size());

                // Print each duplicate row's score and result for comparison
                System.out.println("    Rows:");
                int rowNum = 1;
                for (String[] row : entry.getValue()) {
                    String score  = row.length > 6 ? row[6].trim() : "N/A";
                    String result = row.length > 7 ? row[7].trim() : "N/A";
                    String time   = row.length > 8 ? row[8].trim() : "N/A";
                    System.out.printf("      Row %d: Score=%-6s  Result=%-6s  Time=%s%n",
                        rowNum++, score, result, time);
                }
                System.out.println();
            }
        }

        System.out.println("══════════════════════════════════════════════════════════");
        System.out.println("            End of Duplicate Detection Report             ");
        System.out.println("══════════════════════════════════════════════════════════");
    }

    /**
     * parseCSVLine – Parses a single CSV line into an array of string fields.
     *
     * Handles fields enclosed in double-quotes, such as "LastName,FirstName",
     * which is used for candidate names in this dataset. Commas inside
     * quoted fields are treated as part of the field, not as separators.
     *
     * @param line  A raw line of text from the CSV file
     * @return      Array of parsed string fields
     */
    static String[] parseCSVLine(String line) {
        List<String> fields = new ArrayList<>();
        StringBuilder current = new StringBuilder();  // Current field being built
        boolean inQuotes = false;  // True when inside a double-quoted field

        for (char c : line.toCharArray()) {
            if (c == '"') {
                inQuotes = !inQuotes;  // Toggle quote mode
            } else if (c == ',' && !inQuotes) {
                fields.add(current.toString());  // Save field, reset buffer
                current.setLength(0);
            } else {
                current.append(c);  // Add char to current field
            }
        }
        fields.add(current.toString());  // Save last field

        return fields.toArray(new String[0]);
    }
}
