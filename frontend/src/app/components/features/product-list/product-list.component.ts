import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ProductAddEditComponent } from './product-add-edit/product-add-edit.component';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../core/services/product.service';
import { AlertService } from '../../../core/services/alert.service';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';

interface Product {
  _id: string;
  name: string;
  price: number;
  discount: number;
  categoryName: string;
  size: string;
  vendorName: string;
}

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatPaginatorModule,
    MatButtonModule
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  displayedColumns: string[] = ['name', 'price', 'discount', 'categoryName', 'size', 'vendorName', 'actions'];
  dataSource = new MatTableDataSource<Product>([]);
  totalDocuments = 0;
  products: Product[] = [];
  page:number=1
  currentPage:number = 1;
  itemPerPage:number =10;
  limit:number =10

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.products);
    this.getProductList()
  };

  constructor(private matDialog: MatDialog,
    private $productService: ProductService,
    private $alertService:AlertService
  ) {

  }

  getProductList() {
    this.$productService.list(this.page,this.limit).subscribe((res) => {
      this.totalDocuments = res.data.totalDocs
      this.dataSource = res.data.docs;
    });
  }

  addProduct() {
    const dialogRef = this.matDialog.open(ProductAddEditComponent, {
      width: '450px'
    });
    dialogRef?.afterClosed()?.subscribe((result) => {
      console.log('The dialog was closed', result);
      if (result) {
        this.getProductList();
      }
    });
  }

  editProduct(product: Product): void {
    // Edit product logic here
    const dialogRef = this.matDialog.open(ProductAddEditComponent, {
      data: product,
      width:'450px'
    });
    dialogRef?.afterClosed()?.subscribe((result) => {
      console.log('The dialog was closed', result);
      if (result) {
        this.getProductList();
      }
    });
  }

  deleteProduct(product: Product): void {
    const dialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: '250px',
      disableClose: true,
      data: { message: 'Are you sure?' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
      if (result) {
        this.$productService.deleteProduct(product._id).subscribe(
          (res) => {
            if (res.status == 200) {
              this.$alertService.success('Deleted successfully');
              this.getProductList()
            }
          },
          (err) => {
          }
        );
      } else {
      }
    });
  };

 
  getPage(event: PageEvent) {
    this.page = event.pageIndex + 1;
    this.currentPage = event.pageIndex + 1;
    this.itemPerPage = event.pageSize;
    this.limit = event.pageSize;
    this.getProductList();
  }
}
