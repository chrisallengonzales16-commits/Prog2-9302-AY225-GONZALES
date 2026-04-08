/*
 * =====================================================
 * Student   : GONZALES, CHRIS ALLEN S.
 * Course    : Math 101 - Linear Algebra
 * Campus    : UPHSD Molino Campus
 * Assignment: Assignment 01 - 3x3 Matrix Determinant Solver
 * Date      : 2026-04-08
 * Description: This Node.js script computes the determinant
 *              of a hardcoded 3x3 matrix using cofactor
 *              expansion along the first row. Every calculation
 *              step is printed to the console in a clear,
 *              textbook-style format.
 * =====================================================
 */

// -------------------------------------------------------
// Computes the determinant of a 2x2 sub-matrix given
// its four individual cell values arranged as:
//   | a  b |
//   | c  d |
// Formula: (a * d) - (b * c)
// -------------------------------------------------------
const computeMinor = (a, b, c, d) => (a * d) - (b * c);

// -------------------------------------------------------
// Prints the 3x3 matrix as a formatted grid to the console
// -------------------------------------------------------
const printMatrix = (m) => {
    console.log(`  |  ${m[0][0]}   ${m[0][1]}   ${m[0][2]}  |`);
    console.log(`  |  ${m[1][0]}   ${m[1][1]}   ${m[1][2]}  |`);
    console.log(`  |  ${m[2][0]}   ${m[2][1]}   ${m[2][2]}  |`);
};

// -------------------------------------------------------
// Runs the full cofactor expansion along Row 1,
// printing each step, then returns the final determinant
// -------------------------------------------------------
const solveDeterminant = (m) => {

    console.log("===================================================");
    console.log("  3x3 MATRIX DETERMINANT SOLVER");
    console.log("  Student: GONZALES, CHRIS ALLEN S.");
    console.log("  Assigned Matrix:");
    console.log("===================================================");
    printMatrix(m);
    console.log("===================================================");
    console.log();
    console.log("Expanding along Row 1 (cofactor expansion):");
    console.log();

    // --- Step 1: Minor M11 — delete row 0 and column 0 ---
    const minor11 = computeMinor(m[1][1], m[1][2], m[2][1], m[2][2]);
    console.log(
        `  Step 1 - Minor M11: det([${m[1][1]},${m[1][2]}],[${m[2][1]},${m[2][2]}])` +
        ` = (${m[1][1]}x${m[2][2]}) - (${m[1][2]}x${m[2][1]})` +
        ` = ${m[1][1] * m[2][2]} - ${m[1][2] * m[2][1]} = ${minor11}`
    );

    // --- Step 2: Minor M12 — delete row 0 and column 1 ---
    const minor12 = computeMinor(m[1][0], m[1][2], m[2][0], m[2][2]);
    console.log(
        `  Step 2 - Minor M12: det([${m[1][0]},${m[1][2]}],[${m[2][0]},${m[2][2]}])` +
        ` = (${m[1][0]}x${m[2][2]}) - (${m[1][2]}x${m[2][0]})` +
        ` = ${m[1][0] * m[2][2]} - ${m[1][2] * m[2][0]} = ${minor12}`
    );

    // --- Step 3: Minor M13 — delete row 0 and column 2 ---
    const minor13 = computeMinor(m[1][0], m[1][1], m[2][0], m[2][1]);
    console.log(
        `  Step 3 - Minor M13: det([${m[1][0]},${m[1][1]}],[${m[2][0]},${m[2][1]}])` +
        ` = (${m[1][0]}x${m[2][1]}) - (${m[1][1]}x${m[2][0]})` +
        ` = ${m[1][0] * m[2][1]} - ${m[1][1] * m[2][0]} = ${minor13}`
    );

    console.log();

    // --- Apply cofactor signs (+1, -1, +1) and multiply by first-row elements ---
    const term1 =  m[0][0] * minor11;   // positive sign
    const term2 = -m[0][1] * minor12;   // negative sign
    const term3 =  m[0][2] * minor13;   // positive sign

    console.log(`  Cofactor C11 = (+1) x ${m[0][0]} x ${minor11} = ${term1}`);
    console.log(`  Cofactor C12 = (-1) x ${m[0][1]} x ${minor12} = ${term2}`);
    console.log(`  Cofactor C13 = (+1) x ${m[0][2]} x ${minor13} = ${term3}`);

    console.log();

    // --- Sum the three cofactor terms to arrive at the final determinant ---
    const det = term1 + term2 + term3;
    console.log(`  det(M) = ${term1} + (${term2}) + ${term3}`);
    console.log();
    console.log("===================================================");

    // --- Explicitly handle the singular (zero determinant) case ---
    if (det === 0) {
        console.log("  The matrix is SINGULAR - it has no inverse.");
    } else {
        console.log(`  \u2713  DETERMINANT = ${det}`);
    }

    console.log("===================================================");

    return det;
};

// -------------------------------------------------------
// Declare the assigned matrix and launch the solver
// -------------------------------------------------------

// Matrix assigned to GONZALES, CHRIS ALLEN S.
const matrix = [
    [1, 5, 3],
    [4, 2, 6],
    [3, 1, 4]
];

// Run the step-by-step determinant computation
solveDeterminant(matrix);
