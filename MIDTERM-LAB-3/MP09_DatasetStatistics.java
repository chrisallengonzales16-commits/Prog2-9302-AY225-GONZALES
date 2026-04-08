import java.io.*;
import java.util.*;

/**
 * MP09 – Display Dataset Statistics
 * Author: Gonzales, Chris Allen S.
 * Course: BSCSIT 1203L 9302-AY225 (Programming 2 - Lab)

 *
 * Description:
 *   Reads the Pearson VUE exam results CSV file and displays statistical
 *   information about the dataset, including total records, pass/fail counts,
 *   score min/max/average, participant type breakdown, and exam frequency.
 *
 * Program Logic:
 *   1. Ask the user for the CSV file path
 *   2. Skip metadata rows until the real header row is found ("Candidate")
 *   3. Parse each data row using a quote-aware CSV parser
 *   4. Accumulate counts and numeric stats across all valid rows
 *   5. Display a formatted statistics report
 */
public class MP09_DatasetStatistics {

    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);

        // Prompt user to enter the path to the CSV file
        System.out.print("Enter the CSV dataset file path: ");
        String filePath = scanner.nextLine().trim();

        // ---------------------------------------------------------------
        // Statistics variables
        // ---------------------------------------------------------------
        int totalRecords = 0;   // Total valid data rows
        int passCount    = 0;   // Rows with Result = PASS
        int failCount    = 0;   // Rows with Result = FAIL
        int studentCount = 0;   // Rows where type = Student
        int facultyCount = 0;   // Rows where type = Faculty
        int nteCount     = 0;   // Rows where type = NTE
        double scoreSum  = 0;   // Sum of all numeric scores
        double scoreMin  = Double.MAX_VALUE;   // Lowest score
        double scoreMax  = -Double.MAX_VALUE;  // Highest score

        // Map to count occurrences of each exam title
        Map<String, Integer> examCount = new LinkedHashMap<>();

        // ---------------------------------------------------------------
        // File Reading
        // ---------------------------------------------------------------
        try (BufferedReader br = new BufferedReader(new FileReader(filePath))) {

            String line;
            boolean headerFound = false;  // Flag: have we passed the header row?

            while ((line = br.readLine()) != null) {

                // Skip metadata lines until we reach the header row
                // The header row is identified by containing the word "Candidate"
                if (!headerFound) {
                    if (line.contains("Candidate")) {
                        headerFound = true;
                    }
                    continue;  // Skip this line regardless (header itself is not data)
                }

                // Skip blank lines after the header
                if (line.trim().isEmpty()) continue;

                // Parse the CSV line into fields (handles quoted commas in names)
                String[] fields = parseCSVLine(line);

                // Must have at least 8 columns to be a valid data row
                if (fields.length < 8) continue;

                // Column index reference:
                // 0 = Candidate, 1 = Type, 2 = Column1(blank),
                // 3 = Exam,      4 = Language, 5 = Date,
                // 6 = Score,     7 = Result,   8 = Time Used
                String candidate = fields[0].trim();
                String type      = fields[1].trim();
                String exam      = fields[3].trim();
                String scoreStr  = fields[6].trim();
                String result    = fields[7].trim();

                // Skip rows with no candidate name (footer rows)
                if (candidate.isEmpty()) continue;

                totalRecords++;

                // Count pass / fail
                if (result.equalsIgnoreCase("PASS"))      passCount++;
                else if (result.equalsIgnoreCase("FAIL")) failCount++;

                // Count by participant type
                if      (type.equalsIgnoreCase("Student")) studentCount++;
                else if (type.equalsIgnoreCase("Faculty")) facultyCount++;
                else if (type.equalsIgnoreCase("NTE"))     nteCount++;

                // Accumulate score statistics
                try {
                    double score = Double.parseDouble(scoreStr);
                    scoreSum += score;
                    if (score < scoreMin) scoreMin = score;
                    if (score > scoreMax) scoreMax = score;
                } catch (NumberFormatException e) {
                    // Not a numeric score; skip
                }

                // Count exam frequency
                examCount.put(exam, examCount.getOrDefault(exam, 0) + 1);
            }

        } catch (FileNotFoundException e) {
            System.out.println("Error: File not found – " + filePath);
            return;
        } catch (IOException e) {
            System.out.println("Error reading file: " + e.getMessage());
            return;
        }

        // Guard: no records found
        if (totalRecords == 0) {
            System.out.println("No valid data records found in the file.");
            return;
        }

        // Compute derived statistics
        double scoreAvg = scoreSum / totalRecords;
        double passRate = (passCount * 100.0) / totalRecords;

        // ---------------------------------------------------------------
        // Output – Formatted Statistics Report
        // ---------------------------------------------------------------
        System.out.println();
        System.out.println("╔══════════════════════════════════════════════════╗");
        System.out.println("║        MP09 – DATASET STATISTICS REPORT          ║");
        System.out.println("╚══════════════════════════════════════════════════╝");
        System.out.println("  Source : Pearson VUE – UPHSD Molino Exam Results");
        System.out.println("──────────────────────────────────────────────────");

        System.out.printf("  Total Records         : %d%n", totalRecords);
        System.out.printf("  Total PASS            : %d%n", passCount);
        System.out.printf("  Total FAIL            : %d%n", failCount);
        System.out.printf("  Pass Rate             : %.2f%%%n", passRate);
        System.out.println("──────────────────────────────────────────────────");

        System.out.println("  Participant Type Breakdown:");
        System.out.printf("    Students            : %d%n", studentCount);
        System.out.printf("    Faculty             : %d%n", facultyCount);
        System.out.printf("    NTE                 : %d%n", nteCount);
        System.out.println("──────────────────────────────────────────────────");

        System.out.println("  Score Statistics:");
        System.out.printf("    Minimum Score       : %.0f%n", scoreMin);
        System.out.printf("    Maximum Score       : %.0f%n", scoreMax);
        System.out.printf("    Average Score       : %.2f%n", scoreAvg);
        System.out.printf("    Total Score Sum     : %.0f%n", scoreSum);
        System.out.println("──────────────────────────────────────────────────");

        System.out.println("  Exam Frequency (sorted by count, descending):");
        examCount.entrySet()
                 .stream()
                 .sorted((a, b) -> b.getValue() - a.getValue())
                 .forEach(entry ->
                     System.out.printf("    %-54s : %d%n",
                         entry.getKey(), entry.getValue())
                 );

        System.out.println("══════════════════════════════════════════════════");
        System.out.println("               End of Statistics                  ");
        System.out.println("══════════════════════════════════════════════════");
    }

    /**
     * parseCSVLine – Parses one CSV line into an array of String fields.
     *
     * This handles candidate names formatted as "LastName,FirstName"
     * (wrapped in double-quotes), which is the format used in this dataset.
     * Fields inside quotes are kept together even if they contain commas.
     *
     * @param line  A single raw line from the CSV file
     * @return      String array of field values
     */
    static String[] parseCSVLine(String line) {
        List<String> fields = new ArrayList<>();
        StringBuilder current = new StringBuilder();  // Accumulates the current field
        boolean inQuotes = false;  // True when we are inside a quoted field

        for (char c : line.toCharArray()) {
            if (c == '"') {
                inQuotes = !inQuotes;  // Toggle quote mode
            } else if (c == ',' && !inQuotes) {
                fields.add(current.toString());  // End of field
                current.setLength(0);            // Reset buffer
            } else {
                current.append(c);               // Add character to current field
            }
        }
        fields.add(current.toString());  // Add the last field

        return fields.toArray(new String[0]);
    }
}
