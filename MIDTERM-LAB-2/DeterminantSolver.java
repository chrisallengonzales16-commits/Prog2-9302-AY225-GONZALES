/*
 * =====================================================
 * Student   : GONZALES, CHRIS ALLEN S.
 * Course    : Math 101 - Linear Algebra
 * Campus    : UPHSD Molino Campus
 * Assignment: Assignment 01 - 3x3 Matrix Determinant Solver
 * Date      : 2026-04-08
 * Description: This program computes the determinant of a
 *              hardcoded 3x3 matrix using cofactor expansion
 *              along the first row. It prints every step of
 *              the solution in a human-readable format.
 * =====================================================
 */

public class DeterminantSolver {

    // -------------------------------------------------------
    // Computes the determinant of a 2x2 minor given four values:
    //   | a  b |
    //   | c  d |
    // Returns (a * d) - (b * c)
    // -------------------------------------------------------
    public static int computeMinor(int a, int b, int c, int d) {
        return (a * d) - (b * c);
    }

    // -------------------------------------------------------
    // Prints the 3x3 matrix in a formatted, readable grid
    // -------------------------------------------------------
    public static void printMatrix(int[][] m) {
        System.out.println("  |  " + m[0][0] + "   " + m[0][1] + "   " + m[0][2] + "  |");
        System.out.println("  |  " + m[1][0] + "   " + m[1][1] + "   " + m[1][2] + "  |");
        System.out.println("  |  " + m[2][0] + "   " + m[2][1] + "   " + m[2][2] + "  |");
    }

    // -------------------------------------------------------
    // Performs cofactor expansion along Row 1 and prints
    // each intermediate step, then returns the final determinant
    // -------------------------------------------------------
    public static int solveDeterminant(int[][] m) {

        System.out.println("===================================================");
        System.out.println("  3x3 MATRIX DETERMINANT SOLVER");
        System.out.println("  Student: GONZALES, CHRIS ALLEN S.");
        System.out.println("  Assigned Matrix:");
        System.out.println("===================================================");
        printMatrix(m);
        System.out.println("===================================================");
        System.out.println();
        System.out.println("Expanding along Row 1 (cofactor expansion):");
        System.out.println();

        // --- Step 1: Compute the 2x2 minor M11 (exclude row 0, col 0) ---
        int minor11 = computeMinor(m[1][1], m[1][2], m[2][1], m[2][2]);
        System.out.println("  Step 1 - Minor M11: det([" + m[1][1] + "," + m[1][2] + "],[" +
                m[2][1] + "," + m[2][2] + "]) = (" + m[1][1] + "x" + m[2][2] + ") - (" +
                m[1][2] + "x" + m[2][1] + ") = " + (m[1][1] * m[2][2]) + " - " +
                (m[1][2] * m[2][1]) + " = " + minor11);

        // --- Step 2: Compute the 2x2 minor M12 (exclude row 0, col 1) ---
        int minor12 = computeMinor(m[1][0], m[1][2], m[2][0], m[2][2]);
        System.out.println("  Step 2 - Minor M12: det([" + m[1][0] + "," + m[1][2] + "],[" +
                m[2][0] + "," + m[2][2] + "]) = (" + m[1][0] + "x" + m[2][2] + ") - (" +
                m[1][2] + "x" + m[2][0] + ") = " + (m[1][0] * m[2][2]) + " - " +
                (m[1][2] * m[2][0]) + " = " + minor12);

        // --- Step 3: Compute the 2x2 minor M13 (exclude row 0, col 2) ---
        int minor13 = computeMinor(m[1][0], m[1][1], m[2][0], m[2][1]);
        System.out.println("  Step 3 - Minor M13: det([" + m[1][0] + "," + m[1][1] + "],[" +
                m[2][0] + "," + m[2][1] + "]) = (" + m[1][0] + "x" + m[2][1] + ") - (" +
                m[1][1] + "x" + m[2][0] + ") = " + (m[1][0] * m[2][1]) + " - " +
                (m[1][1] * m[2][0]) + " = " + minor13);

        System.out.println();

        // --- Compute each cofactor term using signs (+, -, +) ---
        int term1 =  m[0][0] * minor11;   // sign = +1
        int term2 = -m[0][1] * minor12;   // sign = -1
        int term3 =  m[0][2] * minor13;   // sign = +1

        System.out.println("  Cofactor C11 = (+1) x " + m[0][0] + " x " + minor11 + " = " + term1);
        System.out.println("  Cofactor C12 = (-1) x " + m[0][1] + " x " + minor12 + " = " + term2);
        System.out.println("  Cofactor C13 = (+1) x " + m[0][2] + " x " + minor13 + " = " + term3);

        System.out.println();

        // --- Sum all cofactor terms to get the final determinant ---
        int det = term1 + term2 + term3;
        System.out.println("  det(M) = " + term1 + " + (" + term2 + ") + " + term3);
        System.out.println();
        System.out.println("===================================================");

        // --- Check for singular matrix (determinant equals zero) ---
        if (det == 0) {
            System.out.println("  The matrix is SINGULAR - it has no inverse.");
        } else {
            System.out.println("  \u2713  DETERMINANT = " + det);
        }

        System.out.println("===================================================");

        return det;
    }

    // -------------------------------------------------------
    // Entry point: declare the assigned matrix and run solver
    // -------------------------------------------------------
    public static void main(String[] args) {

        // Assigned matrix for GONZALES, CHRIS ALLEN S.
        int[][] matrix = {
            { 1, 5, 3 },
            { 4, 2, 6 },
            { 3, 1, 4 }
        };

        // Run the full step-by-step determinant solution
        solveDeterminant(matrix);
    }
}
