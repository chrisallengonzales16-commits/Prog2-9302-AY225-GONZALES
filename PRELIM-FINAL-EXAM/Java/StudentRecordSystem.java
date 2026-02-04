// Programmer Identifier: Chris Allen S Gonzales — 23-0179-685
// UPHSD Molino Campus - Student Record System
// Date: February 4, 2026

import java.awt.*;
import java.awt.event.*;
import java.io.*;
import java.util.*;
import java.util.List;
import javax.swing.*;
import javax.swing.table.*;

public class StudentRecordSystem extends JFrame {
    // UPHSD Color Scheme (matching web version)
    private static final Color UPHSD_MAROON = new Color(128, 0, 32);
    private static final Color UPHSD_GOLD = new Color(255, 204, 0);
    private static final Color HEADER_BG = new Color(45, 45, 48);
    private static final Color PANEL_BG = new Color(240, 240, 240);
    private static final Color CELL_BG = Color.WHITE;
    private static final Color GRID_COLOR = new Color(220, 220, 220);
    private static final Color HOVER_BG = new Color(184, 207, 229);
    private static final Color SELECTED_BG = new Color(255, 228, 181); // FFE4B5
    
    private JTable table;
    private DefaultTableModel tableModel;
    private JTextField searchField;
    private JTextField idField, firstNameField, lastNameField;
    private JTextField[] gradeFields;
    private JButton addButton, deleteButton, clearButton, editButton;
    private JLabel recordCountLabel;
    
    // Store all students for filtering
    private List<Student> allStudents;
    private int selectedRow = -1;
    
    // Student class to hold data
    static class Student {
        String studentId, firstName, lastName;
        int lab1, lab2, lab3, exam, attendance;
        
        Student(String id, String first, String last, int l1, int l2, int l3, int ex, int att) {
            this.studentId = id;
            this.firstName = first;
            this.lastName = last;
            this.lab1 = l1;
            this.lab2 = l2;
            this.lab3 = l3;
            this.exam = ex;
            this.attendance = att;
        }
        
        Object[] toArray() {
            return new Object[]{studentId, firstName, lastName, lab1, lab2, lab3, exam, attendance};
        }
        
        boolean matches(String query) {
            String q = query.toLowerCase();
            return studentId.toLowerCase().contains(q) ||
                   firstName.toLowerCase().contains(q) ||
                   lastName.toLowerCase().contains(q);
        }
    }
    
    public StudentRecordSystem() {
        allStudents = new ArrayList<>();
        
        // Set window properties
        setTitle("Student Record System - UPHSD Molino Campus - Chris Allen S Gonzales — 23-0179-685");
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setSize(1400, 750);
        setLocationRelativeTo(null);
        
        // Set look and feel
        try {
            UIManager.setLookAndFeel(UIManager.getSystemLookAndFeelClassName());
        } catch (Exception e) {
            e.printStackTrace();
        }
        
        initializeComponents();
        loadDataFromCSV();
        
        setVisible(true);
    }
    
    private void initializeComponents() {
        // Main panel
        JPanel mainPanel = new JPanel(new BorderLayout(0, 0));
        mainPanel.setBackground(PANEL_BG);
        
        // Header Panel
        mainPanel.add(createHeaderPanel(), BorderLayout.NORTH);
        
        // Center panel with search and table
        JPanel centerPanel = new JPanel(new BorderLayout(0, 10));
        centerPanel.setBackground(PANEL_BG);
        centerPanel.setBorder(BorderFactory.createEmptyBorder(10, 20, 10, 20));
        
        // Search panel
        centerPanel.add(createSearchPanel(), BorderLayout.NORTH);
        
        // Table panel
        centerPanel.add(createTablePanel(), BorderLayout.CENTER);
        
        mainPanel.add(centerPanel, BorderLayout.CENTER);
        
        // Input Panel
        mainPanel.add(createInputPanel(), BorderLayout.SOUTH);
        
        add(mainPanel);
    }
    
    private JPanel createHeaderPanel() {
        JPanel headerPanel = new JPanel(new BorderLayout());
        headerPanel.setBackground(UPHSD_MAROON);
        headerPanel.setBorder(BorderFactory.createEmptyBorder(20, 30, 20, 30));
        
        // Title section
        JPanel titlePanel = new JPanel(new GridLayout(2, 1, 0, 5));
        titlePanel.setBackground(UPHSD_MAROON);
        
        JLabel titleLabel = new JLabel("STUDENT RECORD MANAGEMENT SYSTEM");
        titleLabel.setFont(new Font("Segoe UI", Font.BOLD, 28));
        titleLabel.setForeground(UPHSD_GOLD);
        
        JLabel subtitleLabel = new JLabel("University of Perpetual Help System DALTA - Molino Campus");
        subtitleLabel.setFont(new Font("Segoe UI", Font.PLAIN, 14));
        subtitleLabel.setForeground(Color.WHITE);
        
        titlePanel.add(titleLabel);
        titlePanel.add(subtitleLabel);
        
        // Record count
        recordCountLabel = new JLabel("Total Records: 0");
        recordCountLabel.setFont(new Font("Segoe UI", Font.BOLD, 14));
        recordCountLabel.setForeground(UPHSD_GOLD);
        recordCountLabel.setHorizontalAlignment(SwingConstants.RIGHT);
        
        headerPanel.add(titlePanel, BorderLayout.WEST);
        headerPanel.add(recordCountLabel, BorderLayout.EAST);
        
        return headerPanel;
    }
    
    private JPanel createSearchPanel() {
        JPanel searchPanel = new JPanel(new BorderLayout(10, 0));
        searchPanel.setBackground(Color.WHITE);
        searchPanel.setBorder(BorderFactory.createCompoundBorder(
            BorderFactory.createLineBorder(GRID_COLOR, 1),
            BorderFactory.createEmptyBorder(15, 15, 15, 15)
        ));
        
        JLabel searchLabel = new JLabel("🔍 Search:");
        searchLabel.setFont(new Font("Segoe UI", Font.BOLD, 14));
        searchLabel.setForeground(HEADER_BG);
        
        searchField = new JTextField();
        searchField.setFont(new Font("Segoe UI", Font.PLAIN, 14));
        searchField.setBorder(BorderFactory.createCompoundBorder(
            BorderFactory.createLineBorder(GRID_COLOR, 1),
            BorderFactory.createEmptyBorder(8, 12, 8, 12)
        ));
        
        // Add real-time search
        searchField.getDocument().addDocumentListener(new javax.swing.event.DocumentListener() {
            public void changedUpdate(javax.swing.event.DocumentEvent e) { filterTable(); }
            public void removeUpdate(javax.swing.event.DocumentEvent e) { filterTable(); }
            public void insertUpdate(javax.swing.event.DocumentEvent e) { filterTable(); }
        });
        
        JButton clearSearchBtn = createStyledButton("Clear", HEADER_BG, Color.WHITE);
        clearSearchBtn.setPreferredSize(new Dimension(100, 40));
        clearSearchBtn.addActionListener(e -> {
            searchField.setText("");
            filterTable();
        });
        
        searchPanel.add(searchLabel, BorderLayout.WEST);
        searchPanel.add(searchField, BorderLayout.CENTER);
        searchPanel.add(clearSearchBtn, BorderLayout.EAST);
        
        return searchPanel;
    }
    
    private JPanel createTablePanel() {
        JPanel tablePanel = new JPanel(new BorderLayout());
        tablePanel.setBackground(PANEL_BG);
        
        // Column names
        String[] columns = {
            "Student ID", "First Name", "Last Name", 
            "LAB WORK 1", "LAB WORK 2", "LAB WORK 3", 
            "PRELIM EXAM", "ATTENDANCE GRADE"
        };
        
        // Create table model
        tableModel = new DefaultTableModel(columns, 0) {
            @Override
            public boolean isCellEditable(int row, int column) {
                return false;
            }
        };
        
        // Create table
        table = new JTable(tableModel);
        table.setFont(new Font("Segoe UI", Font.PLAIN, 13));
        table.setRowHeight(28);
        table.setGridColor(GRID_COLOR);
        table.setSelectionBackground(SELECTED_BG);
        table.setSelectionForeground(Color.BLACK);
        table.setShowGrid(true);
        table.setIntercellSpacing(new Dimension(1, 1));
        table.setSelectionMode(ListSelectionModel.SINGLE_SELECTION);
        
        // Add row selection listener
        table.getSelectionModel().addListSelectionListener(e -> {
            if (!e.getValueIsAdjusting()) {
                selectedRow = table.getSelectedRow();
                updateButtonStates();
            }
        });
        
        // Header styling
        JTableHeader header = table.getTableHeader();
        header.setFont(new Font("Segoe UI", Font.BOLD, 13));
        header.setBackground(HEADER_BG);
        header.setForeground(Color.WHITE);
        header.setPreferredSize(new Dimension(header.getPreferredSize().width, 35));
        
        // Set column widths
        table.getColumnModel().getColumn(0).setPreferredWidth(120);
        table.getColumnModel().getColumn(1).setPreferredWidth(150);
        table.getColumnModel().getColumn(2).setPreferredWidth(150);
        for (int i = 3; i < 8; i++) {
            table.getColumnModel().getColumn(i).setPreferredWidth(120);
        }
        
        // Center align numeric columns
        DefaultTableCellRenderer centerRenderer = new DefaultTableCellRenderer();
        centerRenderer.setHorizontalAlignment(JLabel.CENTER);
        for (int i = 3; i < 8; i++) {
            table.getColumnModel().getColumn(i).setCellRenderer(centerRenderer);
        }
        
        // Alternating row colors
        table.setDefaultRenderer(Object.class, new DefaultTableCellRenderer() {
            @Override
            public Component getTableCellRendererComponent(JTable table, Object value,
                    boolean isSelected, boolean hasFocus, int row, int column) {
                Component c = super.getTableCellRendererComponent(table, value, isSelected, hasFocus, row, column);
                
                if (isSelected) {
                    c.setBackground(SELECTED_BG);
                    c.setForeground(Color.BLACK);
                } else if (row % 2 == 0) {
                    c.setBackground(Color.WHITE);
                } else {
                    c.setBackground(new Color(250, 250, 250));
                }
                
                // Center align numeric columns
                if (column >= 3 && column <= 7) {
                    ((JLabel) c).setHorizontalAlignment(SwingConstants.CENTER);
                } else {
                    ((JLabel) c).setHorizontalAlignment(SwingConstants.LEFT);
                }
                
                return c;
            }
        });
        
        // Scroll pane with maximum height
        JScrollPane scrollPane = new JScrollPane(table);
        scrollPane.setBorder(BorderFactory.createLineBorder(GRID_COLOR, 1));
        scrollPane.getViewport().setBackground(Color.WHITE);
        scrollPane.setPreferredSize(new Dimension(0, 400));
        
        tablePanel.add(scrollPane, BorderLayout.CENTER);
        
        return tablePanel;
    }
    
    private JPanel createInputPanel() {
        JPanel mainInputPanel = new JPanel(new BorderLayout());
        mainInputPanel.setBackground(PANEL_BG);
        mainInputPanel.setBorder(BorderFactory.createEmptyBorder(0, 20, 20, 20));
        
        // Input fields panel
        JPanel inputFieldsPanel = new JPanel(new GridBagLayout());
        inputFieldsPanel.setBackground(Color.WHITE);
        inputFieldsPanel.setBorder(BorderFactory.createCompoundBorder(
            BorderFactory.createLineBorder(GRID_COLOR, 1),
            BorderFactory.createEmptyBorder(15, 15, 15, 15)
        ));
        
        // Title
        GridBagConstraints gbc = new GridBagConstraints();
        gbc.gridx = 0;
        gbc.gridy = 0;
        gbc.gridwidth = 6;
        gbc.anchor = GridBagConstraints.WEST;
        gbc.insets = new Insets(0, 0, 15, 0);
        
        JLabel formTitle = new JLabel("Add New Record");
        formTitle.setFont(new Font("Segoe UI", Font.BOLD, 18));
        formTitle.setForeground(UPHSD_MAROON);
        inputFieldsPanel.add(formTitle, gbc);
        
        // Reset for fields
        gbc.gridwidth = 1;
        gbc.fill = GridBagConstraints.HORIZONTAL;
        gbc.insets = new Insets(5, 5, 5, 5);
        
        // Row 1: Student Info
        gbc.gridy = 1;
        gbc.gridx = 0;
        addLabelAndField(inputFieldsPanel, "Student ID:", idField = createStyledTextField(), gbc);
        
        gbc.gridx = 2;
        addLabelAndField(inputFieldsPanel, "First Name:", firstNameField = createStyledTextField(), gbc);
        
        gbc.gridx = 4;
        addLabelAndField(inputFieldsPanel, "Last Name:", lastNameField = createStyledTextField(), gbc);
        
        // Row 2: Lab Works
        gradeFields = new JTextField[5];
        String[] gradeLabels = {"LAB WORK 1:", "LAB WORK 2:", "LAB WORK 3:", "PRELIM EXAM:", "ATTENDANCE:"};
        
        gbc.gridy = 2;
        for (int i = 0; i < 3; i++) {
            gbc.gridx = i * 2;
            addLabelAndField(inputFieldsPanel, gradeLabels[i], gradeFields[i] = createStyledTextField(), gbc);
        }
        
        gbc.gridy = 3;
        for (int i = 3; i < 5; i++) {
            gbc.gridx = (i - 3) * 2;
            addLabelAndField(inputFieldsPanel, gradeLabels[i], gradeFields[i] = createStyledTextField(), gbc);
        }
        
        mainInputPanel.add(inputFieldsPanel, BorderLayout.CENTER);
        
        // Button panel
        mainInputPanel.add(createButtonPanel(), BorderLayout.SOUTH);
        
        return mainInputPanel;
    }
    
    private void addLabelAndField(JPanel panel, String labelText, JTextField field, GridBagConstraints gbc) {
        JLabel label = new JLabel(labelText);
        label.setFont(new Font("Segoe UI", Font.BOLD, 12));
        label.setForeground(HEADER_BG);
        
        gbc.weightx = 0.0;
        panel.add(label, gbc);
        
        gbc.gridx++;
        gbc.weightx = 1.0;
        panel.add(field, gbc);
    }
    
    private JTextField createStyledTextField() {
        JTextField field = new JTextField(15);
        field.setFont(new Font("Segoe UI", Font.PLAIN, 13));
        field.setBorder(BorderFactory.createCompoundBorder(
            BorderFactory.createLineBorder(GRID_COLOR, 1),
            BorderFactory.createEmptyBorder(8, 12, 8, 12)
        ));
        return field;
    }
    
    private JPanel createButtonPanel() {
        JPanel buttonPanel = new JPanel(new FlowLayout(FlowLayout.RIGHT, 10, 15));
        buttonPanel.setBackground(Color.WHITE);
        
        // Clear Button
        clearButton = createStyledButton("↺ Clear Fields", new Color(108, 117, 125), Color.WHITE);
        clearButton.addActionListener(e -> clearFields());
        
        // Add Button
        addButton = createStyledButton("➕ Add Record", UPHSD_MAROON, UPHSD_GOLD);
        addButton.addActionListener(e -> addRecord());
        
        // Edit Button
        editButton = createStyledButton("✏️ Edit Selected", UPHSD_MAROON, UPHSD_GOLD);
        editButton.addActionListener(e -> editSelectedRecord());
        editButton.setEnabled(false);
        
        // Delete Button
        deleteButton = createStyledButton("🗑️ Delete Selected", new Color(220, 53, 69), Color.WHITE);
        deleteButton.addActionListener(e -> deleteRecord());
        deleteButton.setEnabled(false);
        
        buttonPanel.add(clearButton);
        buttonPanel.add(addButton);
        buttonPanel.add(editButton);
        buttonPanel.add(deleteButton);
        
        return buttonPanel;
    }


    
    private JButton createStyledButton(String text, Color bg, Color fg) {
        JButton button = new JButton(text);
        button.setFont(new Font("Segoe UI", Font.BOLD, 13));
        button.setBackground(bg);
        button.setForeground(fg);
        button.setFocusPainted(false);
        button.setBorderPainted(false);
        button.setOpaque(true);
        button.setCursor(new Cursor(Cursor.HAND_CURSOR));
        button.setPreferredSize(new Dimension(160, 35));
        
        // Hover effect
        button.addMouseListener(new MouseAdapter() {
            Color originalBg = bg;
            public void mouseEntered(MouseEvent e) {
                if (button.isEnabled()) {
                    button.setBackground(bg.brighter());
                }
            }
            public void mouseExited(MouseEvent e) {
                button.setBackground(originalBg);
            }
        });
        
        return button;
    }
    
    private void loadDataFromCSV() {
        // Try a few candidate locations so the app works regardless of working directory
        String[] candidates = {"MOCK_DATA.csv", "PRELIM-FINAL-EXAM/MOCK_DATA.csv", "../PRELIM-FINAL-EXAM/MOCK_DATA.csv"};
        File csvFile = null;
        for (String p : candidates) {
            File f = new File(p);
            if (f.exists()) { csvFile = f; break; }
        }
        if (csvFile == null) {
            JOptionPane.showMessageDialog(this,
                "MOCK_DATA.csv not found in the expected locations.\nPlease place it next to the application or in PRELIM-FINAL-EXAM/ directory.",
                "Error", JOptionPane.ERROR_MESSAGE);
            return;
        }

        try (BufferedReader br = new BufferedReader(new FileReader(csvFile))) {
            String line;
            boolean isFirstLine = true;
            
            while ((line = br.readLine()) != null) {
                if (isFirstLine) {
                    isFirstLine = false;
                    continue;
                }
                
                if (line.trim().isEmpty()) continue;
                
                String[] data = line.split(",");
                if (data.length >= 8) {
                    try {
                        Student student = new Student(
                            data[0].trim(),
                            data[1].trim(),
                            data[2].trim(),
                            Integer.parseInt(data[3].trim()),
                            Integer.parseInt(data[4].trim()),
                            Integer.parseInt(data[5].trim()),
                            Integer.parseInt(data[6].trim()),
                            Integer.parseInt(data[7].trim())
                        );
                        allStudents.add(student);
                    } catch (NumberFormatException e) {
                        System.err.println("Error parsing line: " + line);
                    }
                }
            }
            
            filterTable(); // Initial load
            updateRecordCount();
            
            JOptionPane.showMessageDialog(this, 
                "Successfully loaded " + allStudents.size() + " records from MOCK_DATA.csv",
                "Data Loaded", JOptionPane.INFORMATION_MESSAGE);
            
        } catch (IOException e) {
            JOptionPane.showMessageDialog(this,
                "Error loading CSV file: " + e.getMessage() + 
                "\nPlease ensure MOCK_DATA.csv is in the same directory.",
                "Error", JOptionPane.ERROR_MESSAGE);
            e.printStackTrace();
        }
    }
    
    private void filterTable() {
        String query = searchField.getText().trim();
        tableModel.setRowCount(0);
        
        for (Student student : allStudents) {
            if (query.isEmpty() || student.matches(query)) {
                tableModel.addRow(student.toArray());
            }
        }
        
        // Clear selection after re-filtering to avoid stale indices
        table.clearSelection();
        selectedRow = -1;
        updateButtonStates();
        updateRecordCount();
    }
    
    private void addRecord() {
        if (idField.getText().trim().isEmpty() || 
            firstNameField.getText().trim().isEmpty() || 
            lastNameField.getText().trim().isEmpty()) {
            JOptionPane.showMessageDialog(this,
                "Please fill in Student ID, First Name, and Last Name",
                "Validation Error", JOptionPane.WARNING_MESSAGE);
            return;
        }
        
        // Check for duplicate ID
        String newId = idField.getText().trim();
        for (Student s : allStudents) {
            if (s.studentId.equals(newId)) {
                JOptionPane.showMessageDialog(this,
                    "A student with this ID already exists!",
                    "Duplicate ID", JOptionPane.WARNING_MESSAGE);
                return;
            }
        }
        
        // Validate grades
        int[] grades = new int[5];
        for (int i = 0; i < gradeFields.length; i++) {
            String gradeText = gradeFields[i].getText().trim();
            if (gradeText.isEmpty()) {
                grades[i] = 0;
            } else {
                try {
                    grades[i] = Integer.parseInt(gradeText);
                    if (grades[i] < 0 || grades[i] > 100) {
                        JOptionPane.showMessageDialog(this,
                            "Grades must be between 0 and 100",
                            "Validation Error", JOptionPane.WARNING_MESSAGE);
                        return;
                    }
                } catch (NumberFormatException e) {
                    JOptionPane.showMessageDialog(this,
                        "Grades must be valid numbers",
                        "Validation Error", JOptionPane.WARNING_MESSAGE);
                    return;
                }
            }
        }
        
        Student newStudent = new Student(
            idField.getText().trim(),
            firstNameField.getText().trim(),
            lastNameField.getText().trim(),
            grades[0], grades[1], grades[2], grades[3], grades[4]
        );
        
        allStudents.add(newStudent);
        filterTable();
        clearFields();
        
        JOptionPane.showMessageDialog(this,
            "Record added successfully!",
            "Success", JOptionPane.INFORMATION_MESSAGE);
    }
    
    private void editSelectedRecord() {
        if (selectedRow < 0) {
            JOptionPane.showMessageDialog(this,
                "Please select a row to edit",
                "No Selection", JOptionPane.WARNING_MESSAGE);
            return;
        }
        
        // Get the student ID from the selected row
        String studentId = (String) tableModel.getValueAt(selectedRow, 0);
        
        // Find the student in allStudents
        Student studentToEdit = null;
        int studentIndex = -1;
        for (int i = 0; i < allStudents.size(); i++) {
            if (allStudents.get(i).studentId.equals(studentId)) {
                studentToEdit = allStudents.get(i);
                studentIndex = i;
                break;
            }
        }
        
        if (studentToEdit != null) {
            new EditDialog(this, studentToEdit, studentIndex);
        }
    }
    
    private void deleteRecord() {
        if (selectedRow < 0) {
            JOptionPane.showMessageDialog(this,
                "Please select a row to delete",
                "No Selection", JOptionPane.WARNING_MESSAGE);
            return;
        }
        
        String studentId = (String) tableModel.getValueAt(selectedRow, 0);
        String firstName = (String) tableModel.getValueAt(selectedRow, 1);
        String lastName = (String) tableModel.getValueAt(selectedRow, 2);
        
        int confirm = JOptionPane.showConfirmDialog(this,
            "Are you sure you want to delete this record?\n\n" +
            "Student ID: " + studentId + "\n" +
            "Name: " + firstName + " " + lastName,
            "Confirm Deletion", JOptionPane.YES_NO_OPTION);
        
        if (confirm == JOptionPane.YES_OPTION) {
            // Remove from allStudents
            allStudents.removeIf(s -> s.studentId.equals(studentId));
            filterTable();
            selectedRow = -1;
            updateButtonStates();
            
            JOptionPane.showMessageDialog(this,
                "Record deleted successfully!",
                "Success", JOptionPane.INFORMATION_MESSAGE);
        }
    }
    
    private void clearFields() {
        idField.setText("");
        firstNameField.setText("");
        lastNameField.setText("");
        for (JTextField field : gradeFields) {
            field.setText("");
        }
        idField.requestFocus();
    }


    
    private void updateRecordCount() {
        recordCountLabel.setText("Total Records: " + tableModel.getRowCount() + 
            (tableModel.getRowCount() < allStudents.size() ? 
                " (filtered from " + allStudents.size() + ")" : ""));
    }
    
    private void updateButtonStates() {
        boolean hasSelection = selectedRow >= 0;
        editButton.setEnabled(hasSelection);
        deleteButton.setEnabled(hasSelection);
    }
    
    // Edit Dialog Window
    class EditDialog extends JDialog {
        private Student student;
        private int studentIndex;
        private JTextField firstNameField, lastNameField;
        private JTextField[] gradeFields;
        
        public EditDialog(JFrame parent, Student student, int index) {
            super(parent, "Edit Student Record", true);
            this.student = student;
            this.studentIndex = index;
            
            setSize(700, 450);
            setLocationRelativeTo(parent);
            setResizable(false);
            
            initComponents();
            setVisible(true);
        }
        
        private void initComponents() {
            JPanel mainPanel = new JPanel(new BorderLayout());
            mainPanel.setBackground(Color.WHITE);
            
            // Header
            JPanel headerPanel = new JPanel(new BorderLayout());
            headerPanel.setBackground(UPHSD_MAROON);
            headerPanel.setBorder(BorderFactory.createEmptyBorder(20, 20, 20, 20));
            
            JLabel titleLabel = new JLabel("Edit Student Record");
            titleLabel.setFont(new Font("Segoe UI", Font.BOLD, 22));
            titleLabel.setForeground(UPHSD_GOLD);
            
            headerPanel.add(titleLabel, BorderLayout.WEST);
            mainPanel.add(headerPanel, BorderLayout.NORTH);
            
            // Form panel
            JPanel formPanel = new JPanel(new GridBagLayout());
            formPanel.setBackground(Color.WHITE);
            formPanel.setBorder(BorderFactory.createEmptyBorder(30, 30, 30, 30));
            
            GridBagConstraints gbc = new GridBagConstraints();
            gbc.fill = GridBagConstraints.HORIZONTAL;
            gbc.insets = new Insets(8, 8, 8, 8);
            
            // Student ID (read-only)
            gbc.gridx = 0; gbc.gridy = 0;
            gbc.weightx = 0.0;
            formPanel.add(createLabel("Student ID:"), gbc);
            
            gbc.gridx = 1;
            gbc.weightx = 1.0;
            JTextField idField = createStyledTextField();
            idField.setText(student.studentId);
            idField.setEditable(false);
            idField.setBackground(new Color(240, 240, 240));
            formPanel.add(idField, gbc);
            
            // First Name
            gbc.gridx = 0; gbc.gridy = 1;
            gbc.weightx = 0.0;
            formPanel.add(createLabel("First Name:"), gbc);
            
            gbc.gridx = 1;
            gbc.weightx = 1.0;
            firstNameField = createStyledTextField();
            firstNameField.setText(student.firstName);
            formPanel.add(firstNameField, gbc);
            
            // Last Name
            gbc.gridx = 0; gbc.gridy = 2;
            gbc.weightx = 0.0;
            formPanel.add(createLabel("Last Name:"), gbc);
            
            gbc.gridx = 1;
            gbc.weightx = 1.0;
            lastNameField = createStyledTextField();
            lastNameField.setText(student.lastName);
            formPanel.add(lastNameField, gbc);
            
            // Grades
            gradeFields = new JTextField[5];
            String[] labels = {"LAB WORK 1:", "LAB WORK 2:", "LAB WORK 3:", "PRELIM EXAM:", "ATTENDANCE:"};
            int[] values = {student.lab1, student.lab2, student.lab3, student.exam, student.attendance};
            
            for (int i = 0; i < 5; i++) {
                gbc.gridx = 0; gbc.gridy = 3 + i;
                gbc.weightx = 0.0;
                formPanel.add(createLabel(labels[i]), gbc);
                
                gbc.gridx = 1;
                gbc.weightx = 1.0;
                gradeFields[i] = createStyledTextField();
                gradeFields[i].setText(String.valueOf(values[i]));
                formPanel.add(gradeFields[i], gbc);
            }
            
            mainPanel.add(formPanel, BorderLayout.CENTER);
            
            // Button panel
            JPanel buttonPanel = new JPanel(new FlowLayout(FlowLayout.RIGHT, 10, 15));
            buttonPanel.setBackground(Color.WHITE);
            buttonPanel.setBorder(BorderFactory.createEmptyBorder(0, 30, 20, 30));
            
            JButton cancelBtn = createStyledButton("Cancel", new Color(108, 117, 125), Color.WHITE);
            cancelBtn.addActionListener(e -> dispose());
            
            JButton saveBtn = createStyledButton("Save Changes", new Color(40, 167, 69), Color.WHITE);
            saveBtn.addActionListener(e -> saveChanges());
            
            buttonPanel.add(cancelBtn);
            buttonPanel.add(saveBtn);
            
            mainPanel.add(buttonPanel, BorderLayout.SOUTH);
            
            add(mainPanel);
        }
        
        private JLabel createLabel(String text) {
            JLabel label = new JLabel(text);
            label.setFont(new Font("Segoe UI", Font.BOLD, 13));
            label.setForeground(HEADER_BG);
            return label;
        }
        
        private void saveChanges() {
            String firstName = firstNameField.getText().trim();
            String lastName = lastNameField.getText().trim();
            
            if (firstName.isEmpty() || lastName.isEmpty()) {
                JOptionPane.showMessageDialog(this,
                    "First Name and Last Name are required!",
                    "Validation Error", JOptionPane.WARNING_MESSAGE);
                return;
            }
            
            // Validate grades
            int[] grades = new int[5];
            for (int i = 0; i < gradeFields.length; i++) {
                try {
                    grades[i] = Integer.parseInt(gradeFields[i].getText().trim());
                    if (grades[i] < 0 || grades[i] > 100) {
                        JOptionPane.showMessageDialog(this,
                            "Grades must be between 0 and 100",
                            "Validation Error", JOptionPane.WARNING_MESSAGE);
                        return;
                    }
                } catch (NumberFormatException e) {
                    JOptionPane.showMessageDialog(this,
                        "Grades must be valid numbers",
                        "Validation Error", JOptionPane.WARNING_MESSAGE);
                    return;
                }
            }
            
            // Update student
            student.firstName = firstName;
            student.lastName = lastName;
            student.lab1 = grades[0];
            student.lab2 = grades[1];
            student.lab3 = grades[2];
            student.exam = grades[3];
            student.attendance = grades[4];
            
            filterTable();
            dispose();
            
            JOptionPane.showMessageDialog(StudentRecordSystem.this,
                "Record updated successfully!",
                "Success", JOptionPane.INFORMATION_MESSAGE);
        }
    }
    
    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> new StudentRecordSystem());
    }
}