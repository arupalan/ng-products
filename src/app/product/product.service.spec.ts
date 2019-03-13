import { TestBed, inject, async } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { CoreModule, HttpCacheService } from '@app/core';
import { ProductService, Product } from './product.service';

describe('ProductService', () => {
  let productService: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule, HttpClientTestingModule],
      providers: [HttpCacheService, ProductService]
    });
  }));

  beforeEach(inject(
    [HttpCacheService, ProductService, HttpTestingController],
    (
      htttpCacheService: HttpCacheService,
      _productService: ProductService,
      _httpMock: HttpTestingController
    ) => {
      productService = _productService;
      httpMock = _httpMock;

      htttpCacheService.cleanCache();
    }
  ));

  afterEach(() => {
    httpMock.verify();
  });

  describe('getProduct', () => {
    it('should return a Products', () => {
      // Arrange
      const mockProducts: Product[] = [
        {
          id: 1,
          productName: 'galaxy 1',
          modelCode: 'galaxy 1 model',
          serialNumber: 'serial 1'
        },
        {
          id: 2,
          productName: 'galaxy 2',
          modelCode: 'galaxy 2 model',
          serialNumber: 'serial 2'
        },
        {
          id: 3,
          productName: 'galaxy 3',
          modelCode: 'galaxy 3 model',
          serialNumber: 'serial 3'
        }
      ];

      // Act
      const productSubscription = productService.getProducts();

      // Assert
      productSubscription.subscribe((products: Product[]) => {
        expect(products).toEqual(mockProducts);
      });
      httpMock.expectOne({}).flush(mockProducts);
    });

    // it('should return empty products array in case of error', () => {
    //   // Act
    //   const productSubscription = productService.getProducts();
    //   const productResponse: Product[] = [];
    //   // Assert
    //   productSubscription.subscribe((products: Product[]) => {
    //     expect(typeof products).toEqual('string');
    //     expect(products).toContain(productResponse);
    //   });
    //   httpMock.expectOne({}).flush(null, {
    //     status: 500,
    //     statusText: 'error'
    //   });
    // })
  });
});
