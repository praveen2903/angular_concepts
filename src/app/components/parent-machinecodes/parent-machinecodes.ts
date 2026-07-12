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
