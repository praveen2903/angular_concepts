import { Component } from '@angular/core';

@Component({
  selector: 'app-procedures-demo',
  standalone: false,
  templateUrl: './procedures-demo.html',
  styleUrl: './procedures-demo.css',
})
export class ProceduresDemo {
  proceduralSql= [
    {
  title: 'Function vs Procedure',
  icon: '⚖️',

  purpose: 'Understand when to use Function and Procedure.',

  whyNeeded: `Functions return values.
Procedures perform actions/workflows.`,

  input: `Products Table`,

  functionExample: `Uses SELECT to execute query

CREATE OR REPLACE FUNCTION total_products() RETURNS INT LANGUAGE plpgsql AS $$
DECLARE v_total_count INT;
BEGIN
 SELECT COUNT(*) INTO v_total_count FROM products;
 RETURN v_total_count;
END;
$$;

SELECT total_products();`,

  procedureExample: `Uses call to execute query

CREATE OR REPLACE PROCEDURE increase_stock() LANGUAGE plpgsql AS $$
BEGIN
 UPDATE products SET stock = stock + 8;
END;
$$;

CALL increase_stock(); `,

  output: `Function Returns: 120

Procedure: Stock Updated Successfully`
},
{
  title: 'Procedure Parameters',
  icon: '📥',

  purpose: `Pass values into procedures.
DECLARE -- declare blocks helps to create variable which can be set in begin block using INTO 
variables(v_)--             ** naming convention:  p_ -- parameter given prefix to arguments,  v_-- prefix to variables`,

  input: `Product

201 Laptop 100000 `,

  query: `CREATE OR REPLACE PROCEDURE update_product_price(p_product_id INT, p_amount NUMERIC) LANGUAGE plpgsql AS $$
BEGIN
 UPDATE products SET price = price + p_amount WHERE product_id = p_product_id;
END;
$$;

CALL update_product_price(201, 300);`,

  output: `Laptop
100000
↓
100300  `
},
{
  title: 'SELECT INTO',
  icon: '📦',

  purpose: 'Store query result inside variable.',

  whyNeeded: `
Used when a query result needs to be stored
inside a PL/pgSQL variable for further processing.
  `,

  input: `

Products

+------------+---------+-------+
| Product Id | Name    | Stock |
+------------+---------+-------+
| 201        | Laptop  | 10    |
| 202        | Mouse   | 25    |
| 203        | Monitor | 15    |
+------------+---------+-------+

  `,

  query: `CREATE OR REPLACE PROCEDURE check_stock() LANGUAGE plpgsql AS $$
DECLARE
  v_stock INT;
BEGIN
  SELECT stock INTO v_stock FROM products WHERE product_id = 203;
  RAISE NOTICE 'Current Stock: %', v_stock;
END;
$$;

CALL check_stock();`,

  output: `NOTICE: Current Stock: 15  `
},

{
  title: 'IF ELSIF ELSE',
  icon: '🚦',

  purpose: 'Execute different blocks based on conditions.',

  input: `Stock = 25`,

  query: `CREATE OR REPLACE PROCEDURE stock_status() LANGUAGE plpgsql AS $$
DECLARE 
    v_stock INT := 25;
BEGIN
  IF v_stock > 20 THEN
     RAISE NOTICE 'HIGH STOCK';
  ELSIF v_stock > 10 THEN
     RAISE NOTICE 'MEDIUM STOCK';
  ELSE
     RAISE NOTICE 'LOW STOCK';
  END IF;
END;
$$;

CALL stock_status();`,

  output: ` NOTICE: HIGH STOCK  `
},
{
  title: 'FOR LOOP',
  icon: '🔄',

  purpose: 'Repeat a block multiple times.',

  input: `Numbers 1 to 25`,

  query: `
CREATE OR REPLACE PROCEDURE loop_demo() LANGUAGE plpgsql AS $$
DECLARE
  v_num INT;
BEGIN
  FOR v_num IN 1..25 LOOP
      CONTINUE WHEN v_num % 3 = 0;

      EXIT WHEN v_num = 20;
      RAISE NOTICE '%',v_num;
  END LOOP;

END;
$$;

CALL loop_demo();`,

  output: `1
2
4
5
7
8
10
11
13
14
16
17
19`
},
{
  title: 'CASE Statement',
  icon: '📚',

  purpose: 'Cleaner alternative to multiple IF statements.',

  input: `

Department = HR

  `,

  query: `
CREATE OR REPLACE PROCEDURE department_info() LANGUAGE plpgsql AS $$
DECLARE
  p_department TEXT := 'HR';
BEGIN
  CASE p_department

    WHEN 'IT'
      THEN RAISE NOTICE 'Technology';

    WHEN 'HR'
      THEN RAISE NOTICE 'Resources';

    WHEN 'MEDICINE'
      THEN RAISE NOTICE 'Doctor';

  END CASE;

END;
$$;

CALL department_info();`,

  output: `
NOTICE: Resources  `
},
{
  title: 'STRICT',
  icon: '🎯',

  purpose: 'Ensure exactly one row is returned.',

  input: `Products

201 Laptop
202 Mouse
203 Keyboard

All Prices > 500`,

  query: `CREATE OR REPLACE PROCEDURE strict_demo() LANGUAGE plpgsql AS $$
DECLARE
  v_name TEXT;
BEGIN
  SELECT product_name INTO STRICT v_name FROM products WHERE price > 500;

END;
$$;

CALL strict_demo();`,

  output: `
ERROR:
query returned more than one row
too_many_rows`
},
{
  title: 'Concatenation ||',
  icon: '🔗',

  purpose: 'Join multiple strings together.',

  input: `

Laptop

150000

  `,

  query: `CREATE OR REPLACE FUNCTION product_info() RETURNS TEXT LANGUAGE plpgsql AS $$
DECLARE
  v_name TEXT := 'Laptop';
  v_price NUMERIC := 150000;
BEGIN
  RETURN 'Product: '|| v_name || ' Price: ' || v_price;

END;
$$;

SELECT product_info();`,

  output: `Product: Laptop Price: 150000 `
},

  ];
  proceduralExceptionSql = [
    {
  title: 'unique_violation',
  icon: '🚫',

  purpose: 'Handle duplicate primary key.',

  input: `
201 Laptop
Already Exists`,

  query: `
CREATE OR REPLACE FUNCTION duplicate_product()
RETURNS TEXT
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO products(product_id, product_name) VALUES (201, 'Laptop');

    RETURN 'Inserted Successfully';

EXCEPTION
    WHEN unique_violation THEN RETURN 'Duplicate Record';
END;
$$;

SELECT duplicate_product();`,

  output: `
Duplicate Record
  `
},
{
  title: 'division_by_zero',
  icon: '➗',

  purpose: 'Prevent divide by zero errors.',

  input: `
10 / 0
  `,

  query: `
CREATE OR REPLACE FUNCTION divide_demo() RETURNS TEXT LANGUAGE plpgsql AS $$
DECLARE
    v_result NUMERIC;
BEGIN
    v_result := 10 / 0;
    RETURN v_result::TEXT;

EXCEPTION
    WHEN division_by_zero THEN RETURN 'Division Not Possible';
END;
$$;

SELECT divide_demo();`,

  output: `Division Not Possible`
},
{
  title: 'no_data_found',
  icon: '🔍',

  purpose: 'Handle missing records.',

  input: `

Product Id = 999

  `,

query: `
CREATE OR REPLACE FUNCTION find_product() RETURNS TEXT LANGUAGE plpgsql AS $$
DECLARE
    v_name TEXT;
BEGIN
    SELECT product_name INTO STRICT v_name FROM products WHERE product_id = 999;
    RETURN v_name;

EXCEPTION
    WHEN no_data_found THEN RETURN 'No Product Found';
END;
$$;

SELECT find_product();`,

  output: `
No Product Found
  `
},
{
  title: 'too_many_rows',
  icon: '📚',

  purpose: 'Handle multiple rows with STRICT.',

  input: `

Laptop
Mouse
Keyboard

  `,

query: `
CREATE OR REPLACE FUNCTION multiple_rows_demo() RETURNS TEXT LANGUAGE plpgsql AS $$
DECLARE
    v_name TEXT;
BEGIN
    SELECT product_name INTO STRICT v_name FROM products WHERE price > 500;
    RETURN v_name;

EXCEPTION
    WHEN too_many_rows THEN RETURN 'Multiple Rows Found';
END;
$$;

SELECT multiple_rows_demo();
`,

  output: `
Multiple Rows Found
  `
},
{
  title: 'foreign_key_violation',
  icon: '🔗',

  purpose: 'Handle invalid foreign key.',

  input: `
Teacher Id

999

Not Exists  `,

  query: `
CREATE OR REPLACE FUNCTION add_student() RETURNS TEXT LANGUAGE plpgsql AS $$
BEGIN
    INSERT INTO students(student_id, teacher_id) VALUES (101, 999);
    RETURN 'Student Added';

EXCEPTION
    WHEN foreign_key_violation THEN RETURN 'Teacher Not Found';
END;
$$;

SELECT add_student();`,

  output: `
Teacher Not Found
  `
},
{
  title: 'check_violation',
  icon: '💰',

  purpose: 'Handle CHECK constraint failures.',

  input: `
Balance = -500
  `,

query: `
CREATE OR REPLACE FUNCTION add_bank_balance() RETURNS TEXT LANGUAGE plpgsql AS $$ 
BEGIN
    INSERT INTO bank(balance) VALUES (-500);
    RETURN 'Inserted';

EXCEPTION
    WHEN check_violation THEN RETURN 'Balance Cannot Be Negative';
END;
$$;

SELECT add_bank_balance();`,

  output: `

Balance Cannot Be Negative

  `
},
{
  title: 'not_null_violation',
  icon: '❌',

  purpose: 'Handle NULL values.',

  input: `Name = NULL  `,

query: `
CREATE OR REPLACE FUNCTION non_null_violation(p_name TEXT) RETURNS TEXT LANGUAGE plpgsql AS $$
BEGIN
    INSERT INTO account(name) VALUES (p_name);
    RETURN 'Inserted Successfully';

EXCEPTION
    WHEN not_null_violation THEN RETURN 'Name Cannot Be Null';
END;
$$;

SELECT non_null_violation(NULL);`,

  output: `Name Cannot Be Null`
},
{
  title: 'Custom Exception',
  icon: '🚨',

  purpose: 'Create your own business validation.',

  input: `
Age = 16
  `,

query: `
CREATE OR REPLACE FUNCTION custom_exception(p_age INT) RETURNS TEXT LANGUAGE plpgsql AS $$
BEGIN
    IF p_age < 18 THEN
        RAISE EXCEPTION 'Age Must Be Above 18';
    END IF;

    RETURN 'Eligible To Vote';

EXCEPTION
    WHEN raise_exception THEN RETURN SQLERRM;
END;
$$;

SELECT custom_exception(16);`,

  output: `
ERROR
Age Must Be Above 18`
},
{
  title: 'SQLSTATE Codes',
  icon: '📋',

  input: `Database Errors`,
query: `
CREATE OR REPLACE FUNCTION place_order(
    p_customer_id INT,
    p_product_id INT,
    p_qty INT
)
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE
    stock_count INT;
BEGIN
    SELECT stock INTO stock_count FROM products WHERE product_id = p_product_id;

    IF stock_count < p_qty THEN
        RAISE EXCEPTION 'Insufficient Stock';
    END IF;
    INSERT INTO orders(customer_id, product_id, quantity) VALUES(p_customer_id, p_product_id, p_qty);
    UPDATE products SET stock = stock - p_qty WHERE product_id = p_product_id;
    RETURN 'Order Placed Successfully';

EXCEPTION
    WHEN foreign_key_violation THEN RETURN 'Invalid Customer Or Product';
    WHEN unique_violation THEN RETURN 'Duplicate Order';
    WHEN raise_exception THEN RETURN SQLERRM;
    WHEN OTHERS THEN RETURN 'Unexpected Error: ' || SQLERRM;
END;
$$;

SELECT place_order(310, 210, 5);


-- if written with codes

CREATE OR REPLACE FUNCTION sqlstate_demo() RETURNS TEXT LANGUAGE plpgsql AS $$
DECLARE
    v_name TEXT;
BEGIN
    SELECT product_name INTO STRICT v_name FROM products WHERE price > 600;
    RETURN v_name;

EXCEPTION
    WHEN SQLSTATE 'P0003' THEN RETURN 'ERR: ' || SQLERRM;
END;
$$;

SELECT sqlstate_demo();`,
  output: `23505 → unique_violation

23503 → foreign_key_violation

23502 → not_null_violation

23514 → check_violation

P0002 → no_data_found

P0003 → too_many_rows

P0001 → raise_exception  `
}
  ];
  procedureMemoryTricks = `FUNCTION
---------
Returns Value: SELECT function_name()

PROCEDURE
----------
Performs Action: CALL procedure_name()

SELECT INTO
------------
Store Query Result In Variable

STRICT
--------
Exactly One Row

RAISE NOTICE
-------------
Print Message

RAISE EXCEPTION
----------------
Throw Error

EXCEPTION
-----------
Handle Errors

SQLERRM
---------
Actual Error Message

SQLSTATE
----------
Error Code`;

proceduresExamples = [
  {
  title: 'IN Parameter',
  icon: '📥',

  purpose: 'Receive input values into a procedure.',

  whyNeeded: `Used when caller needs to send data to the procedure.`,

  input: `Praveen`,

  query: `CREATE OR REPLACE PROCEDURE greet_user(p_name VARCHAR) LANGUAGE plpgsql AS $$
BEGIN
 RAISE NOTICE 'Hello %', p_name;
END;
$$;

CALL greet_user('Praveen');`,

  output: `Hello Praveen `
},
{
  title: 'OUT Parameter',
  icon: '📤',

  purpose: 'Return values from procedures.',

  whyNeeded: `
Procedures normally do not return values.

OUT parameters allow output.
  `,

  input: `

Employees Table

5 Records

  `,

  query: `
CREATE OR REPLACE PROCEDURE get_employee_count(OUT p_total_employees INT) LANGUAGE plpgsql AS $$
BEGIN
 SELECT COUNT(*) INTO p_total_employees FROM employees;
END;
$$;

CALL get_employee_count(NULL);
  `,

  output: `
total_employees
5
  `
},
{
  title: 'INOUT Parameter',
  icon: '🔄',

  purpose: 'Acts as both input and output.',

  whyNeeded: `Value comes in, gets modified, returns back.`,

  input: `

5

  `,

  query: `
CREATE OR REPLACE PROCEDURE increase_value(INOUT p_num INT) LANGUAGE plpgsql AS $$
BEGIN
 p_num := p_num + 10;
END;
$$;

CALL increase_value(5);`,

  output: `

15

  `
},
{
  title: 'Variables',
  icon: '📦',

  purpose: 'Store temporary values.',

  input: `Bonus = 5000  `,

  query: `DECLARE v_total_bonus NUMERIC := 0;
BEGIN
 v_total_bonus := 5000;

 RAISE NOTICE 'Bonus: %', v_total_bonus;
END;`,

  output: `Bonus: 5000`
},
{
  title: 'COMMIT Transaction',
  icon: '💳',

  purpose: 'Make transaction permanent.',

  whyNeeded: `
Without COMMIT, changes can be rolled back.

After COMMIT, changes become permanent.
  `,

  input: `Account 100
Balance = 50000


Account 103

Balance = 20000

Transfer = 10000`,

  query: `UPDATE accounts SET balance = balance - 10000 WHERE account_id = 100;

UPDATE accounts SET balance = balance + 10000 WHERE account_id = 103;

COMMIT;`,

  output: `

Account 100

40000


Account 103

30000

  `
},
{
  title: 'Dynamic SQL',
  icon: '⚡',

  purpose: 'Execute SQL dynamically.',

  whyNeeded: `
Table name not known beforehand.

Useful for:
- Reports
- Admin Utilities
- Generic Procedures
  `,

  input: `

employees

  `,

  query: `EXECUTE FORMAT('SELECT COUNT(*) FROM %I', p_table_name) INTO v_total;`,

  output: `Total Rows: 20`
},
{
  title: 'Cursor',
  icon: '📜',

  purpose: 'Process rows one at a time.',

  whyNeeded: `
Normally SQL processes all rows together.

Cursor allows row-by-row processing.
  `,

  useCases: `

✓ Salary Processing

✓ Sending Emails

✓ Report Generation

✓ Data Migration

✓ Batch Jobs

  `
},
{
  title: 'Simple Cursor',
  icon: '📖',

  purpose: 'Process query results row by row manually using OPEN, FETCH and CLOSE.',

  whyNeeded: `
Useful when each record requires individual processing.

Common Uses:
✓ Salary Processing
✓ Sending Emails
✓ Data Migration
✓ Report Generation
✓ Batch Jobs
  `,

  input: `

Employees

+------+--------+
| Name | Salary |
+------+--------+
| John | 50000  |
| Emma | 70000  |
| Mike | 90000  |
+------+--------+

  `,

  query: `
CREATE OR REPLACE PROCEDURE cursor_demo()
LANGUAGE plpgsql
AS $$
DECLARE
    v_emp RECORD;

    v_emp_cursor CURSOR FOR
    SELECT
        first_name || ' ' || last_name AS emp_name,
        salary
    FROM employees;

BEGIN

    OPEN v_emp_cursor;

    LOOP

        FETCH v_emp_cursor
        INTO v_emp;

        EXIT WHEN NOT FOUND;

        RAISE NOTICE
        'Employee: %, Salary: %',
        v_emp.emp_name,
        v_emp.salary;

    END LOOP;

    CLOSE v_emp_cursor;

END;
$$;

CALL cursor_demo();
  `,

  output: `

Employee: John Smith, Salary: 50000

Employee: Emma Watson, Salary: 70000

Employee: Mike Jordan, Salary: 90000

  `
},
{
  title: 'Cursor Using FOR LOOP',
  icon: '🔁',

  purpose: 'Automatically open, fetch and close cursor using FOR LOOP.',

  whyNeeded: `
FOR LOOP internally handles:

OPEN
↓
FETCH
↓
EXIT WHEN NOT FOUND
↓
CLOSE

Cleaner than manual cursors.
  `,

  input: `

Employees Table

  `,

  query: `
CREATE OR REPLACE PROCEDURE cursor_loop()
LANGUAGE plpgsql
AS $$
DECLARE
    v_emp RECORD;
BEGIN

    FOR v_emp IN
        SELECT
            first_name || ' ' || last_name AS employee_name,
            salary
        FROM employees
    LOOP

        RAISE NOTICE
        '% earns %',
        v_emp.employee_name,
        v_emp.salary;

    END LOOP;

END;
$$;

CALL cursor_loop();
  `,

  output: `

John earns 50000

Emma earns 70000

Mike earns 90000

  `
},
{
  title: 'Cursor Update Example',
  icon: '💰',

  purpose: 'Update records one by one using cursor iteration.',

  whyNeeded: `
Used when each row requires custom logic
before update.

Example:
Apply employee bonus individually.
  `,

  input: `

Before

John 50000
Emma 70000
Mike 90000

  `,

  query: `
CREATE OR REPLACE PROCEDURE salary_bonus()
LANGUAGE plpgsql
AS $$
DECLARE
    v_emp RECORD;
BEGIN

    FOR v_emp IN
        SELECT employee_id, salary
        FROM employees
    LOOP

        UPDATE employees
        SET salary = salary + 5000
        WHERE employee_id = v_emp.employee_id;

    END LOOP;

END;
$$;

CALL salary_bonus();
  `,

  output: `

After

John 55000

Emma 75000

Mike 95000

  `
},
{
  title: 'Cursor With Parameters',
  icon: '🎯',

  purpose: 'Filter cursor results dynamically using procedure parameters.',

  whyNeeded: `
Allows caller to control
which rows are processed.
  `,

  input: `

Minimum Salary

100000

  `,

  query: `
CREATE OR REPLACE PROCEDURE high_salary_employees(p_salary NUMERIC) LANGUAGE plpgsql AS $$
DECLARE
    v_emp RECORD;
    v_emp_cursor CURSOR FOR
    SELECT first_name || ' ' || last_name AS employee_name, salary FROM employees WHERE salary > p_salary;

BEGIN
    OPEN v_emp_cursor;
    LOOP
        FETCH v_emp_cursor INTO v_emp;

        EXIT WHEN NOT FOUND;

        RAISE NOTICE '% earns %', v_emp.employee_name, v_emp.salary;

    END LOOP;
    CLOSE v_emp_cursor;
END;
$$;

CALL high_salary_employees(100000);`,

  output: `Sara earns 110000

Tom earns 125000

David earns 140000 `
},
{
  title: 'REFCURSOR',
  icon: '📂',

  purpose: 'Return a cursor reference to the caller.',

  whyNeeded: `
Instead of processing rows immediately,
the procedure returns a cursor.

Caller fetches data whenever needed.

Common in:
✓ Enterprise Applications
✓ Reporting Systems
✓ APIs
✓ Large Result Sets
  `,

  query: `
CREATE OR REPLACE PROCEDURE
ref_cursor_demo(
    INOUT emp_cursor REFCURSOR
)
LANGUAGE plpgsql
AS $$
BEGIN

    OPEN emp_cursor FOR

    SELECT
        employee_id,
        first_name,
        salary
    FROM employees;

END;
$$;

BEGIN;

CALL ref_cursor_demo('mycursor');

FETCH ALL FROM mycursor;
  `,

  output: `

employee_id | first_name | salary

101         | John       | 50000

102         | Emma       | 70000

103         | Mike       | 90000

  `,

  note: `

REFCURSOR exists only inside transaction.

BEGIN
  ↓
OPEN CURSOR
  ↓
FETCH DATA
  ↓
COMMIT
  ↓
CURSOR DESTROYED

After COMMIT:

FETCH FROM mycursor

ERROR:
cursor "mycursor" does not exist

  `
},
{
  title: 'REFCURSOR Output Example',
  icon: '📤',

  purpose: 'Return filtered result set through cursor.',

  whyNeeded: `
Avoids returning huge datasets directly.

Consumer fetches records
only when required.
  `,

  input: `

Employees With Salary > 100000

  `,

  query: `CREATE OR REPLACE PROCEDURE get_employees(INOUT ref_cur REFCURSOR) LANGUAGE plpgsql AS $$
BEGIN
    OPEN ref_cur FOR
    SELECT first_name, salary, department_id FROM employees WHERE salary > 100000;
END;
$$;

BEGIN;
CALL get_employees('emp_cursor');
FETCH ALL FROM emp_cursor;`,

  output: `
Sara   110000   IT

Tom    125000   HR

David  140000   SALES

  `
},
{
  title: 'Cursor Performance',
  icon: '⚡',

  purpose: 'Best practices while working with cursors.',

  query: `CREATE PROCEDURE get_procedure() RETURNS TEXT language plpgsql AS $$
DECLARE
    v_emp RECORD;
BEGIN
    FOR v_emp IN SELECT employee_id, salary FROM employees WHERE salary < 50000
    LOOP
        UPDATE employees SET salary = salary + 1000 WHERE employee_id = v_emp.employee_id;
    END LOOP;
    COMMIT;
END; `,

  performanceTips: `

✓ Prefer FOR LOOP over manual FETCH

✓ Avoid SELECT *

✓ Filter rows early using WHERE

✓ Use REFCURSOR for huge datasets

✓ Commit periodically in batch jobs

✓ Use BULK UPDATE when row-by-row logic is unnecessary

✓ Cursor = Flexible but slower than set-based SQL

  `,

  comparison: `Normal SQL
UPDATE employees SET salary = salary + 1000;

✓ Fastest
Cursor
FOR EACH ROW
    UPDATE employee
END LOOP

✓ Flexible
✗ Slower  `
},
{
  title: 'FOR Loop vs REFCURSOR',
  icon: '🔄',

  purpose: 'When to use which?',

  whenToUseForLoop: `

✓ Small to medium datasets

✓ When you need to process each row

✓ Simple operations

✓ Modifying data

✓ When REFCURSOR is not required

  `,

  whenToUseRefCursor: `

✓ Very large datasets

✓ Returning result sets to applications (Java, Python, PHP, Node.js)

✓ When caller needs to control fetching

✓ Decoupling producer and consumer

✓ Reporting tools

  `,

  example: `

-- FOR Loop
FOR emp IN SELECT * FROM employees
  LOOP
    -- Process row
  END LOOP;

-- REFCURSOR
OPEN cur FOR SELECT * FROM employees;
FETCH ALL FROM cur;
  `
}

];

  scrollToSection(id: string): void {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

triggerSql = [
  {
  title: 'FOR EACH ROW vs FOR EACH STATEMENT',
  icon: '🔄',

  purpose: 'Control how many times a trigger executes.',

  input: `

UPDATE employees
SET salary = salary + 5000;

Affected Rows = 100

  `,

  query: `
-- Runs 100 Times

CREATE TRIGGER row_trigger
AFTER UPDATE
ON employees
FOR EACH ROW
EXECUTE FUNCTION audit_function();


-- Runs Only Once

CREATE TRIGGER statement_trigger
AFTER UPDATE
ON employees
FOR EACH STATEMENT
EXECUTE FUNCTION audit_function();
  `,

  output: `

FOR EACH ROW

100 Executions



FOR EACH STATEMENT

1 Execution

  `
},
{
  title: 'Table vs Schema',
  icon: '🗂️',

  purpose: 'Understand database organization.',

  input: `
Company Database
  `,

  query: `
CREATE SCHEMA company;

CREATE TABLE company.employees(
    employee_id INT,
    first_name TEXT
);

CREATE TABLE company.departments(
    department_id INT,
    department_name TEXT
);
  `,

  output: `Database

└── Schema: company
      ├── employees
      └── departments`,

  note: `

Schema = Folder

Table = File

One Schema
Can Contain Many Tables

  `
},
{
  title: 'View',
  icon: '👁️',

  purpose: 'Virtual table based on a query.',

  input: `

employees

101 John 50000
102 Emma 70000

  `,

  query: `CREATE VIEW high_salary_employees AS SELECT * FROM employees WHERE salary > 60000;

SELECT * FROM high_salary_employees;`,

  output: `

102 Emma 70000

  `
},
{
  title: 'View vs Table',
  icon: '⚖️',

  purpose: 'Understand the difference between physical storage and virtual storage.',

  input: `

employees Table

101 John 50000
102 Emma 70000
103 Mike 90000

  `,

  tableQuery: `
CREATE TABLE employees(
    employee_id INT,
    first_name TEXT,
    salary NUMERIC
);

INSERT INTO employees
VALUES
(101, 'John', 50000),
(102, 'Emma', 70000),
(103, 'Mike', 90000);
  `,

  viewQuery: `
CREATE VIEW high_salary_employees AS

SELECT
    employee_id,
    first_name,
    salary
FROM employees
WHERE salary > 60000;

SELECT *
FROM high_salary_employees;
  `,

  output: `

View Result

102 Emma 70000
103 Mike 90000

  `,

  differences: `

TABLE

✓ Stores Data Physically

✓ Occupies Disk Space

✓ INSERT Allowed

✓ UPDATE Allowed

✓ DELETE Allowed

✓ Faster Direct Access

✓ Permanent Object



VIEW

✓ Stores Only Query

✓ No Physical Data Storage

✓ Occupies Very Little Space

✓ Reads Data From Base Table

✓ Used For Security

✓ Used For Simplification

✓ Virtual Table

  `,

  diagram: `TABLE

employees
--------------------
101 John 50000
102 Emma 70000
103 Mike 90000

VIEW high_salary_employees
          |
          ▼
SELECT * FROM employees WHERE salary > 60000
          |
          ▼
102 Emma 70000
103 Mike 90000

  `,

  interview: `Table : Actual Data
View  : Saved SQL Query

Table Can Exist Alone View Depends On Table
Delete Table
     ↓
View Breaks

Update Table
     ↓
View Automatically Shows Latest Data 

Reason For The Existence Of Views
---------------------------------
Views are virtual tables created from a saved SQL query.
Unlike tables, views do not store data physically. They display data fetched from one or more underlying tables.

Views exist to simplify database access, improve security, maintain consistency, and protect applications from database changes.


1. Query Abstraction
--------------------
Complex queries often contain:

✓ Multiple JOINs
✓ Calculations
✓ Aggregations
✓ Filters

Instead of writing the same lengthy query repeatedly, you can store it inside a view and query the view directly.

Example:
CREATE VIEW employee_summary AS SELECT e.employee_id, e.first_name, d.department_name FROM employees e JOIN departments d ON e.department_id = d.department_id;

Now simply use:
SELECT * FROM employee_summary;


2. Security & Data Privacy
--------------------------
Views can hide sensitive information from users.
Instead of granting access to the entire table, you can expose only specific columns through a view.

Example:
employees Table
-------------------
employee_id
name
salary
password

Create View:
CREATE VIEW employee_public AS SELECT employee_id, name FROM employees;

Users can access:
employee_id
name

But cannot see:
✗ salary
✗ password


3. Schema Change Management
---------------------------
Applications often depend on table structures. If a table changes:

employees
---------
employee_name

↓

full_name

Applications may fail. A view can act as a compatibility layer.
Old applications continue querying the view while the underlying table structure evolves.


4. Data Consistency
-------------------
Different teams may write different queriesfor the same business requirement.

This can lead to inconsistent reports.
Views centralize business logic.
Everyone uses the same view and gets the same calculations and results.

Example:
CREATE VIEW department_salary_summary AS SELECT department_id, AVG(salary) AS avg_salary FROM employees GROUP BY department_id;


5. Renaming & Formatting
------------------------
Views can provide cleaner column names without modifying the original table.

Example:

Table
emp_fn
emp_ln

View
-----
CREATE VIEW employee_details AS SELECT emp_fn AS first_name, emp_ln AS last_name FROM employees;

Users see readable column names while the original table remains unchanged.


Summary
-------
Table
-----
✓ Stores Data Physically
✓ Occupies Disk Space
✓ Source Of Truth


View
----
✓ Stores Only SQL Query
✓ No Physical Data Storage
✓ Simplifies Complex Queries
✓ Improves Security
✓ Maintains Consistency
✓ Shields Applications From Schema Changes


Interview One-Liner
-------------------
Tables store data.

Views store queries.

Views provide abstraction, security, consistency, and flexibility without duplicating data.`
},
{
  title: 'Update Through View',
  icon: '✏️',

  purpose: 'Modify base table data via view.',

  input: `

View:

employee_view

101 John 50000
102 Emma 70000

  `,

  query: `
-- Valid Update

UPDATE employee_view SET salary = 60000 WHERE employee_id = 101;


-- Invalid Update
UPDATE employee_view SET employee_id = 201 WHERE employee_id = 101;
  `,

  output1: `

Valid Update Result

101 John 60000
102 Emma 70000

  `,

  output2: `
ERROR
view cannot modify primary key column

  `,

  note: `

✓ Can update base table
through view

✗ Cannot modify primary key columns

✗ Cannot modify calculated columns

✗ Cannot modify columns from multiple tables

  `
},
{
  title: 'Delete Through View',
  icon: '🗑️',

  purpose: 'Remove rows from base table using view.',

  input: `

View:

employee_view

101 John 50000
102 Emma 70000
103 Mike 90000

  `,

  query: `
DELETE FROM employee_view WHERE salary > 80000;
  `,

  output: `

Row Deleted From Base Table

101 John 50000
102 Emma 70000

  `,

  note: `

✓ Deletes from base table

✓ Row must be uniquely identifiable

✗ Cannot delete aggregated rows

✗ Cannot delete from joins

  `
},
{
  title: 'Materialized View',
  icon: '📦',

  purpose: 'Pre-computed result stored physically.',

  input: `

Complex Aggregation

Calculates monthly totals

  `,

  query: `CREATE MATERIALIZED VIEW monthly_sales AS SELECT month, SUM(amount) AS total_sales FROM orders GROUP BY month;

-- Refresh manually
REFRESH MATERIALIZED VIEW monthly_sales;`,

  output: `

Pre-calculated Data

2026-01 150000
2026-02 180000
2026-03 210000

  `,

  note: `

✓ Faster than normal view

✓ Stores physical data

✗ Requires refresh

✗ Consumes storage

  `
},
{
  title: 'Nested View',
  icon: '겹',

  purpose: 'View built on top of another view.',

  input: `

View → View → Table

  `,

  query: `
-- Base Table
CREATE TABLE employees(
    id INT,
    name TEXT,
    salary INT
);

-- View 1
CREATE VIEW high_salary_100k AS SELECT * FROM employees WHERE salary > 100000;

-- View 2 (Built on View 1)
CREATE VIEW top_performers AS SELECT * FROM high_salary_100k WHERE performance = 'Excellent';
  `,

  output: `

View 1:

101 John 110000

View 2:

101 John 110000

  `,

  note: `

✓ Can build layers of logic

✓ Keeps code organized

✗ Performance degradation

✗ One level of nesting recommended

  `
},
{
  title: 'View With Join',
  icon: '🔗',

  purpose: 'Combine multiple tables in view.',

  input: `

Table 1: employees
Table 2: departments

  `,

  query: `
CREATE VIEW employee_department_view AS

SELECT e.first_name, d.department_name FROM employees e JOIN departments d ON e.department_id = d.department_id;  `,

  output: `

employee_department_view

John         IT
Emma         HR

  `,

  note: `

✓ Combine tables

✓ Simplify queries

✗ Cannot update if complex join

✗ Cannot update if aggregate

  `
},
{
  title: 'View Refresh',
  icon: '🔄',

  purpose: 'Update materialized view.',

  query: `
CREATE MATERIALIZED VIEW daily_sales AS

SELECT order_date, SUM(total_amount) AS daily_revenue FROM orders GROUP BY order_date;

-- Refresh
REFRESH MATERIALIZED VIEW daily_sales;
  `,

  output: `

daily_sales

2026-06-16 55000
2026-06-17 62000

  `,

  note: `

No automatic refresh

Manual Refresh Required

REFRESH MATERIALIZED VIEW

  `
},
{
  title: 'View Security',
  icon: '🔐',

  purpose: 'Restrict access to data.',

  input: `
View:
Sensitive employee data
  `,

  query: `
CREATE VIEW public_employees AS SELECT employee_id, first_name FROM employees;

-- Grant access
GRANT SELECT ON public_employees TO app_user;

-- Deny direct access
REVOKE SELECT ON employees FROM app_user;
  `,

  output: `
App User Can See:
employee_id
first_name

App User Cannot See:
salary
department_id
  `,

  note: `✓ Hide sensitive columns
✓ Restrict rows
✓ Security layer `
},
];
}
