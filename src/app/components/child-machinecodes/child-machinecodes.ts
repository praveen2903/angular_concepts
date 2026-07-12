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
