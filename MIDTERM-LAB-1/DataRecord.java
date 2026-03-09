/**
 * PROGRAMMING 2 – MACHINE PROBLEM
 * University of Perpetual Help System DALTA – Molino Campus
 * BS Information Technology - Game Development
 * Dataset: https://www.kaggle.com/datasets/asaniczka/video-game-sales-2024
 */

public class DataRecord {
    private String publisher;
    private double totalSales; // in millions

    public DataRecord(String publisher, double totalSales) {
        this.publisher = publisher;
        this.totalSales = totalSales;
    }

    public String getPublisher() {
        return publisher;
    }

    public double getTotalSales() {
        return totalSales;
    }

    /**
     * Segment based on total purchases (sales in thousands units → multiply millions * 1000)
     * Platinum  → > 100,000
     * Gold      → 50,000 – 100,000
     * Silver    → 10,000 – 49,999
     * Bronze    → < 10,000
     */
    public String getSegment() {
        double purchases = totalSales * 1000; // convert millions → thousands
        if (purchases > 100000) {
            return "Platinum";
        } else if (purchases >= 50000) {
            return "Gold";
        } else if (purchases >= 10000) {
            return "Silver";
        } else {
            return "Bronze";
        }
    }

    @Override
    public String toString() {
        return String.format("%-40s | Sales: %10.2f M | Purchases: %12.0f | Segment: %s",
                publisher, totalSales, totalSales * 1000, getSegment());
    }
}
