import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

const routes = {
  products: () => `/products`
};
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
export class Product {
  id: number;
  productName: string;
  modelCode: string;
  serialNumber: string;
}

@Injectable()
export class ProductService {
  constructor(private httpClient: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(routes.products()).pipe(
      tap(_ => console.log('fetched products', _)),
      catchError(this.handleError('getProducts', []))
    );
  }
  private log(message: string) {
    console.log(`ProductService: ${message}`);
  }
  // tslint:disable-next-line:typedef
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
