import { Component } from '@angular/core';

@Component({
  selector: 'app-pgsql-demo',
  standalone: false,
  templateUrl: './pgsql-demo.html',
  styleUrl: './pgsql-demo.css',
})
export class PgsqlDemo {

  pgsqlSections = [

{
  title: '1. DDL (Data Definition Language)',
  icon: '🏗️',

  purpose: `Used to define and modify database structures. DDL changes metadata/schema objects.  `,

  commands: `
CREATE
ALTER
DROP
TRUNCATE
RENAME
  `,

  query: `-- Create Table
CREATE TABLE employees(
    employee_id INT PRIMARY KEY,
    first_name VARCHAR(50),
    salary NUMERIC
);

-- Add Column
ALTER TABLE employees ADD COLUMN email VARCHAR(100);

-- Rename Column
ALTER TABLE employees RENAME COLUMN first_name TO employee_name;

-- Remove Table
DROP TABLE employees;`,

  output: `
Structure Created

Table Modified

Table Deleted  `,

  interview: `DDL changes database structure. Mostly auto-committed.`
},

{
  title: '2. DML (Data Manipulation Language)',
  icon: '✍️',

  purpose: `Used to insert, update and delete data. Works on table records.`,

  commands: `
INSERT
UPDATE
DELETE`,

  query: `
-- Insert
INSERT INTO employees VALUES(101,'John',50000);

-- Update
UPDATE employees SET salary = 60000 WHERE employee_id = 101;

-- Delete

DELETE FROM employees WHERE employee_id = 101;`,

  output: `
Record Inserted

Record Updated

Record Deleted`,

  interview: `DML changes data, not table structure.`
},

{
  title: '3. DQL (Data Query Language)',
  icon: '🔍',

  purpose: `
Used to retrieve data from database.
  `,

  commands: `
SELECT
  `,

  query: `SELECT employee_id, first_name, salary FROM employees WHERE salary > 50000 ORDER BY salary DESC;`,

  output: `
102 Emma 70000

103 Mike 90000`,

  interview: `DQL only reads data. No modifications.`
},

{
  title: '4. TCL (Transaction Control Language)',
  icon: '💳',

  purpose: `
Manage transactions.

Control when changes become permanent.
  `,

  commands: `
COMMIT
ROLLBACK
SAVEPOINT
  `,

  query: `BEGIN;

UPDATE accounts SET balance = balance - 500 WHERE account_id = 101;

UPDATE accounts SET balance = balance + 500 WHERE account_id = 102;

COMMIT;`,

  output: `
Transaction Successful

Changes Saved Permanently  `,

  interview: `COMMIT
Makes Changes Permanent

ROLLBACK
Undo Changes

SAVEPOINT
Partial Rollback Point

Can ROLLBACK Undo a COMMIT?
==========================
No.

Once a COMMIT is executed, all changes made in the current transaction are permanently saved to the database.

After a COMMIT:
• The transaction is completed.
• All changes become permanent.
• Any SAVEPOINTS created during the transaction are removed.
• ROLLBACK can no longer undo those committed changes.

Example
--------
BEGIN;

UPDATE employees SET salary = salary + 5000 WHERE id = 101;

COMMIT;

ROLLBACK;   -- Has no effect

Result: The salary update remains saved because COMMIT already finalized the transaction.


Transaction Commands
====================
┌────────────┬──────────────────────────────────────────────────┬──────────────────────────────┐
│ Command    │ Purpose                                          │ Can ROLLBACK Undo It?        │
├────────────┼──────────────────────────────────────────────────┼──────────────────────────────┤
│ COMMIT     │ Permanently saves all transaction changes.       │ No                           │
├────────────┼──────────────────────────────────────────────────┼──────────────────────────────┤
│ ROLLBACK   │ Cancels all uncommitted changes.                 │ N/A (This is the undo action)│
├────────────┼──────────────────────────────────────────────────┼──────────────────────────────┤
│ SAVEPOINT  │ Creates a checkpoint inside a transaction.       │ Yes, using ROLLBACK TO       │
│            │                                                  │ savepoint_name               │
└────────────┴──────────────────────────────────────────────────┴──────────────────────────────┘

SAVEPOINT Example
=================
BEGIN;

INSERT INTO employees VALUES (101, 'John');

SAVEPOINT sp1;

UPDATE employees SET salary = 50000 WHERE id = 101;

ROLLBACK TO sp1;
COMMIT;

Result:
✓ INSERT remains.
✗ UPDATE is undone.

Because ROLLBACK TO sp1 only reverses the changes made after the SAVEPOINT.


Key Rule
========

COMMIT  → Makes changes permanent.
ROLLBACK → Undoes uncommitted changes.
SAVEPOINT → Allows partial rollback within a transaction.

Once COMMIT is executed, the changes cannot be reversed using ROLLBACK.
`},

{
  title: 'ROLLBACK Example',
  icon: '↩️',

  purpose: `Undo transaction changes.`,

  input: `Balance = 10000`,
  query: `BEGIN;
UPDATE accounts SET balance = 5000 WHERE account_id = 101;
ROLLBACK;`,
  output: `
Before
10000
↓
After Rollback
10000`
},

{
  title: 'SAVEPOINT Example',
  icon: '📍',

  purpose: `Rollback to a specific point.`,

  query: `BEGIN;
INSERT INTO employees VALUES(101,'John',50000);

SAVEPOINT employee_save;
INSERT INTO employees VALUES(102,'Emma',70000);

ROLLBACK TO employee_save;
COMMIT;
  `,

  output: `101 John 50000 
  Emma Record Removed`
},

{
  title: '5.DCL (Data Control Language)',
  icon: '🔐',

  purpose: `Manage permissions and security.`,

  commands: `GRANT
REVOKE`,

  query: `-- Give Access
GRANT SELECT ON employees TO analyst_user;

-- Remove Access
REVOKE SELECT ON employees FROM analyst_user;
  `,

  output: `Permission Granted

Permission Removed`,

  interview: `
Controls user privileges.
  `
},

{
  title: 'CREATE vs INSERT',
  icon: '⚖️',

  purpose: `
Common Interview Question.
  `,

  query: `
CREATE TABLE employees(
    employee_id INT,
    first_name TEXT
);

INSERT INTO employees
VALUES(
    101,
    'John'
);
  `,

  output: `CREATE
Creates Structure

INSERT
Adds Data  `
},

{

  
  title: 'DROP vs TRUNCATE vs DELETE',
  icon: '🗑️',

  purpose: `
Frequently Asked Interview Topic.
  `,

  query: `
DELETE FROM employees;

TRUNCATE TABLE employees;

DROP TABLE employees;
  `,

  output: `DELETE
------
Removes Rows Can Use WHERE

TRUNCATE
--------
Removes All Rows No WHERE Used

DROP
----
Removes Entire Table`
},

{
  title: 'COMMIT vs ROLLBACK',
  icon: '⚖️',

  purpose: `Transaction Interview Question.`,

  query: `BEGIN;
UPDATE employees SET salary = 90000;
COMMIT;

BEGIN;
UPDATE employees SET salary = 1000;
ROLLBACK;`,
  output: `COMMIT
Changes Saved

ROLLBACK
Changes Undone`
}
];
  sqlScript = `
-- =========================================================
-- DEPARTMENTS TABLE
-- =========================================================

CREATE TABLE departments (
    department_id INT PRIMARY KEY,
    department_name VARCHAR(100)
);

INSERT INTO departments VALUES
(1, 'Engineering'),
(2, 'HR'),
(3, 'Sales'),
(4, 'Marketing'),
(5, 'Finance');

-- =========================================================
-- EMPLOYEES TABLE
-- =========================================================

CREATE TABLE employees (
    employee_id INT PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    gender VARCHAR(10),
    age INT,
    salary DECIMAL(10,2),
    department_id INT,
    manager_id INT,
    hire_date DATE,
    city VARCHAR(100),

    FOREIGN KEY (department_id)
    REFERENCES departments(department_id)
);

INSERT INTO employees VALUES
(101, 'John', 'Doe', 'Male', 30, 70000, 1, NULL, '2020-01-15', 'New York'),
(102, 'Emma', 'Smith', 'Female', 28, 65000, 1, 101, '2021-03-10', 'Chicago');

-- =========================================================
-- CUSTOMERS TABLE
-- =========================================================

CREATE TABLE customers (
    customer_id INT PRIMARY KEY,
    customer_name VARCHAR(100),
    email VARCHAR(150),
    city VARCHAR(100),
    country VARCHAR(100),
    signup_date DATE
);

INSERT INTO customers VALUES
(1, 'Alice Johnson', 'alice@gmail.com', 'New York', 'USA', '2022-01-10');

-- =========================================================
-- PRODUCTS TABLE
-- =========================================================

DROP TABLE IF EXISTS products CASCADE;

CREATE TABLE products (
    product_id INT PRIMARY KEY,
    product_name VARCHAR(100),
    category VARCHAR(100),
    price DECIMAL(10,2),
    stock INT
);

INSERT INTO products VALUES
(201, 'Laptop', 'Electronics', 1200, 15);

-- =========================================================
-- ORDERS TABLE
-- =========================================================

CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    customer_id INT,
    order_date DATE,
    status VARCHAR(50),

    FOREIGN KEY (customer_id)
    REFERENCES customers(customer_id)
);

-- =========================================================
-- ORDER ITEMS TABLE
-- =========================================================

CREATE TABLE order_items (
    order_item_id INT PRIMARY KEY,
    order_id INT,
    product_id INT,
    quantity INT,

    FOREIGN KEY (order_id)
    REFERENCES orders(order_id),

    FOREIGN KEY (product_id)
    REFERENCES products(product_id)
);

-- =========================================================
-- PAYMENTS TABLE
-- =========================================================

CREATE TABLE payments (
    payment_id INT PRIMARY KEY,
    order_id INT,
    payment_date DATE,
    amount DECIMAL(10,2),
    payment_method VARCHAR(50),

    FOREIGN KEY (order_id)
    REFERENCES orders(order_id)
);`;
  constraints = [
    {
      title: 'PRIMARY KEY',
      definition: 'Uniquely identifies each row.',
      sql: `employee_id INT PRIMARY KEY`,
      valid: `101\n102\n103`,
      invalid: `101\n102\n101 ❌ Duplicate`
    },
    {
      title: 'FOREIGN KEY',
      definition: 'Creates relationship between tables.',
      sql: `FOREIGN KEY (department_id)
REFERENCES departments(department_id)`,
      valid: `department_id = 1`,
      invalid: `department_id = 99 ❌`
    },
    {
      title: 'UNIQUE',
      definition: 'Prevents duplicate values.',
      sql: `email VARCHAR(100) UNIQUE`,
      valid: `john@gmail.com
emma@gmail.com`,
      invalid: `john@gmail.com
john@gmail.com ❌`
    },
    {
      title: 'NOT NULL',
      definition: 'Column cannot contain NULL.',
      sql: `name VARCHAR(100) NOT NULL`,
      valid: `John`,
      invalid: `NULL ❌`
    },
    {
      title: 'CHECK',
      definition: 'Validates a condition.',
      sql: `salary DECIMAL CHECK(salary > 0)`,
      valid: `50000`,
      invalid: `-5000 ❌`
    },
    {
      title: 'DEFAULT',
      definition: 'Provides automatic value.',
      sql: `status VARCHAR(20) DEFAULT 'Pending'`,
      valid: `Pending`,
      invalid: `No default specified`
    }
  ];

  indexes = [
    {
      title: 'Clustered Index',
      description: 'Actual table data is physically sorted.',
      example: `
101
102
103
104
105`
    },
    {
      title: 'Non Clustered Index',
      description: 'Separate lookup structure.',
      example: `
Emma  -> Row 102
John  -> Row 101
Liam  -> Row 104
Sophia-> Row 103`
    }
  ];

bPlusTree = `
B+ Tree is the most commonly used data structure behind database indexes.

Examples:
- Primary Key Index
- Clustered Index
- Non-Clustered Index

Why databases use it?

✅ Very fast searching
✅ Very fast range queries
✅ Keeps data sorted
✅ Requires fewer disk reads
✅ Balanced tree (same height everywhere)

Instead of scanning every row:

SELECT * FROM employees WHERE id = 107;

Database uses the B+ Tree index to directly navigate to the required value.

Think of it like: Book → Chapter → Page

You don't read every page. You jump directly using the index.

                      [105]
                    /       \\

            [103]             [108]
           /     \\           /     \\

      [101,102] [103,104] [105,106,107] [108,109,110]

       (Leaf)     (Leaf)      (Leaf)        (Leaf)

Find Employee Id = 107

Step 1: Root Node
        [105]
107 > 105
Move Right
        ↓
Step 2: Internal Node
       [108]
107 < 108
Move Left
        ↓
Step 3: Leaf Node
[105,106,107]
Found ✅`;

  relationshipDiagram = `
DEPARTMENTS
┌───────────────┐
│ department_id │ PK
└───────┬───────┘
        │ FK
        ▼

EMPLOYEES
┌───────────────┐
│ employee_id   │ PK
│ department_id │ FK
└───────────────┘


CUSTOMERS
┌───────────────┐
│ customer_id   │ PK
└───────┬───────┘
        │ FK
        ▼

ORDERS
┌───────────────┐
│ order_id      │ PK
│ customer_id   │ FK
└───────┬───────┘
        │ FK
        ▼

ORDER_ITEMS
┌───────────────┐
│ order_item_id │ PK
│ order_id      │ FK
│ product_id    │ FK
└───────────────┘

`;

alterCommands = [

    {
      title: 'Rename Column',
      icon: '✏️',
      description: 'Changes an existing column name.',

      before: `
customers
---------------------------------
customer_id
customer_name
email
city
country
signup_date
      `,

      sql: `
ALTER TABLE customers
RENAME COLUMN signup_date
TO start_date;
      `,

      after: `
customers
---------------------------------
customer_id
customer_name
email
city
country
start_date
      `,

      note: 'Only the column name changes. Data remains unchanged.'
    },

    {
      title: 'Add Column',
      icon: '➕',
      description: 'Adds a new column to a table.',

      before: `
departments
-------------------
department_id
department_name
      `,

      sql: `
ALTER TABLE departments
ADD COLUMN average_salary INTEGER;
      `,

      after: `
departments
-------------------
department_id
department_name
average_salary
      `,

      note: 'Existing rows get NULL value initially.'
    },

    {
      title: 'Add Column With Default',
      icon: '🆕',
      description: 'Adds a column with a default value.',

      before: `
orders
-------------------
order_id
customer_id
order_date
status
      `,

      sql: `
ALTER TABLE orders
ADD COLUMN order_item
VARCHAR NOT NULL
DEFAULT '';
      `,

      after: `
orders
-------------------
order_id
customer_id
order_date
status
order_item
      `,

      note: 'All existing rows receive the default value.'
    },

    {
      title: 'Add Boolean Column',
      icon: '✅',
      description: 'Adds a boolean flag column.',

      before: `
payments
-------------------
payment_id
order_id
amount
payment_method
      `,

      sql: `
ALTER TABLE payments
ADD COLUMN payment_status
BOOLEAN NOT NULL
DEFAULT FALSE;
      `,

      after: `
payments
-------------------
payment_id
order_id
amount
payment_method
payment_status
      `,

      note: 'Useful for Active/Inactive, Paid/Unpaid flags.'
    },

    {
      title: 'Drop Column',
      icon: '🗑️',
      description: 'Removes a column permanently.',

      before: `
products
-------------------
product_id
product_name
category
price
stock
      `,

      sql: `
ALTER TABLE products
DROP COLUMN stock;
      `,

      after: `
products
-------------------
product_id
product_name
category
price
      `,

      note: 'Column and all data inside it are permanently deleted.'
    }

  ];

   updateExamples = [

    {
      title: 'Update Multiple Columns',
      icon: '📝',
      description: 'Update multiple columns in a single query.',

      sql: `
UPDATE customers
SET country = 'Canada',
    city = 'VanCovur'
WHERE city = 'Denver';
      `,

      explanation:
        'All customers from Denver are moved to VanCovur and country becomes Canada.'
    },

    {
      title: 'Update Entire Column',
      icon: '🔠',

      sql: `
UPDATE customers
SET city = UPPER(city);
      `,

      explanation:
        'Converts every city name into uppercase.'
    },

    {
      title: 'Update Using Another Column',
      icon: '➗',

      sql: `
UPDATE departments
SET average_salary =
    department_id * 100000;
      `,

      explanation:
        'Calculates value using existing column values.'
    },

    {
      title: 'Replace NULL Values',
      icon: '🚫',

      sql: `
UPDATE employees
SET manager_id = 105
WHERE manager_id IS NULL;
      `,

      explanation:
        'Assigns manager 105 to employees without managers.'
    },

    {
      title: 'Update Using Subquery',
      icon: '🔍',

      sql: `
UPDATE employees
SET salary = salary + 5000

WHERE department_id = (
  SELECT department_id
  FROM departments
  WHERE department_name = 'Sales'
);
      `,

      explanation:
        'Gives a hike only to employees working in Sales.'
    },

    {
      title: 'CASE Statement Update',
      icon: '⚡',

      sql: `
UPDATE employees
SET salary =
CASE
  WHEN salary < 70000
       THEN salary + 5000

  WHEN salary >= 70000
       THEN salary + 10000
END;
      `,

      explanation:
        'Different salary hikes based on conditions.'
    },

    {
      title: 'Date Based Update',
      icon: '📅',

      sql: `
UPDATE employees
SET salary = salary + 10000

WHERE hire_date < '2021-01-01';
      `,

      explanation:
        'Older employees receive a bonus.'
    },

    {
      title: 'Update Single Record',
      icon: '🎯',

      sql: `
UPDATE order_items
SET order_item = 'Desk'

WHERE product_id = 207;
      `,

      explanation:
        'Only one matching row gets updated.'
    },

    {
      title: 'Update Using MAX()',
      icon: '🏆',

      sql: `
UPDATE orders

SET status = 'Completed'

WHERE order_date =
(
  SELECT MAX(order_date)
  FROM orders
);
      `,

      explanation:
        'Latest order becomes Completed.'
    },

    {
      title: 'Boolean Update',
      icon: '✅',

      sql: `
UPDATE payments

SET payment_status = TRUE

WHERE payment_method = 'Cash';
      `,

      explanation:
        'Marks cash payments as successful.'
    },

    {
      title: 'Replace Existing Values',
      icon: '🔄',

      sql: `
UPDATE payments

SET payment_method = 'Google Pay'

WHERE payment_method = 'UPI';
      `,

      explanation:
        'Replaces one value with another.'
    },

    {
      title: 'Discount Product Price',
      icon: '💰',

      sql: `
UPDATE products

SET price = 200.00

WHERE product_id = 207;
      `,

      explanation:
        'Applies discount to a specific product.'
    },

    {
      title: 'Update Using JOIN/Subquery',
      icon: '🔗',

      sql: `
UPDATE products p SET stock = stock - oi.total_quantity
FROM (SELECT product_id, SUM(quantity) AS total_quantity FROM order_items GROUP BY product_id) oi
WHERE p.product_id = oi.product_id;`,

      explanation:
        'Reduces stock based on ordered quantities.'
    }

  ];

  sqlConcepts = [

{
  title: 'WHERE',
  icon: '🔍',

  purpose: 'Filters rows that satisfy a condition.',

  explanation: `WHERE is used to retrieve only the rows that match a specified condition.

SQL checks every row one by one.
If the condition is TRUE, the row is returned.
If FALSE, the row is ignored.

Think of it as: "Show me only the records I need."`,

  query: `
SELECT * FROM employees WHERE salary > 80000;`,

  demo: `
Employees

101 John      70000
102 Emma      65000
103 Michael   90000
104 Sophia    72000
105 James    120000
  `,

  processing: `
70000 > 80000 ❌
65000 > 80000 ❌
90000 > 80000 ✅
72000 > 80000 ❌
120000 > 80000 ✅
  `,

  result: `
103 Michael   90000
105 James    120000
  `
},

{
  title: 'ORDER BY',
  icon: '📈',

  purpose: 'Sorts records in ascending or descending order.',

  explanation: `ORDER BY arranges rows based on one or more columns.

ASC  -> Ascending (default)
DESC -> Descending

Think of it as: "Arrange the data neatly."
  `,

  query: `
SELECT * FROM employees ORDER BY salary DESC;
  `,

  demo: `
John      70000
Emma      65000
James    120000
Sophia    72000
  `,

  processing: `
Sorting salaries from highest to lowest

120000
72000
70000
65000
  `,

  result: `
James    120000
Sophia    72000
John      70000
Emma      65000
  `
},

{
  title: 'GROUP BY',
  icon: '📦',

  purpose: 'Groups similar rows together and performs aggregation.',

  explanation: `GROUP BY creates buckets of rows having the same value.

Usually used with:
COUNT()
SUM()
AVG()
MIN()
MAX()

Think of it as: "Put similar records into groups."
  `,

  query: `SELECT department_id, COUNT(*) AS employees FROM employees GROUP BY department_id;`,

  demo: `
Employee    Dept

John         1
Emma         1
Mike         1
Sophia       2
James        2
David        3
Sara         3
  `,

  processing: `
Dept 1 -> John, Emma, Mike
Dept 2 -> Sophia, James
Dept 3 -> David, Sara

Count:

Dept 1 -> 3
Dept 2 -> 2
Dept 3 -> 2
  `,

  result: `
Dept | Count
------------
1    | 3
2    | 2
3    | 2
  `
},

{
  title: 'HAVING',
  icon: '🎯',

  purpose: 'Filters grouped data after GROUP BY.',

  explanation: `HAVING works on groups.

WHERE filters rows.
HAVING filters groups.

Think of it as: "After creating groups, show only the groups matching a condition."
  `,

  query: `
SELECT department_id, COUNT(*) FROM employees GROUP BY department_id HAVING COUNT(*) > 2;
  `,

  demo: `
Dept | Count
------------
1    | 3
2    | 2
3    | 2
  `,

  processing: `
Dept 1 -> 3 > 2 ✅
Dept 2 -> 2 > 2 ❌
Dept 3 -> 2 > 2 ❌
  `,

  result: `
Dept | Count
------------
1    | 3
  `
},

{
  title: 'UNION',
  icon: '➕',

  purpose: 'Combines results and removes duplicates.',

  explanation: `UNION merges results from multiple SELECT statements.

Duplicate values are automatically removed.

Think of it as: "Merge and keep unique values only."`,

  query: `
SELECT city FROM customers UNION SELECT city FROM employees;
  `,

  demo: `
Customers

Chicago
Dallas
Boston
Chicago

Employees

Chicago
Seattle
Dallas
Miami
  `,

  processing: `
Combined:

Chicago
Dallas
Boston
Chicago
Chicago
Seattle
Dallas
Miami

Duplicates Removed
  `,

  result: `
Chicago
Dallas
Boston
Seattle
Miami
  `
},

{
  title: 'UNION ALL',
  icon: '🧾',

  purpose: 'Combines results and keeps duplicates.',

  explanation: `UNION ALL behaves like UNION but does not remove duplicates.

Since duplicate checking is skipped, it is usually faster than UNION.

Think of it as: "Merge everything exactly as it is."
  `,

  query: `SELECT city FROM customers UNION ALL SELECT city FROM employees;`,

  demo: `
Customers

Chicago
Dallas
Boston
Chicago

Employees

Chicago
Seattle
Dallas
Miami
  `,

  processing: `
All records combined.

No duplicate removal performed.
  `,

  result: `
Chicago
Dallas
Boston
Chicago
Chicago
Seattle
Dallas
Miami
  `
},

{
  title: 'INTERSECT',
  icon: '🎯',

  purpose: 'Returns common rows present in both queries.',

  explanation: `INTERSECT returns only the values that exist in both result sets.

Think of it as: "Show what both lists have in common."
  `,

  query: `SELECT city FROM customers INTERSECT SELECT city FROM employees;`,

  demo: `
Customers

Chicago
Dallas
Boston
New Orleans

Employees

Chicago
Dallas
Boston
Seattle
  `,

  processing: `
Common Cities:

Chicago ✅
Dallas ✅
Boston ✅
Seattle ❌
New Orleans ❌
  `,

  result: `
Chicago
Dallas
Boston
  `
},

{
  title: 'EXCEPT',
  icon: '➖',

  purpose: 'Returns rows present in first query but not in second.',

  explanation: `EXCEPT compares two result sets.
Rows existing in the second query are removed from the first query.
Think of it as: "Subtract second list from first list."
  `,

  query: `SELECT city FROM customers EXCEPT SELECT city FROM employees;`,

  demo: `
Customers

Chicago
Dallas
Boston
New Orleans
San Diego

Employees

Chicago
Dallas
Boston
Seattle
  `,

  processing: `
Remove common cities:

Chicago ❌
Dallas ❌
Boston ❌

Remaining:

New Orleans
San Diego
  `,

  result: `
New Orleans
San Diego
  `
}

  ];

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  scrollToSection(id: string): void {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  joinConcepts = [
    {
  title: 'INNER JOIN',
  icon: '🔗',

  purpose: 'Returns only matching rows from both tables.',

  explanation: `INNER JOIN returns records that have matching values in both tables.

If there is no match, the row is excluded.

Think of it as: "Show only common records."`,

  query: `SELECT e.name, d.department_name FROM employees e INNER JOIN departments d ON e.department_id = d.department_id;`,

  demo: `
Employees

EmpId | Name   | DeptId
------------------------
1     | John   | 1
2     | Emma   | 2
3     | Mike   | 4

Departments

DeptId | Department
-------------------
1      | HR
2      | IT
3      | Finance
  `,

  processing: `
John  -> Dept 1 -> Match ✅
Emma  -> Dept 2 -> Match ✅
Mike  -> Dept 4 -> No Match ❌
  `,

  result: `
John   HR
Emma   IT
  `
},

{
  title: 'LEFT JOIN == LEFT OUTER JOIN',
  icon: '⬅️',

  purpose: 'Returns all rows from left table and matching rows from right table.',

  explanation: `LEFT JOIN keeps every record from the left table.

If a matching row exists in the right table, its values are returned.

Otherwise NULL values are returned.

Think of it as: "Keep everything from left table."`,

  query: `SELECT e.name, d.department_name FROM employees e LEFT JOIN departments d ON e.department_id = d.department_id;`,

  demo: `
Employees

1 John  1
2 Emma  2
3 Mike  4

Departments

1 HR
2 IT
3 Finance
  `,

  processing: `
John -> Match HR
Emma -> Match IT
Mike -> No Match -> NULL
  `,

  result: `
John   HR
Emma   IT
Mike   NULL
  `
},

{
  title: 'RIGHT JOIN == Right Outer Join',
  icon: '➡️',

  purpose: 'Returns all rows from right table and matching rows from left table.',

  explanation: `RIGHT JOIN keeps every record from the right table.

If no matching row exists in the left table, NULL values appear for left table columns.

Think of it as: "Keep everything from right table."`,

  query: `SELECT e.name, d.department_name FROM employees e RIGHT JOIN departments d ON e.department_id = d.department_id;`,

  demo: `
Employees

1 John  1
2 Emma  2
3 Mike  4

Departments

1 HR
2 IT
3 Finance
  `,

  processing: `
HR      -> Match John
IT      -> Match Emma
Finance -> No Employee -> NULL
  `,

  result: `
John    HR
Emma    IT
NULL    Finance
  `
},

{
  title: 'FULL OUTER JOIN',
  icon: '🌐',

  purpose: 'Returns all rows from both tables.',

  explanation: `FULL OUTER JOIN combines LEFT JOIN and RIGHT JOIN.

Matching rows are merged.

Non-matching rows from either side are also included.

Think of it as:"Keep everything from both tables."`,

  query: `SELECT e.name, d.department_name FROM employees e FULL OUTER JOIN departments d ON e.department_id = d.department_id; `,

  demo: `
Employees

1 John  1
2 Emma  2
3 Mike  4

Departments

1 HR
2 IT
3 Finance
  `,

  processing: `
John -> HR ✅
Emma -> IT ✅
Mike -> No Department
Finance -> No Employee
  `,

  result: `
John    HR
Emma    IT
Mike    NULL
NULL    Finance
  `
},

{
  title: 'LEFT OUTER JOIN === Left Join',
  icon: '⬅️🌐',

  purpose: 'Same as LEFT JOIN.',

  explanation: `LEFT OUTER JOIN and LEFT JOIN are exactly the same. OUTER keyword is optional.

Both return: All rows from left table + matching rows from right table.

Think of it as: "LEFT JOIN with full name."
  `,

  query: `SELECT * FROM employees e LEFT OUTER JOIN departments d ON e.department_id = d.department_id;`,
  demo: `
Employees

John 1
Emma 2
Mike 4

Departments

1 HR
2 IT
3 Finance
  `,

  processing: `
John -> HR
Emma -> IT
Mike -> NULL
  `,

  result: `
John   HR
Emma   IT
Mike   NULL
  `
},

{
  title: 'RIGHT OUTER JOIN  === Right Join',
  icon: '➡️🌐',

  purpose: 'Same as RIGHT JOIN.',

  explanation: `RIGHT OUTER JOIN and RIGHT JOIN are exactly the same.

OUTER keyword is optional.

Both return: All rows from right table + matching rows from left table.

Think of it as: "RIGHT JOIN with full name."`,

  query: `SELECT * FROM employees e RIGHT OUTER JOIN departments d ON e.department_id = d.department_id;`,

  demo: `
Employees

John 1
Emma 2
Mike 4

Departments

1 HR
2 IT
3 Finance
  `,

  processing: `
HR -> John
IT -> Emma
Finance -> NULL
  `,

  result: `
John   HR
Emma   IT
NULL   Finance
  `
},

{
  title: 'CROSS JOIN (Cartesian Join)',
  icon: '❌',

  purpose: 'Returns every possible combination of rows from both tables.',

  explanation: `CROSS JOIN does not require a matching condition.

Every row from the first table is combined with every row from the second table.

Formula:
Rows Returned = Rows In Table A × Rows In Table B

Think of it as: "Match everything with everything."
  `,

  query: `SELECT e.name, d.department_name FROM employees e CROSS JOIN departments d; `,

  demo: `
Employees

John
Emma

Departments

HR
IT
Finance
  `,

  processing: `
John × HR
John × IT
John × Finance

Emma × HR
Emma × IT
Emma × Finance

2 Employees × 3 Departments = 6 Rows
  `,

  result: `
John   HR
John   IT
John   Finance
Emma   HR
Emma   IT
Emma   Finance
  `
},

{
  title: 'SELF JOIN',
  icon: '🪞',

  purpose: 'Joins a table with itself.',

  explanation: `SELF JOIN is useful when rows inside the same table have relationships with other rows.

Common examples:
Employee -> Manager
Category -> Parent Category

Think of it as: "Table talking to itself."
  `,

  query: `SELECT e.name AS Employee, m.name AS Manager FROM employees e LEFT JOIN employees m ON e.manager_id = m.employee_id;`,

  demo: `
Employees

Id | Name  | ManagerId
----------------------
1  | John  | NULL
2  | Emma  | 1
3  | Mike  | 1
  `,

  processing: `
Emma -> Manager Id 1 -> John
Mike -> Manager Id 1 -> John
John -> No Manager
  `,

  result: `
John   NULL
Emma   John
Mike   John
  `
}
  ]

}
