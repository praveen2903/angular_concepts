import { ChangeDetectorRef, Component } from '@angular/core';


export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  stock: number;
}


@Component({
  selector: 'app-parent-machinecodes',
  standalone: false,
  templateUrl: './parent-machinecodes.html',
  styleUrl: './parent-machinecodes.css',
})
export class ParentMachinecodes {
  constructor(private cdr: ChangeDetectorRef) {}
  cart: CartItem[] = [
    {
      id: 1,
      name: 'Laptop',
      price: 65000,
      quantity: 1,
      stock: 5
    },
    {
      id: 2,
      name: 'Mouse',
      price: 1200,
      quantity: 2,
      stock: 15
    },
    {
      id: 3,
      name: 'Keyboard',
      price: 2500,
      quantity: 1,
      stock: 8
    }
  ];

  nextId = 4;

  addProduct() {
    const product: CartItem = {
      id: this.nextId,
      name: 'Product ' + this.nextId,
      price: 1000 * this.nextId,
      quantity: 1,
      stock: 10
    };

    // Create a NEW array reference
    // This will trigger ngOnChanges() in the child
    this.cart = [...this.cart, product];
    this.nextId++;
  }

  loadSavedCart() {

    console.log('Parent : Loading Saved Cart');

    this.cart = [
      {
        id: 11,
        name: 'Monitor',
        price: 15000,
        quantity: 1,
        stock: 4
      },
      {
        id: 12,
        name: 'Headphones',
        price: 3000,
        quantity: 2,
        stock: 10
      },
      {
        id: 13,
        name: 'Webcam',
        price: 5000,
        quantity: 1,
        stock: 6
      }
    ];

  }

  clearCart() {
    this.cart = [];
  }

  parentts= `
  import { Component } from '@angular/core';


export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  stock: number;
}


@Component({
  selector: 'app-parent-machinecodes',
  standalone: false,
  templateUrl: './parent-machinecodes.html',
  styleUrl: './parent-machinecodes.css',
})
export class ParentMachinecodes {
  cart: CartItem[] = [
    {
      id: 1,
      name: 'Laptop',
      price: 65000,
      quantity: 1,
      stock: 5
    },
    {
      id: 2,
      name: 'Mouse',
      price: 1200,
      quantity: 2,
      stock: 15
    },
    {
      id: 3,
      name: 'Keyboard',
      price: 2500,
      quantity: 1,
      stock: 8
    }
  ];

  nextId = 4;

  addProduct() {
    const product: CartItem = {
      id: this.nextId,
      name: 'Product ' + this.nextId,
      price: 1000 * this.nextId,
      quantity: 1,
      stock: 10
    };

    // Create a NEW array reference
    // This will trigger ngOnChanges() in the child
    this.cart = [...this.cart, product];
    this.nextId++;
  }

  loadSavedCart() {

    console.log('Parent : Loading Saved Cart');

    this.cart = [
      {
        id: 11,
        name: 'Monitor',
        price: 15000,
        quantity: 1,
        stock: 4
      },
      {
        id: 12,
        name: 'Headphones',
        price: 3000,
        quantity: 2,
        stock: 10
      },
      {
        id: 13,
        name: 'Webcam',
        price: 5000,
        quantity: 1,
        stock: 6
      }
    ];

  }

  clearCart() {
    this.cart = [];
  }
}
`;

parentHtml= `
<div class="container">

    <h1>Shopping Cart (Parent Component)</h1>

    <button (click)="addProduct()">
        Add Product
    </button>

    <button (click)="loadSavedCart()">
        Load Saved Cart
    </button>

    <button (click)="clearCart()">
        Clear Cart
    </button>

    <hr>

    <h3>Parent Cart</h3>

    <table border="1" cellpadding="10">

        <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Qty</th>
        </tr>

        <tr *ngFor="let item of cart">

            <td>{{item.name}}</td>
            <td>₹{{item.price}}</td>
            <td>{{item.quantity}}</td>

        </tr>

    </table>

    <br>

    <!-- Child Component -->

    <app-child-machinecodes [cartItems]="cart"></app-child-machinecodes>

</div>`;

parentTheory = `
==========================================
PARENT → CHILD DATA FLOW
==========================================

Angular allows a parent component to send data to a child component using @Input().

Parent Component
----------------
Parent owns the data.

Example:
cartItems = [
  { id: 1, name: 'Laptop', quantity: 1 }
];

HTML
<app-cart-item [items]="cartItems"> </app-cart-item>

The [] indicates Property Binding. Whenever cartItems changes, Angular sends the latest value to the child.

------------------------------------------
Child Component
----------------

@Component({...})
export class CartItemComponent {
    @Input() items: any[] = [];
}

The child never owns the data. It only receives it from the parent.

Data Flow
Parent
   │
   │ @Input()
   ▼
Child

The child should not modify the parent's data directly unless that is the intended behavior.

==========================================
ngOnChanges()
==========================================
Purpose
-------
Runs whenever an @Input() property changes. Angular compares the previous value with the new value.

If different, ngOnChanges() executes BEFORE ngOnInit() (first time) and BEFORE the component updates.

Signature
ngOnChanges(changes: SimpleChanges)

SimpleChanges contains

previousValue
currentValue
firstChange
isFirstChange()

Example
Previous Value
--------------
Laptop

Current Value
-------------
Laptop, Mouse

Result
ngOnChanges() executes.

==========================================
Execution Order
==========================================

Parent creates child
    ↓
Parent sends @Input()
    ↓

ngOnChanges()
    ↓
ngOnInit()
    ↓
Angular renders HTML
    ↓ 
ngAfterViewInit()

==========================================
SimpleChanges Example
==========================================
changes = {
    items: {
        previousValue: [],
        currentValue: [
          { id:1, name:'Laptop'}
        ],

        firstChange: true
    }
}

Useful Properties
changes['items'].previousValue
changes['items'].currentValue
changes['items'].firstChange
changes['items'].isFirstChange()
==========================================
When ngOnChanges() Runs
==========================================
Case 1
------
Parent changes a variable.
cartCount = 2
    ↓
cartCount = 5
Runs? YES

------------------------------------------
Case 2
------
API data arrives.
Initial
products = []
    ↓
API returns
products = [...]
Runs? YES
------------------------------------------
Case 3
------
Parent selects another user. Selected User
John
    ↓
Selected User David
Runs? YES
------------------------------------------
Case 4
------
Filtering
products
    ↓
filteredProducts
Runs? YES
------------------------------------------
Case 5
------
Searching searchText
    ↓
  "Lap"
    ↓
"Laptop"
Runs? YES

------------------------------------------
Case 6
------
Sorting
Ascending
    ↓
Descending
Runs? YES
------------------------------------------
Case 7
------
Theme Change
Light
  ↓
Dark
Runs? YES
------------------------------------------
Case 8
------
Language Change
English
↓
French
Runs? YES
------------------------------------------
Case 9
------
Edit Existing Order
Parent loads Order #100
    ↓
Parent loads Order #101
Runs? YES
------------------------------------------
Case 10
-------
Dashboard Refresh
Statistics
    ↓
Updated Statistics
Runs? YES
==========================================
When ngOnChanges() DOES NOT Run
==========================================
If an @Input() never changes.

Example
Parent

count = 10

Never modified again.

ngOnChanges()

Runs only once during initial binding.

------------------------------------------
If the child changes its own local variable. need external variable to get updated

Example
localCount++
Runs? NO
Because localCount is NOT an @Input().
==========================================
Common Uses of ngOnChanges()
==========================================
✔ Recalculate totals

✔ Filter data

✔ Refresh charts

✔ Update graphs

✔ Call another API

✔ Validate incoming data

✔ Reset forms

✔ Update pagination

✔ Update selected item

✔ Synchronize component state

==========================================
ngAfterViewInit()
==========================================

Purpose
-------
Runs after Angular creates the component's view and all child views.

The HTML already exists in the DOM.

This is the best place to work with ViewChild, ElementRef, and DOM elements.

Runs ONLY ONCE.
==========================================
Execution
==========================================
Constructor
↓
ngOnChanges()
↓
ngOnInit()
↓
Angular creates HTML
↓
ngAfterViewInit()
==========================================
Common Uses of ngAfterViewInit()
==========================================

✔ Focus an input box

✔ Read element width/height

✔ Scroll to a section

✔ Initialize charts

✔ Initialize maps

✔ Start animations

✔ Access ViewChild

✔ Access child component methods

✔ Integrate third-party libraries

==========================================
Example Situations
==========================================

Login Page
----------
Automatically focus Email textbox.

Use: ngAfterViewInit()

-----------------------------------------
Shopping Cart
-------------
Calculate total when items change.

Use: ngOnChanges()

------------------------------------------
Chart Dashboard
---------------
API returns new sales data.

Update chart.

Use: ngOnChanges()

------------------------------------------

Profile Page
------------
Parent loads another profile.

Update child details.

Use: ngOnChanges()

------------------------------------------

Image Gallery
-------------
Scroll to selected image after HTML is rendered.

Use: ngAfterViewInit()

------------------------------------------

Map Component
-------------
Initialize Google Maps after the container div exists.

Use: ngAfterViewInit()

==========================================
Quick Comparison
==========================================
ngOnChanges()

• Triggered by @Input() changes
• Can run multiple times
• Receives SimpleChanges
• Runs before the view updates
• Used for reacting to parent data changes

------------------------------------------

ngAfterViewInit()

• Runs after the view is created
• Runs only once
• Accesses DOM and ViewChild
• Used for UI initialization and DOM operations

==========================================
Interview Points
==========================================

1. ngOnChanges() only works with @Input() properties.

2. It runs before ngOnInit() during the first change.

3. It can execute multiple times whenever the parent sends new values.

4. ngAfterViewInit() executes only once.

5. ViewChild values are reliably available inside ngAfterViewInit().

6. DOM manipulation should generally be done in ngAfterViewInit(), not in ngOnInit().

7. Use ngOnChanges() when your component must react to changing parent data.`;

parentArray =[
  {
    index: 'html',
    data: this.parentHtml
  },
  {
    index: 'ts',
    data: this.parentts
  },
  {
    index: 'theory',
    data: this.parentTheory
  }
];

setIndex = 'ts'
setDataIndex(data: string){
  this.setIndex = data;
  this.cdr.detectChanges();
}
}
