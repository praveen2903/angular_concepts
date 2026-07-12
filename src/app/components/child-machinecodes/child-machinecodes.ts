import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';


interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  stock: number;
}


@Component({
  selector: 'app-child-machinecodes',
  standalone: false,
  templateUrl: './child-machinecodes.html',
  styleUrl: './child-machinecodes.css',
})
export class ChildMachinecodes implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @Input()
  cartItems: CartItem[] = [];

  @ViewChild('couponInput')
  couponInput!: ElementRef<HTMLInputElement>;

  coupon = '';

  subtotal = 0;
  gst = 0;
  discount = 0;
  grandTotal = 0;

  autoSaveTimer: any;

  constructor(private cdr: ChangeDetectorRef) {
    console.log('Constructor');
  }

  // -------------------------------
  // ngOnChanges
  // -------------------------------

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges');
    if (changes['cartItems']) {
      console.log('Parent updated cart');
      this.calculateBill();
    }
  }

  // -------------------------------
  // ngOnInit
  // -------------------------------

  ngOnInit(): void {
    console.log('ngOnInit');
    this.calculateBill();
    this.startAutoSave();
  }

  // -------------------------------
  // ngAfterViewInit
  // -------------------------------

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit');
    this.couponInput.nativeElement.focus();
  }

  // -------------------------------
  // ngOnDestroy
  // -------------------------------

  ngOnDestroy(): void {
    console.log('ngOnDestroy');
    clearInterval(this.autoSaveTimer);
  }

  // -------------------------------
  // Timer
  // -------------------------------

  startAutoSave() {
    this.autoSaveTimer = setInterval(() => {
      console.log('Auto Saving Cart...');
    }, 10000);
  }

  // -------------------------------
  // Increase Qty
  // -------------------------------

  increase(item: CartItem) {
    if (item.quantity < item.stock) {
      item.quantity++;
      this.calculateBill();
    }
  }

  // -------------------------------
  // Decrease Qty
  // -------------------------------

  decrease(item: CartItem) {
    if (item.quantity > 1) {
      item.quantity--;
      this.calculateBill();
    }
  }

  // -------------------------------
  // Remove Product
  // -------------------------------

  remove(item: CartItem) {
    this.cartItems = this.cartItems.filter(p => p.id !== item.id);
    this.calculateBill();
  }

  // -------------------------------
  // Apply Coupon
  // -------------------------------

  applyCoupon() {
    if (this.coupon === 'SAVE10') {
      this.discount = this.subtotal * 0.10;
      alert('Coupon Applied');
    }
    else {
      this.discount = 0;
      alert('Invalid Coupon');
      this.couponInput.nativeElement.focus();
    }
    this.calculateBill();
  }

  // -------------------------------
  // Calculate Bill
  // -------------------------------

  calculateBill() {
    this.subtotal = this.cartItems.reduce((sum, item) => {
        return sum + item.price * item.quantity;
      }, 0);

    this.gst = this.subtotal * 0.18;
    this.grandTotal = this.subtotal + this.gst - this.discount;
    
    console.log('Subtotal :', this.subtotal);
    console.log('GST :', this.gst);
    console.log('Discount :', this.discount);
    console.log('Grand Total :', this.grandTotal);
  }

childts= `
import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';


interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  stock: number;
}


@Component({
  selector: 'app-child-machinecodes',
  standalone: false,
  templateUrl: './child-machinecodes.html',
  styleUrl: './child-machinecodes.css',
})
export class ChildMachinecodes implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  @Input()
  cartItems: CartItem[] = [];

  @ViewChild('couponInput')
  couponInput!: ElementRef<HTMLInputElement>;

  coupon = '';

  subtotal = 0;
  gst = 0;
  discount = 0;
  grandTotal = 0;

  autoSaveTimer: any;

  constructor() {
    console.log('Constructor');
  }

  // -------------------------------
  // ngOnChanges
  // -------------------------------

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges');
    if (changes['cartItems']) {
      console.log('Parent updated cart');
      this.calculateBill();
    }
  }

  // -------------------------------
  // ngOnInit
  // -------------------------------

  ngOnInit(): void {
    console.log('ngOnInit');
    this.calculateBill();
    this.startAutoSave();
  }

  // -------------------------------
  // ngAfterViewInit
  // -------------------------------

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit');
    this.couponInput.nativeElement.focus();
  }

  // -------------------------------
  // ngOnDestroy
  // -------------------------------

  ngOnDestroy(): void {
    console.log('ngOnDestroy');
    clearInterval(this.autoSaveTimer);
  }

  // -------------------------------
  // Timer
  // -------------------------------

  startAutoSave() {
    this.autoSaveTimer = setInterval(() => {
      console.log('Auto Saving Cart...');
    }, 10000);
  }

  // -------------------------------
  // Increase Qty
  // -------------------------------

  increase(item: CartItem) {
    if (item.quantity < item.stock) {
      item.quantity++;
      this.calculateBill();
    }
  }

  // -------------------------------
  // Decrease Qty
  // -------------------------------

  decrease(item: CartItem) {
    if (item.quantity > 1) {
      item.quantity--;
      this.calculateBill();
    }
  }

  // -------------------------------
  // Remove Product
  // -------------------------------

  remove(item: CartItem) {
    this.cartItems = this.cartItems.filter(p => p.id !== item.id);
    this.calculateBill();
  }

  // -------------------------------
  // Apply Coupon
  // -------------------------------

  applyCoupon() {
    if (this.coupon === 'SAVE10') {
      this.discount = this.subtotal * 0.10;
      alert('Coupon Applied');
    }
    else {
      this.discount = 0;
      alert('Invalid Coupon');
      this.couponInput.nativeElement.focus();
    }
    this.calculateBill();
  }

  // -------------------------------
  // Calculate Bill
  // -------------------------------

  calculateBill() {
    this.subtotal = this.cartItems.reduce((sum, item) => {
        return sum + item.price * item.quantity;
      }, 0);

    this.gst = this.subtotal * 0.18;
    this.grandTotal = this.subtotal + this.gst - this.discount;
    
    console.log('Subtotal :', this.subtotal);
    console.log('GST :', this.gst);
    console.log('Discount :', this.discount);
    console.log('Grand Total :', this.grandTotal);
  }
}
`;

childHtml = `<div class="cart-container">
    <h2>🛒 Shopping Cart (Child Component)</h2>
    <hr>
    <!-- Coupon Section -->

    <div class="coupon-section">
        <input #couponInput type="text" placeholder="Enter Coupon Code" [(ngModel)]="coupon">

        <button (click)="applyCoupon()">
            Apply Coupon
        </button>
    </div>
    <br>

    <!-- Empty Cart -->

    <div *ngIf="cartItems.length === 0">
        <h3>Your Cart is Empty</h3>
    </div>

    <!-- Cart Items -->

    <table *ngIf="cartItems.length > 0" border="1" cellpadding="10" cellspacing="0">
        <thead>
            <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Stock</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>

            <tr *ngFor="let item of cartItems">
                <td>
                    {{item.name}}
                </td>
                <td>
                    ₹{{item.price}}
                </td>
                <td>
                    {{item.quantity}}
                </td>
                <td>
                    ₹{{item.price * item.quantity}}
                </td>
                <td>
                    {{item.stock}}
                    <span *ngIf="item.stock <= 5" style="color:red;font-weight:bold;">
                        (Low Stock)
                    </span>
                </td>

                <td>
                    <button (click)="decrease(item)" [disabled]="item.quantity===1">-</button>
                    <button (click)="increase(item)" [disabled]="item.quantity===item.stock">+</button>
                    <button (click)="remove(item)"> Remove </button>
                </td>
            </tr>
        </tbody>
    </table>

    <br>

    <!-- Bill Summary -->

    <div *ngIf="cartItems.length>0" class="bill-section">

        <h3>Bill Summary</h3>
        <table border="1" cellpadding="8">
            <tr>
                <td>Subtotal</td>
                <td>₹{{subtotal}}</td>
            </tr>
            <tr>
                <td>GST (18%)</td>
                <td>₹{{gst}}</td>
            </tr>
            <tr>
                <td>Discount</td>
                <td>- ₹{{discount}}</td>
            </tr>
            <tr>
                <th>Grand Total</th>
                <th>₹{{grandTotal}}</th>
            </tr>
        </table>
    </div>
</div>`;


childTheory = `
<pre>
===========================================================
1. Template Reference Variable (#)
===========================================================
HTML                      | TypeScript
-----------------------------------------------------------
<input #name>             | export class AppComponent {}
<button                   |
(click)="name.focus()">   |
Focus</button>            |

Used only inside the HTML template. Not used with the @viewchild in ts


===========================================================
2. @ViewChild()
===========================================================
HTML                      | TypeScript
-----------------------------------------------------------
<input #username>         | @ViewChild('username')
                           | username!: ElementRef;
                           |
                           | ngAfterViewInit() {
                           |   this.username
                           |     .nativeElement.focus();
                           | }

Accesses one HTML element or one child component.


===========================================================
3. @ViewChildren()
===========================================================
HTML                      | TypeScript
-----------------------------------------------------------
<input #box>              | @ViewChildren('box')
<input #box>              | boxes!: QueryList<ElementRef>;
<input #box>              |
                           | ngAfterViewInit() {
                           |   this.boxes.forEach(box =>
                           |     console.log(
                           |       box.nativeElement.value
                           |     ));
                           | }

Accesses multiple matching elements.


===========================================================
4. @ContentChild()
===========================================================
Parent HTML               | Child TypeScript
-----------------------------------------------------------
<app-card>                | @ContentChild('title')
  <h2 #title>Angular</h2> | title!: ElementRef;
</app-card>               |
                           | ngAfterContentInit() {
                           |   console.log(
                           |   this.title.nativeElement
                           |   .textContent);
                           | }

Reads one projected element.


===========================================================
5. @ContentChildren()
===========================================================
Parent HTML               | Child TypeScript
-----------------------------------------------------------
<app-list>                | @ContentChildren('item')
  <p #item>Apple</p>      | items!: QueryList<ElementRef>;
  <p #item>Banana</p>     |
  <p #item>Mango</p>      | ngAfterContentInit() {
</app-list>               |   this.items.forEach(item =>
                           |     console.log(
                           |       item.nativeElement
                           |       .textContent
                           |     ));
                           | }

Reads multiple projected elements.`

childArray =[
  {
    index: 'html',
    data: this.childHtml
  },
  {
    index: 'ts',
    data: this.childts
  },
  {
    index:'theory',
    data: this.childTheory
  }
];

setIndex = 'ts'
setDataIndex(data: string){
  this.setIndex = data;
  this.cdr.detectChanges();
}
}


