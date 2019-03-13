import { Component, OnInit, Input } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { ProductService, Product } from './product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products: Product[];
  isLoading: boolean;
  @Input() cols: number;
  @Input() gutterSize: string;

  constructor(private quoteService: ProductService) {}

  ngOnInit() {
    this.isLoading = true;
    this.quoteService
      .getProducts()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((products: Product[]) => {
        this.products = products;
      });
  }
}
