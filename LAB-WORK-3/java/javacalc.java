import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
import java.text.DecimalFormat;

public class PrelimGradeCalculatorGUI extends JFrame {

    // Constants
    private static final double EXAM_WEIGHT = 0.30;
    private static final double CLASS_STANDING_WEIGHT = 0.70;
    private static final double ATTENDANCE_WEIGHT = 0.40;
    private static final double LAB_WORK_WEIGHT = 0.60;

    private static final double PASSING_GRADE = 75.0;
    private static final double EXCELLENT_GRADE = 100.0;
    private static final int TOTAL_MEETINGS = 5;

    private JComboBox<String>[] attendanceBoxes;
    private JTextField lw1Field, lw2Field, lw3Field;

    private JLabel attendanceLabel, lwAvgLabel, csLabel;
    private JLabel passExamLabel, excellentExamLabel, statusLabel;

    private DecimalFormat df = new DecimalFormat("0.00");

    @SuppressWarnings("unchecked")
    public PrelimGradeCalculatorGUI() {
        setTitle("Prelim Grade Calculator - UPHSD");
        setSize(600, 700);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLocationRelativeTo(null);

        JPanel mainPanel = new JPanel();
        mainPanel.setLayout(new BoxLayout(mainPanel, BoxLayout.Y_AXIS));
        mainPanel.setBorder(BorderFactory.createEmptyBorder(15, 15, 15, 15));

        JLabel title = new JLabel("Prelim Grade Calculator", JLabel.CENTER);
        title.setFont(new Font("Serif", Font.BOLD, 22));
        title.setAlignmentX(Component.CENTER_ALIGNMENT);

        mainPanel.add(title);
        mainPanel.add(Box.createVerticalStrut(15));

        // Attendance
        mainPanel.add(new JLabel("Weekly Attendance (5 Meetings):"));

        JPanel attendancePanel = new JPanel(new GridLayout(1, 5, 5, 5));
        attendanceBoxes = new JComboBox[TOTAL_MEETINGS];
        String[] options = {"Select", "Present", "Absent", "Excused"};

        for (int i = 0; i < TOTAL_MEETINGS; i++) {
            attendanceBoxes[i] = new JComboBox<>(options);
            attendancePanel.add(attendanceBoxes[i]);
        }

        mainPanel.add(attendancePanel);

        attendanceLabel = new JLabel("Attendance: -");
        mainPanel.add(attendanceLabel);

        mainPanel.add(Box.createVerticalStrut(15));

        // Lab Works
        mainPanel.add(new JLabel("Lab Work Grades (0–100):"));

        lw1Field = new JTextField();
        lw2Field = new JTextField();
        lw3Field = new JTextField();

        mainPanel.add(new JLabel("Lab Work 1:"));
        mainPanel.add(lw1Field);

        mainPanel.add(new JLabel("Lab Work 2:"));
        mainPanel.add(lw2Field);

        mainPanel.add(new JLabel("Lab Work 3:"));
        mainPanel.add(lw3Field);

        mainPanel.add(Box.createVerticalStrut(15));

        JButton calculateBtn = new JButton("CALCULATE");
        calculateBtn.addActionListener(e -> calculateGrade());
        mainPanel.add(calculateBtn);

        mainPanel.add(Box.createVerticalStrut(20));

        // Results
        lwAvgLabel = new JLabel("Lab Work Average: -");
        csLabel = new JLabel("Class Standing: -");
        passExamLabel = new JLabel("Required Exam to PASS: -");
        excellentExamLabel = new JLabel("Required Exam for EXCELLENT: -");
        statusLabel = new JLabel("Status: -");

        mainPanel.add(lwAvgLabel);
        mainPanel.add(csLabel);
        mainPanel.add(passExamLabel);
        mainPanel.add(excellentExamLabel);
        mainPanel.add(Box.createVerticalStrut(10));
        mainPanel.add(statusLabel);

        add(mainPanel);
        setVisible(true);
    }

    private void calculateGrade() {
        try {
            int present = 0, excused = 0, selected = 0;

            for (JComboBox<String> box : attendanceBoxes) {
                String val = (String) box.getSelectedItem();
                if (!val.equals("Select")) selected++;
                if (val.equals("Present")) present++;
                if (val.equals("Excused")) excused++;
            }

            if (selected < TOTAL_MEETINGS) {
                JOptionPane.showMessageDialog(this, "Select attendance for all weeks.");
                return;
            }

            double attendance = ((present + excused) / (double) TOTAL_MEETINGS) * 100;
            attendanceLabel.setText("Attendance: " + df.format(attendance) + "%");

            double lw1 = Double.parseDouble(lw1Field.getText());
            double lw2 = Double.parseDouble(lw2Field.getText());
            double lw3 = Double.parseDouble(lw3Field.getText());

            if (lw1 < 0 || lw1 > 100 || lw2 < 0 || lw2 > 100 || lw3 < 0 || lw3 > 100) {
                throw new NumberFormatException();
            }

            double lwAvg = (lw1 + lw2 + lw3) / 3.0;
            double classStanding =
                    (ATTENDANCE_WEIGHT * attendance) +
                    (LAB_WORK_WEIGHT * lwAvg);

            double examPass =
                    (PASSING_GRADE - (CLASS_STANDING_WEIGHT * classStanding)) / EXAM_WEIGHT;

            double examExcellent =
                    (EXCELLENT_GRADE - (CLASS_STANDING_WEIGHT * classStanding)) / EXAM_WEIGHT;

            lwAvgLabel.setText("Lab Work Average: " + df.format(lwAvg));
            csLabel.setText("Class Standing: " + df.format(classStanding));
            passExamLabel.setText("Required Exam to PASS: " + df.format(examPass));
            excellentExamLabel.setText("Required Exam for EXCELLENT: " + df.format(examExcellent));

            double worst = (0 * EXAM_WEIGHT) + (classStanding * CLASS_STANDING_WEIGHT);
            double best = (100 * EXAM_WEIGHT) + (classStanding * CLASS_STANDING_WEIGHT);

            if (worst >= PASSING_GRADE) {
                statusLabel.setText("Status: PASSED (Even without exam)");
            } else if (best >= PASSING_GRADE) {
                statusLabel.setText("Status: PENDING (Depends on exam)");
            } else {
                statusLabel.setText("Status: FAILED (Impossible to pass)");
            }

        } catch (Exception e) {
            JOptionPane.showMessageDialog(this, "Invalid input. Please check values.");
        }
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(PrelimGradeCalculatorGUI::new);
    }
}
