
import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Scanner;
import java.util.TreeMap;

public class CustomerSegmentation {

    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        File file;

        // ── 1. FILE PATH INPUT & VALIDATION LOOP ──────────────────────────────
        while (true) {
            System.out.print("Enter dataset file path: ");
            String path = input.nextLine().trim();
            file = new File(path);

            if (!file.exists() || !file.isFile()) {
                System.out.println("Invalid file path. File does not exist. Please try again.\n");
            } else if (!file.canRead()) {
                System.out.println("File exists but cannot be read. Check permissions.\n");
            } else if (!path.toLowerCase().endsWith(".csv")) {
                System.out.println("File does not appear to be a CSV. Please provide a .csv file.\n");
            } else {
                System.out.println("File found. Processing...\n");
                break;
            }
        }

        // ── 2. LOAD & AGGREGATE DATA ──────────────────────────────────────────
        Map<String, Double> publisherSales = new HashMap<>();
        int linesRead = 0;
        int parseErrors = 0;

        try (BufferedReader br = new BufferedReader(new FileReader(file))) {
            String line;
            boolean isHeader = true;

            while ((line = br.readLine()) != null) {
                if (isHeader) { isHeader = false; continue; } // skip header

                String[] cols = line.split(",", -1);
                if (cols.length < 8) { parseErrors++; continue; }

                try {
                    String publisher = cols[4].trim();
                    String salesStr  = cols[7].trim();

                    if (publisher.isEmpty() || salesStr.isEmpty()) { parseErrors++; continue; }

                    double sales = Double.parseDouble(salesStr);
                    publisherSales.merge(publisher, sales, Double::sum);
                    linesRead++;

                } catch (NumberFormatException e) {
                    parseErrors++;
                }
            }

        } catch (IOException e) {
            System.out.println("Error reading file: " + e.getMessage());
            input.close();
            return;
        }

        // ── 3. BUILD DataRecord LIST & SEGMENT ────────────────────────────────
        Map<String, List<DataRecord>> segments = new TreeMap<>();
        segments.put("Platinum", new ArrayList<>());
        segments.put("Gold",     new ArrayList<>());
        segments.put("Silver",   new ArrayList<>());
        segments.put("Bronze",   new ArrayList<>());

        for (Map.Entry<String, Double> entry : publisherSales.entrySet()) {
            DataRecord record = new DataRecord(entry.getKey(), entry.getValue());
            segments.get(record.getSegment()).add(record);
        }

        // ── 4. DISPLAY RESULTS ────────────────────────────────────────────────
        String border = "=".repeat(100);
        String divider = "-".repeat(100);

        System.out.println(border);
        System.out.println("  CUSTOMER SEGMENTATION REPORT — Video Game Sales 2024");
        System.out.println("  Dataset: vgchartz-2024.csv  |  Records Processed: " + linesRead
                + "  |  Parse Errors: " + parseErrors);
        System.out.println(border);
        System.out.printf("  %-12s | %-8s | %s%n", "SEGMENT", "COUNT", "THRESHOLD (purchases)");
        System.out.println(divider);
        System.out.printf("  %-12s | %-8d | > 100,000%n",   "Platinum", segments.get("Platinum").size());
        System.out.printf("  %-12s | %-8d | 50,000 – 100,000%n", "Gold", segments.get("Gold").size());
        System.out.printf("  %-12s | %-8d | 10,000 – 49,999%n",  "Silver", segments.get("Silver").size());
        System.out.printf("  %-12s | %-8d | < 10,000%n",    "Bronze", segments.get("Bronze").size());
        System.out.println(border);

        String[] order = {"Platinum", "Gold", "Silver", "Bronze"};
        for (String seg : order) {
            List<DataRecord> group = segments.get(seg);
            System.out.printf("%n  ┌─ %s SEGMENT (%d publishers)%n", seg.toUpperCase(), group.size());
            System.out.println("  " + divider);
            if (group.isEmpty()) {
                System.out.println("  │  (no publishers in this segment)");
            } else {
                group.sort((a, b) -> Double.compare(b.getTotalSales(), a.getTotalSales()));
                for (DataRecord r : group) {
                    System.out.println("  │  " + r);
                }
            }
            System.out.println("  └" + "─".repeat(99));
        }

        System.out.println("\n  END OF REPORT");
        System.out.println(border);
        input.close();
    }
}
