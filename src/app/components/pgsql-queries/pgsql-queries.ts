import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-pgsql-queries',
  standalone: false,
  templateUrl: './pgsql-queries.html',
  styleUrl: './pgsql-queries.css',
})
export class PgsqlQueries implements OnInit, OnDestroy {

  activeSection = 'db-features';
  private observer!: IntersectionObserver;

  private readonly sections = [
    'db-features',
    'sql-scripts',
    'common-problems',
    'window-functions'
  ];

  ngOnInit(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.activeSection = entry.target.id;
            break;
          }
        }
      },
      { threshold: 0.25 }
    );

    this.sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) this.observer.observe(el);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  scrollTo(sectionId: string): void {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }


  sqlImportantQueries = [
   {
  title: 'Highest Salary',
  icon: '💰',

  purpose: 'Find employee(s) having highest salary.',

  input: `
+--------+--------+
| Name   | Salary |
+--------+--------+
| John   | 70000  |
| Emma   | 90000  |
| Mike   | 90000  |
| David  | 60000  |
+--------+--------+`,

  methods: [

    {
      name: 'Using MAX()',

      query: `SELECT * FROM employees WHERE salary =( SELECT MAX(salary) FROM employees);`
    },

    {
      name: 'Using ORDER BY + LIMIT',

      query: `SELECT * FROM employees ORDER BY salary DESC LIMIT 1;`
    },

    {
      name: 'Using DENSE_RANK() (Recommended)',

      query: `SELECT * FROM (SELECT *, DENSE_RANK() OVER(ORDER BY salary DESC) AS ranking FROM employees) ranked WHERE ranking = 1; `
    }
  ],

  output: `
+--------+--------+
| Name   | Salary |
+--------+--------+
| Emma   | 90000  |
| Mike   | 90000  |
+--------+--------+`
} ,
{
  title: 'Second Highest Salary',
  icon: '🥈',

  purpose: 'Find second highest salary.',

  input: `
+--------+--------+
| Name   | Salary |
+--------+--------+
| John   | 70000  |
| Emma   | 90000  |
| Mike   | 85000  |
| David  | 60000  |
+--------+--------+
  `,

  methods: [

    {
      name: 'Using Nested MAX()',

      query: `SELECT MAX(salary) FROM employees WHERE salary < (SELECT MAX(salary) FROM employees);`
    },

    {
      name: 'Using LIMIT + OFFSET',

      query: `SELECT salary FROM employees ORDER BY salary DESC LIMIT 1 OFFSET 1;`
    },

    {
      name: 'Using DENSE_RANK()',

      query: `SELECT * FROM (SELECT *, DENSE_RANK() OVER(ORDER BY salary DESC) AS ranking FROM employees) ranked WHERE ranking = 2;`
    }

  ],

  output: `
+--------+--------+
| Name   | Salary |
+--------+--------+
| Mike   | 85000  |
+--------+--------+
  `
},
{
  title: 'Highest Priced Product',
  icon: '🛒',

  purpose: 'Find product having highest price.',

  input: `
+----------+-------+
| Product  | Price |
+----------+-------+
| Laptop   | 90000 |
| Mobile   | 50000 |
| TV       | 70000 |
+----------+-------+
  `,

  methods: [

    {
      name: 'Using MAX()',

      query: `SELECT * FROM products WHERE price = (SELECT MAX(price) FROM products);`
    },

    {
      name: 'Using ORDER BY',

      query: `SELECT * FROM products ORDER BY price DESC LIMIT 1; `
    },

    {
      name: 'Using DENSE_RANK()',

      query: `SELECT * FROM (SELECT *, DENSE_RANK() OVER(ORDER BY price DESC) AS ranking FROM products) ranked WHERE ranking = 1;`
    }

  ],

  output: `
+---------+-------+
| Product | Price |
+---------+-------+
| Laptop  | 90000 |
+---------+-------+
  `
},
{
  title: 'Delete Duplicate Rows',
  icon: '🗑️',

  purpose: 'Delete duplicate rows from a table.',

  input: `
+----+-------+-------+
| Id | Name  | Score |
+----+-------+-------+
| 1  | John  | 80    |
| 2  | Emma  | 90    |
| 3  | John  | 80    |
| 4  | Mike  | 75    |
| 5  | Emma  | 90    |
+----+-------+-------+
  `,

  methods: [

    {  // DELETE from self (NOT EXISTS)
      name: 'Using NOT EXISTS',

      query: `DELETE FROM employees e1 WHERE EXISTS ( SELECT 1 FROM employees e2 WHERE e1.name = e2.name AND e1.score = e2.score AND e1.id > e2.id );    -- keep lowest ID`
    },

    {  // DELETE with ROW_NUMBER()
      name: 'Using ROW_NUMBER() (Recommended)',

      query: `DELETE FROM ( SELECT *, ROW_NUMBER() OVER( PARTITION BY name, score ORDER BY id ) AS rn FROM employees) ranked WHERE rn > 1;`
    },

    {  // DELETE from temp table
      name: 'Using Temp Table',

      query: `
CREATE TEMP TABLE unique_rows AS SELECT MIN(id) AS min_id FROM employees GROUP BY name, score;

DELETE FROM employees WHERE id NOT IN (SELECT min_id FROM unique_rows);

DROP TABLE unique_rows;`
    }
  ],

  output: `
+----+-------+-------+
| Id | Name  | Score |
+----+-------+-------+
| 1  | John  | 80    |
| 2  | Emma  | 90    |
| 4  | Mike  | 75    |
+----+-------+-------+
  `
},

{
  title: 'Average Salary By Department',
  icon: '📊',

  purpose: 'Calculate average salary per department.',

  input: `
+------+--------+
| Dept | Salary |
+------+--------+
| HR   | 50000  |
| HR   | 70000  |
| IT   | 80000  |
| IT   | 100000 |
+------+--------+
  `,

  methods: [

    {
      name: 'Using GROUP BY',

      query: `SELECT department_id, AVG(salary) FROM employees GROUP BY department_id;`
    },

    {
      name: 'Using Window Function',

      query: `SELECT department_id, AVG(salary) OVER( PARTITION BY department_id) FROM employees;`
    }

  ],

  output: `
+------+--------+
| Dept | Avg    |
+------+--------+
| HR   | 60000  |
| IT   | 90000  |
+------+--------+
  `
},
{
  title: 'Customers With More Than One Order',
  icon: '🛍️',

  purpose: 'Find customers who placed multiple orders.',

  input: `
+-------------+----------+
| Customer Id | Order Id |
+-------------+----------+
| 1           | 101      |
| 1           | 102      |
| 2           | 103      |
| 3           | 104      |
| 3           | 105      |
+-------------+----------+
  `,

  methods: [
    {
      name: 'GROUP BY + HAVING',

      query: `SELECT customer_id,COUNT(*) AS total_orders FROM orders GROUP BY customer_id HAVING COUNT(*) > 1;`
    }
  ],

  output: `
+-------------+--------------+
| Customer Id | Total Orders |
+-------------+--------------+
| 1           | 2            |
| 3           | 2            |
+-------------+--------------+
  `
},
{
  title: 'Total Sales Amount',
  icon: '💵',

  purpose: 'Calculate total sales collected.',

  input: `
+--------+
| Amount |
+--------+
| 100    |
| 250    |
| 300    |
| 150    |
+--------+
  `,

  methods: [
    {
      name: 'SUM()',

      query: `SELECT SUM(amount) AS total_sales FROM payments;`
    }
  ],

  output: `
+-------------+
| Total Sales |
+-------------+
| 800         |
+-------------+
  `
},
{
  title: 'Monthly Sales Report',
  icon: '📅',

  purpose: 'Generate monthly sales report.',

  input: `
+------------+--------+
| Sale Date  | Amount |
+------------+--------+
| 2026-01-15 | 100    |
| 2026-01-20 | 200    |
| 2026-02-10 | 150    |
| 2026-02-20 | 250    |
+------------+--------+
  `,

  methods: [
    {
      name: 'GROUP BY + EXTRACT',

      query: `SELECT EXTRACT(YEAR FROM sale_date) AS year, EXTRACT(MONTH FROM sale_date) AS month, SUM(amount) AS total_sales FROM sales GROUP BY year, month ORDER BY year, month;`
    }
  ],

  output: `
+------+-------+-------------+
| Year | Month | Total Sales |
+------+-------+-------------+
| 2026 | 1     | 300         |
| 2026 | 2     | 400         |
+------+-------+-------------+
  `
},
{
  title: 'Top 3 Highest Paid Employees',
  icon: '🏆',

  purpose: 'Retrieve top 3 salaries.',

  input: `
John   70000
Emma   90000
Mike   85000
David  60000
Sara   95000
  `,

  methods: [
    {
      name: 'ORDER BY + LIMIT',

      query: `SELECT * FROM employees ORDER BY salary DESC LIMIT 3;`
    }
  ],

  output: `
Sara   95000
Emma   90000
Mike   85000
  `
},
{
  title: 'All Orders With Customer Names',
  icon: '📦',

  purpose: 'Join orders with customers.',

  input: `
Customers

1 John
2 Emma

Orders

101 1
102 1
103 2
  `,

  methods: [
    {
      name: 'INNER JOIN',

      query: `SELECT o.order_id, c.customer_name FROM orders o JOIN customers c ON o.customer_id = c.customer_id;`
    }
  ],

  output: `
101 John
102 John
103 Emma
  `
},
{
  title: 'Monthly Sales Report',
  icon: '📅',

  purpose: 'Total and average sales by month.',

  input: `
Jan 100
Jan 300
Feb 200
Feb 400
  `,

  methods: [
    {
      name: 'GROUP BY Month',

      query: `SELECT EXTRACT(MONTH FROM payment_date), SUM(amount), AVG(amount) FROM payments GROUP BY EXTRACT(MONTH FROM payment_date);`
    }
  ],

  output: `
Month Total Avg

1     400   200
2     600   300
  `
},
{
  title: 'Employee And Manager',
  icon: '👨‍💼',

  purpose: 'Find manager for every employee.',

  input: `
+----+------+------------+
| Id | Name | Manager Id |
+----+------+------------+
| 1  | John | NULL       |
| 2  | Emma | 1          |
| 3  | Mike | 1          |
+----+------+------------+
  `,

  methods: [
    {
      name: 'SELF JOIN',

      query: `SELECT e.name, m.name FROM employees e LEFT JOIN employees m ON e.manager_id = m.employee_id;`
    }
  ],

  output: `
John  NULL
Emma  John
Mike  John
  `
},
{
  title: 'Customers Never Ordered',
  icon: '🚫',

  purpose: 'Find customers without orders.',

  input: `
Customers

1 John
2 Emma
3 Mike

Orders

101 -> 1
102 -> 2
  `,

  methods: [
    {
      name: 'NOT IN',

      query: `SELECT * FROM customers WHERE customer_id NOT IN (SELECT customer_id FROM orders);`
    }
  ],

  output: `
3 Mike
  `
},
{
  title: 'Most Sold Product',
  icon: '🔥',

  purpose: 'Find product sold most times.',

  input: `
Laptop  10
Mobile  15
TV      5
  `,

  methods: [
    {
      name: 'GROUP BY + SUM',

      query: `SELECT product_name, SUM(quantity) AS total_quantity FROM products p JOIN order_items oi ON oi.product_id = p.product_id GROUP BY product_name ORDER BY total_quantity DESC LIMIT 1; `
    }
  ],

  output: `
Mobile  15
  `
},
{
  title: 'Most Ordered Customer',
  icon: '👑',

  purpose: 'Find customer placing maximum orders.',

  input: `
John -> 5 orders
Emma -> 3 orders
Mike -> 8 orders
  `,

  methods: [
    {
      name: 'COUNT + ORDER BY',

      query: `SELECT customer_name, COUNT(*) AS total_orders FROM customers c JOIN orders o ON o.customer_id = c.customer_id
GROUP BY customer_name ORDER BY total_orders DESC LIMIT 1;`
    }
  ],

  output: `
Mike  8
  `
},
{
  title: 'Customer Purchased Products',
  icon: '🛒',

  purpose: 'Retrieve customer names along with products they purchased using multiple joins.',

  input: `

Customers

+-------------+--------+
| customer_id | name   |
+-------------+--------+
| 1           | John   |
| 2           | Emma   |
+-------------+--------+


Orders

+----------+-------------+
| order_id | customer_id |
+----------+-------------+
| 101      | 1           |
| 102      | 2           |
+----------+-------------+


Order_Items

+----------+------------+
| order_id | product_id |
+----------+------------+
| 101      | 1          |
| 101      | 2          |
| 102      | 3          |
+----------+------------+


Products

+------------+----------+
| product_id | product  |
+------------+----------+
| 1          | Laptop   |
| 2          | Mouse    |
| 3          | Keyboard |
+------------+----------+
  `,

  methods: [
    {
      name: '4 Table Join',

      query: `SELECT c.name,p.product FROM customers c
INNER JOIN orders o ON c.customer_id = o.customer_id
INNER JOIN order_items oi ON o.order_id = oi.order_id
INNER JOIN products p ON oi.product_id = p.product_id;`
    }
  ],

  processing: `

customers
    ↓
orders
    ↓
order_items
    ↓
products

John
  → Order 101
      → Product 1 (Laptop)
      → Product 2 (Mouse)

Emma
  → Order 102
      → Product 3 (Keyboard)

  `,

  output: `

+--------+----------+
| Name   | Product  |
+--------+----------+
| John   | Laptop   |
| John   | Mouse    |
| Emma   | Keyboard |
+--------+----------+  `
},
{
  title: 'Department Employee Manager',
  icon: '🏢',

  purpose: 'Retrieve employee, manager and department information.',

  input: `

Employees

1 John  1  NULL
2 Emma  1  1
3 Mike  2  1

(Id, Name, DeptId, ManagerId)

Departments

1 HR
2 IT

  `,

  query: `SELECT e.name AS employee, m.name AS manager, d.department_name FROM employees e LEFT JOIN employees m ON e.manager_id = m.employee_id INNER JOIN departments d ON e.department_id = d.department_id;`,

  output: `

John  NULL  HR
Emma  John  HR
Mike  John  IT

  `
},
{
  title: 'Latest Order Per Customer',
  icon: '🕒',

  purpose: 'Retrieve the most recent order placed by each customer.',

  input: `

Customers

+-------------+--------+
| customer_id | name   |
+-------------+--------+
| 1           | John   |
| 2           | Emma   |
| 3           | Mike   |
+-------------+--------+


Orders

+----------+-------------+------------+
| order_id | customer_id | order_date |
+----------+-------------+------------+
| 101      | 1           | 2025-01-10 |
| 102      | 1           | 2025-02-15 |
| 103      | 2           | 2025-01-20 |
| 104      | 2           | 2025-03-01 |
| 105      | 3           | 2025-02-05 |
+----------+-------------+------------+

  `,

  methods: [

    {
      name: 'ROW_NUMBER() (Recommended)',

      query: `SELECT * FROM (SELECT o.*,ROW_NUMBER() OVER(PARTITION BY customer_id ORDER BY order_date DESC) AS rn FROM orders o) latest_orders WHERE rn = 1;`
    },

    {
      name: 'MAX() + JOIN',

      query: `SELECT o.* FROM orders o INNER JOIN (SELECT customer_id, MAX(order_date) AS latest_date FROM orders GROUP BY customer_id) latest ON o.customer_id = latest.customer_id AND o.order_date = latest.latest_date;`
    },

    {
      name: 'Correlated Subquery',

      query: `SELECT * FROM orders o WHERE order_date =(SELECT MAX(order_date) FROM orders WHERE customer_id = o.customer_id);`
    }

  ],

  processing: `

John

101 → 2025-01-10
102 → 2025-02-15 ✅ Latest


Emma

103 → 2025-01-20
104 → 2025-03-01 ✅ Latest


Mike

105 → 2025-02-05 ✅ Latest

  `,

  output: `

+----------+-------------+------------+
| order_id | customer_id | order_date |
+----------+-------------+------------+
| 102      | 1           | 2025-02-15 |
| 104      | 2           | 2025-03-01 |
| 105      | 3           | 2025-02-05 |
+----------+-------------+------------+

  `
},
{
  title: 'Rank Employees by Salary',
  icon: '📊',

  purpose: 'Assign rank to employees based on salary within each department.',

  input: `

Employees

+----+------+------------+--------+
| id | name | department | salary |
+----+------+------------+--------+
| 1  | John | HR         | 60000  |
| 2  | Emma | HR         | 90000  |
| 3  | Mike | IT         | 85000  |
| 4  | Sara | IT         | 95000  |
| 5  | Alex | HR         | 60000  |
+----+------+------------+--------+

  `,

  methods: [

    {
      name: 'DENSE_RANK() (Recommended)',

      query: `SELECT name, department, salary, DENSE_RANK() OVER(PARTITION BY department ORDER BY salary DESC) AS salary_rank FROM employees;`
    },

    {
      name: 'RANK()',

      query: `SELECT name, department, salary, RANK() OVER(PARTITION BY department ORDER BY salary DESC) AS salary_rank FROM employees;`
    },

    {
      name: 'ROW_NUMBER() (Not Recommended for Ranks)',

      query: `SELECT name, department, salary, ROW_NUMBER() OVER(PARTITION BY department ORDER BY salary DESC) AS salary_rank FROM employees;`
    }

  ],

  processing: `

For Each Department:
  Order employees by salary (descending)
  Assign Rank

HR Department:
Emma   → 90000 → Rank 1
Alex   → 60000 → Rank 2
John   → 60000 → Rank 2
(DENSE_RANK gives same rank for ties)

IT Department:
Sara   → 95000 → Rank 1
Mike   → 85000 → Rank 2
  `,

  output: `

Using DENSE_RANK (Recommended for Salary Rankings):

+------+------------+--------+-------------+
| name | department | salary | salary_rank |
+------+------------+--------+-------------+
| Emma | HR         | 90000  | 1           |
| Alex | HR         | 60000  | 2           |
| John | HR         | 60000  | 2           |
| Sara | IT         | 95000  | 1           |
| Mike | IT         | 85000  | 2           |
+------+------------+--------+-------------+

  `
},
{
  title: 'Find Employees With Same Salary',
  icon: '👯',

  purpose: 'Retrieve all employees who share the same salary amount.',

  input: `

Employees

+----+------+--------+
| id | name | salary |
+----+------+--------+
| 1  | John | 60000  |
| 2  | Emma | 90000  |
| 3  | Mike | 85000  |
| 4  | Sara | 60000  |
| 5  | Alex | 90000  |
| 6  | Lisa | 70000  |
+----+------+--------+

  `,

  methods: [

    {
      name: 'Window Function (Efficient)',

      query: `SELECT * FROM (SELECT e.*, DENSE_RANK() OVER(PARTITION BY salary ORDER BY id) AS rank_num FROM employees e) ranked WHERE rank_num > 1;`
    },

    {
      name: 'Self Join',

      query: `SELECT e1.* FROM employees e1 JOIN employees e2 ON e1.salary = e2.salary AND e1.id <> e2.id;`
    },

    {
      name: 'GROUP BY + HAVING',

      query: `SELECT * FROM employees WHERE salary IN (SELECT salary FROM employees GROUP BY salary HAVING COUNT(*) > 1);`
    }

  ],

  processing: `

Identify Salary Groups:
  60000 → John, Sara (2 employees)
  90000 → Emma, Alex (2 employees)
  85000 → Mike (1 employee)
  70000 → Lisa (1 employee)

Select Only Shared Salaries:
  Exclude 85000 and 70000

  `,

  output: `

+----+------+--------+
| id | name | salary |
+----+------+--------+
| 1  | John | 60000  |
| 4  | Sara | 60000  |
| 2  | Emma | 90000  |
| 5  | Alex | 90000  |
+----+------+--------+ `
}
  ]
  stringAndJoins = [
    {
  title: 'String Functions',
  icon: '🔤',

  concepts: [

    {
      name: 'UPPER()',

      purpose: 'Convert text to uppercase.',

      input: `John
Emma
Mike`,

      methods: [{
        name: 'UPPER',
        query: `SELECT UPPER(name) FROM employees;`
      }],

      output: `
JOHN
EMMA
MIKE
      `
    },

    { 
      name: 'LOWER()',

      purpose: 'Convert text to lowercase.',

      input: `
JOHN
EMMA
MIKE
      `,

      methods: [{
        name: 'LOWER',
        query: `SELECT LOWER(name) FROM employees;`
      }],

      output: `
john
emma
mike
      `
    },

    {
      name: 'CONCAT()',

      purpose: 'Combine multiple strings.',

      input: `
first_name | last_name
----------------------
John       | Smith
Emma       | Watson
      `,

      methods: [{
        name: 'CONCAT',
        query: `SELECT CONCAT( first_name,' ',last_name) FROM employees;`
      }],

      output: `
John Smith
Emma Watson
      `
    },

    {
      name: 'SUBSTRING()',

      purpose: 'Extract portion of text.',

      input: `
John Smith
      `,

      methods: [{
        name: 'SUBSTRING',
        query: `SELECT SUBSTRING('John Smith', 1, 4);  ---- john (like no 0 index)`
      }],

      output: `
John
      `
    },

    {
      name: 'LENGTH()',

      purpose: 'Count characters.',

      input: `
John Smith
      `,

      methods: [{
        name: 'LENGTH',
        query: `SELECT LENGTH('John Smith');`
      }],

      output: `
10
      `
    },

    {
      name: 'REPLACE()',

      purpose: 'Replace text.',

      input: `
John Smith
      `,

      methods: [{
        name: 'REPLACE',
        query: `SELECT REPLACE('John Smith','Smith','Doe');`
      }],

      output: `
John Doe
      `
    },

    {
      name: 'TRIM()',

      purpose: 'Remove leading and trailing spaces.',

      input: `
'   John   '
      `,

      methods: [{
        name: 'TRIM',
        query: `SELECT TRIM('   John   ');`
      }],

      output: `
John
      `
    }
  ]
},
{
  title: 'LIKE Pattern Matching',
  icon: '🎯',

  concepts: [

    {
      name: 'Starts With A',

      query: `SELECT * FROM employees WHERE name LIKE 'A%';`,

      input: `
Alex
Emma
Andrew
John
      `,

      output: `
Alex
Andrew
      `
    },

    {
      name: 'Ends With n',

      query: `SELECT * FROM employees WHERE name LIKE '%n';`,

      input: `
John
Emma
Martin
Alex
      `,

      output: `
John
Martin
      `
    },

    {
      name: 'Contains son',

      query: `SELECT * FROM employees WHERE name LIKE '%son%';`,

      input: `
Johnson
Jason
Emma
      `,

      output: `
Johnson
Jason
      `
    },

    {
      name: 'Exactly 5 Characters',

      query: `SELECT * FROM employees WHERE name LIKE '_____';`,

      input: `
David
John
Emma
Sarah
      `,

      output: `
David
Sarah
      `
    }
  ]
},
{
  title: 'Customers Who Never Ordered',
  icon: '🚫',

  input: `

Customers

1 John
2 Emma
3 Mike

Orders

101 -> 1
102 -> 2

  `,

  methods: [

    {
      name: 'LEFT JOIN',

      query: `SELECT c.* FROM customers c LEFT JOIN orders o ON c.customer_id = o.customer_id WHERE o.order_id IS NULL;`
    }

  ],

  output: `
3 Mike
  `
},
{
  title: 'Department Wise Employee Count',
  icon: '🏢',

  input: `

Employees

John  HR
Emma  HR
Mike  IT
Sara  IT
Tom   IT

  `,

  methods: [

    {
      name: 'JOIN + GROUP BY',

      query: `SELECT department_name, COUNT(*) FROM employees e JOIN departments d ON e.department_id = d.department_id GROUP BY department_name;`
    }

  ],

  output: `

HR  2
IT  3

  `
},
{
  title: 'Products Never Sold',
  icon: '📦',

  input: `

Products

1 Laptop
2 Mouse
3 Keyboard

Order Items

101 -> 1
102 -> 2

  `,

  methods: [

    {
      name: 'LEFT JOIN',

      query: `SELECT p.* FROM products p LEFT JOIN order_items oi ON p.product_id = oi.product_id WHERE oi.product_id IS NULL;
      `
    }

  ],

  output: `
3 Keyboard
  `
},
{
  title: 'INNER JOIN',
  icon: '🔗',

  purpose: 'Return only matching records from both tables.',

  whenToUse: `
Use when you only care about records that exist in BOTH tables.

Examples:
- Customers who placed orders
- Employees assigned to departments
- Students enrolled in courses
  `,

  input: `

Customers

+----+------+
| Id | Name |
+----+------+
| 1  | John |
| 2  | Emma |
| 3  | Mike |
+----+------+


Orders

+----------+-------------+
| Order Id | Customer Id |
+----------+-------------+
| 101      | 1           |
| 102      | 2           |
+----------+-------------+

  `,

  query: `SELECT c.name, o.order_id FROM customers c INNER JOIN orders o ON c.id = o.customer_id;`,

  output: `

John  101
Emma  102

  `,

  note: `
Mike is excluded because he has no order.
  `
},
{
  title: 'LEFT JOIN',
  icon: '⬅️',

  purpose: 'Return all rows from left table and matching rows from right table.',

  whenToUse: `
Use when you want ALL records from the main table
even if related data does not exist.

Examples:
- All customers and their orders
- All employees and their managers
- All products and their sales
  `,

  input: `

Customers

1 John
2 Emma
3 Mike

Orders

101 -> 1
102 -> 2

  `,

  query: `SELECT c.name, o.order_id FROM customers c LEFT JOIN orders o ON c.id = o.customer_id;`,

  output: `

John  101
Emma  102
Mike  NULL

  `,

  note: `
Most commonly used join in real projects.
  `
},
{
  title: 'RIGHT JOIN',
  icon: '➡️',

  purpose: 'Return all rows from right table and matching rows from left table.',

  whenToUse: `
Use when the RIGHT table is your primary focus.

Examples:
- Show all departments even if no employees exist.
- Show all courses even if no students enrolled.
- Show all categories even if no products exist.
  `,

  input: `

Employees

John  Dept 1
Emma  Dept 2

Departments

1 HR
2 IT
3 Finance

  `,

  query: `SELECT e.name, d.department_name FROM employees e RIGHT JOIN departments d ON e.department_id = d.department_id;`,

  output: `

John  HR
Emma  IT
NULL  Finance

  `,

  note: `
Finance appears even though no employee belongs to it.
  `
},
{
  title: 'FULL OUTER JOIN',
  icon: '🌍',

  purpose: 'Return all rows from both tables.',

  whenToUse: `
Use when you need to compare two datasets
and see matching and non-matching records.

Examples:
- Old vs New Employees
- Source vs Target Data Validation
- System A vs System B Reconciliation
  `,

  input: `

Employees

John  Dept 1
Emma  Dept 2
Mike  Dept 4


Departments

1 HR
2 IT
3 Finance

  `,

  query: `SELECT e.name,d.department_name FROM employees e FULL OUTER JOIN departments d ON e.department_id = d.department_id;`,

  output: `
John  HR
Emma  IT
Mike  NULL
NULL  Finance
  `,

  note: `
Shows unmatched records from BOTH sides.
  `
},
{
  title: 'SELF JOIN',
  icon: '👥',

  purpose: 'Join a table to itself.',

  whenToUse: `
Use when you need to compare rows within the same table.

Common Scenarios:
- Find employees with same manager
- Find duplicate records
- Hierarchical data queries
- Comparing previous/next records
  `,

  input: `

Employees

+----+------+-------------+
| id | name | manager_id  |
+----+------+-------------+
| 1  | John | NULL        |
| 2  | Emma | 1           |
| 3  | Mike | 1           |
| 4  | Sara | 2           |
+----+------+-------------+

  `,

  query: `SELECT e1.name AS employee, e2.name AS manager FROM employees e1 JOIN employees e2 ON e1.manager_id = e2.id;`,

  output: `

John  NULL
Emma  John
Mike  John
Sara  Emma

  `,

  note: `
John appears as manager for Emma and Mike
  `
},

{
  title: 'CROSS JOIN',
  icon: '⚛️',

  purpose: 'Return Cartesian product of two tables.',

  whenToUse: `
Returns every possible combination of rows.
Use when you need all pairs.

Examples:
- Test data generation
- Product variations (color × size)
- Comparing all items with all other items
  `,

  input: `

Table A

A
B

Table B

1
2

  `,

  query: `SELECT a.col AS table_a, b.col AS table_b FROM table_a b CROSS JOIN table_b b;`,

  output: `

A 1
A 2
B 1
B 2

  `,

  note: `
No ON condition needed.
Be careful - can produce huge result sets!
  `
}
  ]

  joinsUsage = `INNER JOIN
-----------
Need only matching data

Example: Customers who ordered


LEFT JOIN
----------
Need all left table records

Example: All customers and their orders


RIGHT JOIN
-----------
Need all right table records

Example: All departments even without employees


FULL OUTER JOIN
----------------
Need everything from both tables

Example:Data comparison / reconciliation`;


windowFunctionsSample = [
  {
  title: 'OVER()',
  icon: '🪟',

  purpose: 'Apply aggregate calculations without collapsing rows.',

  whyNeeded: `
GROUP BY reduces rows.

OVER() keeps every row while still performing calculations
using all rows in the window.
  `,

  input: `
Employees

John   70000
Emma   90000
Mike   80000
David  60000
  `,

  query: `SELECT first_name, salary, AVG(salary) OVER() FROM employees;`,

  output: `
John   70000   75000
Emma   90000   75000
Mike   80000   75000
David  60000   75000
  `
},
{
  title: 'PARTITION BY',
  icon: '📦',

  purpose: 'Split rows into groups while keeping all rows visible.',

  whyNeeded: `
GROUP BY hides individual rows.

PARTITION BY lets us calculate department-wise values
while still showing each employee.
  `,

  input: `
Name   Dept   Salary

John   HR     50000
Emma   HR     70000
Mike   IT     90000
Sara   IT    110000
  `,

  query: `SELECT name, department, salary, AVG(salary) OVER(PARTITION BY department) FROM employees;`,

  output: `
John   HR   50000    60000
Emma   HR   70000    60000

Mike   IT   90000   100000
Sara   IT  110000   100000
  `
},
{
  title: 'Running Sum',
  icon: '➕',

  purpose: 'Calculate cumulative totals.',

  whyNeeded: `
Useful for sales dashboards,
financial reports,
analytics charts.
  `,

  input: `
Id   Salary

1    1000
2    2000
3    3000
4    4000
  `,

  query: `SELECT employee_id, salary, SUM(salary) OVER(ORDER BY employee_id) FROM employees;`,

  output: `
1   1000   1000
2   2000   3000
3   3000   6000
4   4000  10000
  `
},
{
  title: 'Running Average',
  icon: '📈',

  purpose: 'Calculate cumulative averages.',

  input: `
1   1000
2   2000
3   3000
4   4000
  `,

  query: `SELECT employee_id, salary, AVG(salary) OVER(ORDER BY employee_id) FROM employees;`,

  output: `
1   1000   1000
2   2000   1500
3   3000   2000
4   4000   2500
  `
},
{
  title: 'ROW_NUMBER()',
  icon: '🔢',

  purpose: 'Assign unique sequential numbers.',

  whyNeeded: `
Used for:
- Pagination
- Removing duplicates
- Top N per group
  `,

  input: `
HR

John   70000
Emma   90000
Mike   80000
  `,

  query: `SELECT name, salary, ROW_NUMBER() OVER(ORDER BY salary DESC) FROM employees;`,

  output: `
Emma   90000   1
Mike   80000   2
John   70000   3
  `
},
{
  title: 'RANK()',
  icon: '🥇',

  purpose: 'Assign ranks with gaps.',

  input: `
A  90
B  90
C  80
D  70
  `,

  query: `SELECT name, marks, RANK() OVER(ORDER BY marks DESC) FROM scores;`,

  output: `
A   90   1
B   90   1
C   80   3
D   70   4
  `
},
{
  title: 'DENSE_RANK()',
  icon: '🏅',

  purpose: 'Assign ranks without gaps.',

  input: `
A  90
B  90
C  80
D  70
  `,

  query: `SELECT name, marks, DENSE_RANK() OVER(ORDER BY marks DESC) FROM scores;`,

  output: `
A   90   1
B   90   1
C   80   2
D   70   3
  `
},
{
  title: 'LAG()',
  icon: '⬅️',

  purpose: 'Access previous row value.',

  whyNeeded: `
Compare current row with previous row.

Useful for:
- Growth calculations
- Salary comparisons
- Trend analysis
  `,

  input: `
John   50000
Emma   60000
Mike   70000
  `,

  query: `SELECT name, salary, LAG(salary) OVER(ORDER BY salary) FROM employees;`,

  output: `
John   50000   NULL
Emma   60000   50000
Mike   70000   60000
  `
},
{
  title: 'LEAD()',
  icon: '➡️',

  purpose: 'Access next row value.',

  input: `
John   50000
Emma   60000
Mike   70000
  `,

  query: `SELECT name, salary, LEAD(salary) OVER(ORDER BY salary) FROM employees;`,

  output: `
John   50000   60000
Emma   60000   70000
Mike   70000   NULL
  `
},
{
  title: 'FIRST_VALUE()',
  icon: '🥇',

  purpose: 'Retrieve first value in window.',

  input: `
IT Department

Sara   110000
Mike    90000
John    70000
  `,

  query: `SELECT name, salary, FIRST_VALUE(salary) OVER(ORDER BY salary DESC) FROM employees;`,

  output: `
Sara   110000   110000
Mike    90000   110000
John    70000   110000
  `
},
{
  title: 'LAST_VALUE()',
  icon: '🏁',

  purpose: 'Retrieve last value in window.',

  whyNeeded: `
Must use ROWS BETWEEN
otherwise current row becomes last row.
  `,

  input: `
70000
80000
90000
110000
  `,

  query: `SELECT salary, LAST_VALUE(salary) OVER(ORDER BY salary ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING) FROM employees;`,

  output: `
70000   110000
80000   110000
90000   110000
110000  110000
  `
},
{
  title: 'ROWS BETWEEN',
  icon: '🪟',

  purpose: 'Create custom moving windows.',

  whyNeeded: `
Useful for:
- Moving Average
- Last 3 Days Sales
- Last 5 Transactions
  `,

  input: `
Day1 100
Day2 200
Day3 300
Day4 400
Day5 500
  `,

  query: `SELECT sales, AVG(sales) OVER(ORDER BY day_id ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) FROM sales;`,

  output: `
100   100
200   150
300   200
400   300
500   400
  `
},
];

windowFunctionQueries = [
  {
  title: 'Find Duplicates',
  icon: '🔁',

  purpose: 'Find duplicate employees based on first_name.',

  input: `

Employee_Id  First_Name

1            John
2            Emma
3            John
4            Mike

  `,

  query: `SELECT * FROM (SELECT *, ROW_NUMBER() OVER(PARTITION BY first_name ORDER BY employee_id) AS row_num FROM employees) t WHERE row_num > 1;`,

  output: `
Employee_Id  First_Name  Row_Num
3            John        2`
},
{
  title: 'Delete Duplicates',
  icon: '🗑️',

  purpose: 'Keep first occurrence and remove duplicates.',

  input: `

1 John
2 Emma
3 John
4 Mike

  `,

  query: `
DELETE FROM employees WHERE employee_id IN (
 SELECT employee_id FROM (
  SELECT employee_id, ROW_NUMBER() OVER(PARTITION BY first_name ORDER BY employee_id) rn FROM employees) x WHERE rn > 1
);`,

  output: `
1 John
2 Emma
4 Mike

  `
},
{
  title: 'Find Employees Without Duplicates',
  icon: '🚫',

  purpose: 'Select only unique first_names.',

  input: `
1 John
2 Emma
3 John
4 Mike
  `,

  query: `SELECT DISTINCT first_name FROM (SELECT *, ROW_NUMBER() OVER(PARTITION BY first_name ORDER BY employee_id) rn FROM employees) t WHERE rn = 1;`,

  output: `
John
Emma
Mike`
},
{
  title: 'Top N Per Group',
  icon: '🏆',

  purpose: 'Find top salaries per department.',

  input: `

Dept   Name   Salary

HR     John   80000
HR     Emma   90000
IT     Mike   70000
IT     Sara   60000

  `,

  query: `SELECT * FROM (SELECT *, RANK() OVER(PARTITION BY department ORDER BY salary DESC) rnk FROM employees) t WHERE rnk <= 2;`,

  output: `

Dept   Name   Salary  Rnk

HR     Emma   90000   1
HR     John   80000   2
IT     Mike   70000   1
IT     Sara   60000   2

  `
},
{
  title: 'Top 2 Salaries Per Department',
  icon: '🏆',

  purpose: 'Find highest 2 salaries in each department.',

  input: `

HR

John  50000
Emma  70000
Alex  65000

IT

Mike  90000
Sara 110000
Tom   85000

  `,

  query: `SELECT * FROM (SELECT first_name, department_name, salary, ROW_NUMBER() OVER(PARTITION BY department_name ORDER BY salary DESC) row_top FROM employees) t
WHERE row_top <= 2;`,

  output: `

HR

Emma 70000
Alex 65000

IT

Sara 110000
Mike 90000

  `
},
{
  title: 'Salary Contribution Percentage',
  icon: '📊',

  purpose: 'Calculate employee contribution to company payroll.',

  input: `

John  1000
Emma  2000
Mike  3000

Total = 6000

  `,

  query: `SELECT first_name, salary, ROUND(salary * 100 / SUM(salary) OVER(), 2) percentage FROM employees;`,

  output: `

John   1000   16.67%
Emma   2000   33.33%
Mike   3000   50.00%

  `
},
{
  title: 'Highest Salary Per Department',
  icon: '🥇',

  purpose: 'Find highest paid employee in each department.',

  input: `

HR

John 50000
Emma 70000

IT

Mike 90000
Sara 110000

  `,

  query: `SELECT * FROM (SELECT first_name, department_name, salary, DENSE_RANK() OVER(PARTITION BY department_name ORDER BY salary DESC) rank_salary FROM employees) t WHERE rank_salary = 1;`,

  output: `

Emma  HR   70000
Sara  IT  110000

  `
},
{
  title: 'Employees Above Department Average',
  icon: '📈',

  purpose: 'Find employees earning more than their department average.',

  input: `

HR

John 50000
Emma 70000

IT

Mike 90000
Sara 110000

  `,

  query: `SELECT * FROM (SELECT first_name, department_name, salary, AVG(salary) OVER(PARTITION BY department_name) dept_avg FROM employees) t WHERE salary > dept_avg;`,

  output: `

Emma  HR   70000

Sara  IT 110000

  `
},
{
  title: 'Running Balance',
  icon: '💰',

  purpose: 'Calculate account balance after every transaction.',

  input: `

Account 101

+------+--------+
| Date | Amount |
+------+--------+
| Day1 | 1000   |
| Day2 | -200   |
| Day3 | 500    |
+------+--------+

  `,

  query: `SELECT account_id, txn_date, amount, SUM(amount) OVER(PARTITION BY account_id ORDER BY txn_date) FROM transactions;`,

  output: `

1000

1000 - 200 = 800

800 + 500 = 1300

  `
},
{
  title: 'Sales Growth Compared To Previous Day',
  icon: '📉',

  purpose: 'Compare current sales with previous day.',

  input: `

Day1 1000
Day2 1200
Day3 900

  `,

  query: `SELECT sale_date, total_sales, LAG(total_sales) OVER(ORDER BY sale_date) previous_day_sales FROM daily_sales;`,

  output: `

Day1 1000 NULL

Day2 1200 1000

Day3 900 1200

  `
},
{
  title: 'Moving Average (Last 3 Days)',
  icon: '📊',

  purpose: 'Smooth out sales data using rolling average.',

  input: `

Day1 100
Day2 200
Day3 300
Day4 400
Day5 500

  `,

  query: `SELECT sales,AVG(sales) OVER(ORDER BY day_id ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) moving_avg_3_days FROM daily_sales;`,

  output: `
100 100

200 150 ((100+200)/2)

300 200 ((100+200+300)/3)

400 300 ((200+300+400)/3)

500 400 ((300+400+500)/3)
  `
},
{
  title: 'Salary Difference Between Employees',
  icon: '⚖️',

  purpose: 'Compare salary with previous employee salary.',

  input: `

Sara 110000
Mike  90000
Emma  70000

  `,

  query: `SELECT first_name, salary, salary - LAG(salary) OVER(ORDER BY salary DESC) difference FROM employees;`,

  output: `

Sara 110000  NULL

Mike  90000 -20000

Emma  70000 -20000

  `
},

{
  title: 'Lag and Lead',
  icon: '🪟',
  purpose: 'Access previous and next row values.',
  input: `
2022-01-01  100
2022-01-02  200
2022-01-03  150
2022-01-04  250
  `,
  query: `SELECT sale_date, sales, LAG(sales) OVER (ORDER BY sale_date) prev_day, LEAD(sales) OVER (ORDER BY sale_date) next_day FROM daily_sales;`,
  output: `
2022-01-01  100  NULL          200
2022-01-02  200  100           150
2022-01-03  150  200           250
2022-01-04  250  150           NULL
  `,
  whyNeeded: `
Use LAG() to compare with previous row (e.g., compare sales day-over-day).
Use LEAD() to look ahead (e.g., compare with next day's target).
  `,
},
{
  title: 'Running Total',
  icon: '💰',
  purpose: 'Calculate cumulative sum of transactions.',
  input: `
Order_ID  Amount
1         100
2         200
3         50
4         150
  `,
  query: `SELECT order_id,amount, SUM(amount) OVER (ORDER BY order_id) running_total FROM orders;`,
  output: `
Order_ID  Amount  Running_Total
1         100     100
2         200     300
3         50      350
4         150     500
  `,
  whyNeeded: `
Ideal for financial reports to show cumulative performance.
Unlike GROUP BY, it retains all individual rows.
  `,
},
{
  title: 'Rank by Department',
  icon: '🏆',
  purpose: 'Rank employees within their department based on salary.',
  input: `
Name   Department  Salary
John   HR          50000
Emma   HR          60000
Mike   IT          70000
Sara   IT          80000
  `,
  query: `SELECT * FROM (SELECT name, department, salary, RANK() OVER (PARTITION BY department ORDER BY salary DESC) dept_rank FROM employees) t WHERE dept_rank <= 2;`,

  output: `
Name   Department  Salary  Dept_Rank
Emma   HR          60000   1
John   HR          50000   2
Sara   IT          80000   1
Mike   IT          70000   2
  `,
  whyNeeded: `
RANK() gives same rank for ties and skips next rank.
Use DENSE_RANK() if you don't want to skip ranks after ties.
  `,
},
{
  title: 'Running Average',
  icon: '📈',
  purpose: 'Calculate moving average over time.',
  input: `
Date    Sales
Jan     100
Feb     200
Mar     150
Apr     250
  `,
  query: `SELECT month,sales, AVG(sales) OVER (ORDER BY month ROWS BETWEEN 3 PRECEDING AND CURRENT ROW) rolling_avg_4_months FROM monthly_sales;`,
  output: `
Jan     100       100.00
Feb     200       150.00  -- (100+200)/2
Mar     150       150.00  -- (100+200+150)/3
Apr     250       175.00  -- (100+200+150+250)/4
  `,
  whyNeeded: `
Smooths out data to identify trends.
ROWS BETWEEN clause defines the window size (here last 4 months including current).
  `,
},
{
  title: 'First Value in Group',
  icon: '🥇',
  purpose: 'Get the first value within each partition.',
  input: `
Department  Name   Joining_Date
HR          John   2020-01-01
HR          Emma   2021-06-15
IT          Mike   2019-03-10
IT          Sara   2022-01-01
  `,
  query: `SELECT * FROM (SELECT name,department,joining_date,FIRST_VALUE(name) OVER (PARTITION BY department ORDER BY joining_date ASC) first_employee_in_dept FROM employees) t
WHERE joining_date = '2022-01-01'; -- Filter just to show Sara's row`,
  output: `
Name   Department  Joining_Date  First_Employee_In_Dept
Sara   IT          2022-01-01    Mike
  `,
  whyNeeded: `
Useful for assigning metrics from the start of a period (e.g., first employee joined in this department).
  `,
},
{
  title: 'Offset Calculation',
  icon: '🧮',
  purpose: 'Calculate difference between a value and its Nth predecessor or successor.',
  input: `
Date    Sales
Day1    100
Day2    120
Day3    150
Day4    140
Day5    180
  `,
  query: `SELECT sale_date, sales, LAG(sales, 2) OVER (ORDER BY sale_date) sales_2_days_ago FROM daily_sales;`,
  output: `
Day1    100         NULL
Day2    120         NULL
Day3    150         100
Day4    140         120
Day5    180         150
  `,
  whyNeeded: `
Use LAG(col, n) to compare with n rows back.
Use LEAD(col, n) to compare with n rows forward.
  `,
},
{
  title: 'Cumulative Percentage',
  icon: '📈',
  purpose: 'Show cumulative total as a percentage of grand total.',
  input: `
Product  Sales
A        100
B        300
C        600
  `,
  query: `SELECT product, sales, SUM(sales) OVER (ORDER BY sales DESC) cumulative_sales,
 SUM(sales) OVER (ORDER BY sales DESC) * 100.0 / SUM(sales) OVER() AS cumulative_percentage
FROM products;`,

  output: `
Product  Sales  Cumulative_Sales  Cumulative_Percentage
C        600    600               60.0%
B        300    900               90.0%
A        100    1000              100.0%
  `,
  whyNeeded: `
Helps identify the top products that contribute most to the total sales.
  `,
},
{
  title: 'Running Balance',
  icon: '💰',

  purpose: 'Calculate account balance after every transaction.',

  input: `Account 101

+------+--------+
| Date | Amount |
+------+--------+
| Day1 | 1000   |
| Day2 | -200   |
| Day3 | 500    |
+------+--------+`,

  query: `SELECT account_id, txn_date, amount, SUM(amount) OVER(PARTITION BY account_id ORDER BY txn_date) FROM transactions;`,

  output: `

1000

1000 - 200 = 800

800 + 500 = 1300

  `
},
{
  title: 'Sales Growth Compared To Previous Period',
  icon: '📈',

  purpose: 'Compare current month sales with previous month.',

  input: `

Month   Sales
Jan     10000
Feb     12000
Mar     11000
Apr     15000

  `,

  query: `SELECT month, sales, LAG(sales) OVER (ORDER BY month) previous_month_sales, (sales - LAG(sales) OVER (ORDER BY month)) AS growth FROM monthly_sales; `,

  output: `

Jan     10000   NULL          NULL
Feb     12000   10000         2000
Mar     11000   12000         -1000
Apr     15000   11000         4000

  `
},
{
  title: 'Sales Growth Compared To Previous Day',
  icon: '📉',

  purpose: 'Compare current sales with previous day.',

  input: `

Day1 1000
Day2 1200
Day3 900

  `,

  query: `SELECT sale_date, total_sales, LAG(total_sales) OVER(ORDER BY sale_date) previous_day_sales FROM daily_sales;`,

  output: `

Day1 1000 NULL

Day2 1200 1000

Day3 900 1200

  `
},
{
  title: 'Salary Difference Between Employees',
  icon: '⚖️',

  purpose: 'Compare salary with previous employee salary.',

  input: `

Sara 110000
Mike  90000
Emma  70000

  `,

  query: `SELECT first_name, salary, salary - LAG(salary) OVER(ORDER BY salary DESC) difference FROM employees;`,

  output: `

Sara 110000  NULL

Mike  90000 -20000

Emma  70000 -20000

  `
},
{
  title: 'Pagination Using ROW_NUMBER with CTE function',
  icon: '📄',

  purpose: 'Fetch records page by page.',

  input: `

10 Products

  `,

  query: `WITH numbered AS (SELECT *, ROW_NUMBER() OVER(ORDER BY price DESC) row_num FROM products)

SELECT * FROM numbered WHERE row_num BETWEEN 3 AND 6;`,

  output: `

Records

3
4
5
6

Only

  `
},
{
  title: 'Highest Quantity Purchased Per Product',
  icon: '📦',

  purpose: 'Find highest quantity order for each product.',

  input: `

Product 1

Qty 2
Qty 5
Qty 3

  `,

  query: `SELECT * FROM (SELECT product_id,quantity,ROW_NUMBER() OVER(PARTITION BY product_id ORDER BY quantity DESC) row_num FROM order_items) t
WHERE row_num = 1;`,

  output: `

Product 1

Qty 5

  `
},

{
  title: 'RANK vs DENSE_RANK',
  icon: '🏅',

  input: `

Name  Marks

A      90
B      90
C      80
D      70

  `,

  query: `RANK() VS DENSE_RANK() `,

  output: `

RANK()

A 90  1
B 90  1
C 80  3
D 70  4

Gap Exists
Missing Rank = 2


DENSE_RANK()

A 90  1
B 90  1
C 80  2
D 70  3

No Gaps  `,

  interviewTip: `

RANK()

1
1
3
4

Skipped Rank 2


DENSE_RANK()

1
1
2
3

No Missing Numbers

Use DENSE_RANK when
finding:

2nd Highest Salary
3rd Highest Salary

because ranks remain continuous.
  `
}
]
}