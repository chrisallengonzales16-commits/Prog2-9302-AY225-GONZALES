import javax.swing.*;
import java.awt.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

/**
 * Attendance Tracking System
 * A modern Java Swing application for tracking student attendance
 * with automatic timestamp and e-signature generation
 */
public class AttendanceTracker extends JFrame {
    
    // UI Components
    private JTextField nameField;
    private JTextField courseField;
    private JTextField timeInField;
    private JTextField eSignatureField;
    private JButton submitButton;
    private JButton clearButton;
    
    // Color scheme for modern UI
    private static final Color PRIMARY_COLOR = new Color(41, 128, 185);
    private static final Color SECONDARY_COLOR = new Color(52, 152, 219);
    private static final Color BACKGROUND_COLOR = new Color(236, 240, 241);
    private static final Color TEXT_COLOR = new Color(44, 62, 80);
    private static final Color SUCCESS_COLOR = new Color(46, 204, 113);
    
    /**
     * Constructor - Initializes the attendance tracker window
     */
    public AttendanceTracker() {
        // Set up the main frame
        setTitle("Attendance Tracking System");
        setSize(500, 600);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLocationRelativeTo(null); // Center the window
        setResizable(false);
        
        // Initialize UI components
        initializeComponents();
        
        // Make the frame visible
        setVisible(true);
    }
    
    /**
     * Initialize and layout all UI components
     */
    private void initializeComponents() {
        // Main panel with background color
        JPanel mainPanel = new JPanel();
        mainPanel.setLayout(new BorderLayout());
        mainPanel.setBackground(BACKGROUND_COLOR);
        
        // Header panel
        JPanel headerPanel = createHeaderPanel();
        
        // Form panel
        JPanel formPanel = createFormPanel();
        
        // Button panel
        JPanel buttonPanel = createButtonPanel();
        
        // Add panels to main panel
        mainPanel.add(headerPanel, BorderLayout.NORTH);
        mainPanel.add(formPanel, BorderLayout.CENTER);
        mainPanel.add(buttonPanel, BorderLayout.SOUTH);
        
        // Add main panel to frame
        add(mainPanel);
    }
    
    /**
     * Create the header panel with title
     */
    private JPanel createHeaderPanel() {
        JPanel headerPanel = new JPanel();
        headerPanel.setBackground(PRIMARY_COLOR);
        headerPanel.setPreferredSize(new Dimension(500, 80));
        headerPanel.setLayout(new BorderLayout());
        
        // Title label
        JLabel titleLabel = new JLabel("Attendance Tracker", SwingConstants.CENTER);
        titleLabel.setFont(new Font("Segoe UI", Font.BOLD, 28));
        titleLabel.setForeground(Color.WHITE);
        titleLabel.setBorder(BorderFactory.createEmptyBorder(20, 0, 10, 0));
        
        // Subtitle label
        JLabel subtitleLabel = new JLabel("Record your attendance digitally", SwingConstants.CENTER);
        subtitleLabel.setFont(new Font("Segoe UI", Font.PLAIN, 14));
        subtitleLabel.setForeground(new Color(236, 240, 241));
        
        headerPanel.add(titleLabel, BorderLayout.CENTER);
        headerPanel.add(subtitleLabel, BorderLayout.SOUTH);
        
        return headerPanel;
    }
    
    /**
     * Create the form panel with input fields
     */
    private JPanel createFormPanel() {
        JPanel formPanel = new JPanel();
        formPanel.setLayout(new GridBagLayout());
        formPanel.setBackground(BACKGROUND_COLOR);
        formPanel.setBorder(BorderFactory.createEmptyBorder(30, 40, 30, 40));
        
        GridBagConstraints gbc = new GridBagConstraints();
        gbc.fill = GridBagConstraints.HORIZONTAL;
        gbc.insets = new Insets(10, 10, 10, 10);
        
        // Attendance Name
        gbc.gridx = 0;
        gbc.gridy = 0;
        formPanel.add(createStyledLabel("Attendance Name:"), gbc);
        
        gbc.gridx = 1;
        nameField = createStyledTextField();
        formPanel.add(nameField, gbc);
        
        // Course/Year
        gbc.gridx = 0;
        gbc.gridy = 1;
        formPanel.add(createStyledLabel("Course/Year:"), gbc);
        
        gbc.gridx = 1;
        courseField = createStyledTextField();
        formPanel.add(courseField, gbc);
        
        // Time In
        gbc.gridx = 0;
        gbc.gridy = 2;
        formPanel.add(createStyledLabel("Time In:"), gbc);
        
        gbc.gridx = 1;
        timeInField = createStyledTextField();
        timeInField.setEditable(false); // Read-only field
        timeInField.setBackground(new Color(189, 195, 199));
        formPanel.add(timeInField, gbc);
        
        // E-Signature
        gbc.gridx = 0;
        gbc.gridy = 3;
        formPanel.add(createStyledLabel("E-Signature:"), gbc);
        
        gbc.gridx = 1;
        eSignatureField = createStyledTextField();
        eSignatureField.setEditable(false); // Read-only field
        eSignatureField.setBackground(new Color(189, 195, 199));
        eSignatureField.setFont(new Font("Courier New", Font.PLAIN, 10));
        formPanel.add(eSignatureField, gbc);
        
        return formPanel;
    }
    
    /**
     * Create the button panel with action buttons
     */
    private JPanel createButtonPanel() {
        JPanel buttonPanel = new JPanel();
        buttonPanel.setLayout(new FlowLayout(FlowLayout.CENTER, 20, 20));
        buttonPanel.setBackground(BACKGROUND_COLOR);
        buttonPanel.setBorder(BorderFactory.createEmptyBorder(10, 40, 30, 40));
        
        // Submit button
        submitButton = createStyledButton("Submit Attendance", SUCCESS_COLOR);
        submitButton.addActionListener(e -> handleSubmit());
        
        // Clear button
        clearButton = createStyledButton("Clear Form", new Color(231, 76, 60));
        clearButton.addActionListener(e -> handleClear());
        
        buttonPanel.add(submitButton);
        buttonPanel.add(clearButton);
        
        return buttonPanel;
    }
    
    /**
     * Create a styled label with consistent formatting
     */
    private JLabel createStyledLabel(String text) {
        JLabel label = new JLabel(text);
        label.setFont(new Font("Segoe UI", Font.BOLD, 14));
        label.setForeground(TEXT_COLOR);
        return label;
    }
    
    /**
     * Create a styled text field with consistent formatting
     */
    private JTextField createStyledTextField() {
        JTextField textField = new JTextField(20);
        textField.setFont(new Font("Segoe UI", Font.PLAIN, 13));
        textField.setBorder(BorderFactory.createCompoundBorder(
            BorderFactory.createLineBorder(new Color(189, 195, 199), 1),
            BorderFactory.createEmptyBorder(8, 10, 8, 10)
        ));
        return textField;
    }
    
    /**
     * Create a styled button with consistent formatting
     */
    private JButton createStyledButton(String text, Color bgColor) {
        JButton button = new JButton(text);
        button.setFont(new Font("Segoe UI", Font.BOLD, 13));
        button.setForeground(Color.WHITE);
        button.setBackground(bgColor);
        button.setFocusPainted(false);
        button.setBorderPainted(false);
        button.setPreferredSize(new Dimension(180, 40));
        button.setCursor(new Cursor(Cursor.HAND_CURSOR));
        
        // Add hover effect
        button.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseEntered(java.awt.event.MouseEvent evt) {
                button.setBackground(bgColor.brighter());
            }
            public void mouseExited(java.awt.event.MouseEvent evt) {
                button.setBackground(bgColor);
            }
        });
        
        return button;
    }
    
    /**
     * Handle submit button action
     * Generates timestamp and e-signature automatically
     */
    private void handleSubmit() {
        // Validate input fields
        if (nameField.getText().trim().isEmpty() || courseField.getText().trim().isEmpty()) {
            JOptionPane.showMessageDialog(
                this,
                "Please fill in all required fields!",
                "Validation Error",
                JOptionPane.ERROR_MESSAGE
            );
            return;
        }
        
        // Generate current date and time
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String timeIn = now.format(formatter);
        timeInField.setText(timeIn);
        
        // Generate unique e-signature
        String eSignature = UUID.randomUUID().toString();
        eSignatureField.setText(eSignature);
        
        // Show success message
        JOptionPane.showMessageDialog(
            this,
            "Attendance recorded successfully!\n\n" +
            "Name: " + nameField.getText() + "\n" +
            "Course/Year: " + courseField.getText() + "\n" +
            "Time In: " + timeIn + "\n" +
            "E-Signature: " + eSignature.substring(0, 8) + "...",
            "Success",
            JOptionPane.INFORMATION_MESSAGE
        );
    }
    
    /**
     * Handle clear button action
     * Resets all form fields
     */
    private void handleClear() {
        nameField.setText("");
        courseField.setText("");
        timeInField.setText("");
        eSignatureField.setText("");
        nameField.requestFocus();
    }
    
    /**
     * Main method - Entry point of the application
     */
    public static void main(String[] args) {
        // Use system look and feel for better appearance
        try {
            UIManager.setLookAndFeel(UIManager.getSystemLookAndFeelClassName());
        } catch (Exception e) {
            e.printStackTrace();
        }
        
        // Create and display the attendance tracker
        SwingUtilities.invokeLater(() -> new AttendanceTracker());
    }
}