# Assignment 01 — 3×3 Matrix Determinant Solver

## Student Information

|Field|Details|
|-|-|
|**Name**|GONZALES, CHRIS ALLEN S.|
|**Course**|BSCSIT 1203L 9302-AY225 (Programming 2 - Lab)|
|**Campus**|UPHSD Molino Campus|
|**Assignment**|Assignment 01 – 3×3 Matrix Determinant Solver|

\---

## Assigned Matrix

```
| 1  5  3 |
| 4  2  6 |
| 3  1  4 |
```

\---

## How to Run

### Java

```bash
# Compile
javac DeterminantSolver.java

# Run
java DeterminantSolver
```

### JavaScript (Node.js)

```bash
node determinant\\\_solver.js
```

\---

## Sample Output

```
===================================================
  3x3 MATRIX DETERMINANT SOLVER
  Student: GONZALES, CHRIS ALLEN S.
  Assigned Matrix:
===================================================
  |  1   5   3  |
  |  4   2   6  |
  |  3   1   4  |
===================================================

Expanding along Row 1 (cofactor expansion):

  Step 1 - Minor M11: det(\\\[2,6],\\\[1,4]) = (2x4) - (6x1) = 8 - 6 = 2
  Step 2 - Minor M12: det(\\\[4,6],\\\[3,4]) = (4x4) - (6x3) = 16 - 18 = -2
  Step 3 - Minor M13: det(\\\[4,2],\\\[3,1]) = (4x1) - (2x3) = 4 - 6 = -2

  Cofactor C11 = (+1) x 1 x 2 = 2
  Cofactor C12 = (-1) x 5 x -2 = 10
  Cofactor C13 = (+1) x 3 x -2 = -6

  det(M) = 2 + (10) + -6

===================================================
  ✓  DETERMINANT = 6
===================================================
```

\---

## Final Determinant Value

**det(M) = 6**

The matrix is **non-singular** — it has an inverse.

\---

## Repository Structure

```
uphsd-cs-gonzales-chrisallen/
├── linear-algebra/
│   └── assignment-01/
│       ├── DeterminantSolver.java
│       ├── determinant\\\_solver.js
│       └── README.md
└── README.md
```

