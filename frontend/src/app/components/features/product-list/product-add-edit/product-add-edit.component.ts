import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../../core/services/product.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductListComponent } from '../product-list.component';
import { AlertService } from '../../../../core/services/alert.service';

interface Product {
  id: number;
  name: string;
  price: number;
  discount: number;
  category: string;
  size: string;
  vendor: string;
}

@Component({
  selector: 'app-product-add-edit',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule
  ],
  templateUrl: './product-add-edit.component.html',
  styleUrl: './product-add-edit.component.scss'
})
export class ProductAddEditComponent implements OnInit {
  productForm: FormGroup;
  categories: any = [];
  vendors: any = [];
  isEditMode = false;
  productId: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private $productService: ProductService,
    public dialogRef: MatDialogRef<ProductListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private $alertService: AlertService
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      discount: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      categoryId: ['', Validators.required],
      size: ['', Validators.required],
      vendorId: ['', Validators.required],
    });
  }



  ngOnInit(): void {
    this.getCategory();
    this.getVendor();
    if (this.data._id) {
      this.isEditMode = true;
      this.productId = this.data._id;
      setTimeout(() => {
        this.patchValue();
      }, 1000);
    }

  };

  patchValue() {
    this.productForm.patchValue({
      name: this.data.name,
      price: this.data.price,
      discount: this.data.discount,
      size: this.data.size,
      categoryId: this.data.categoryId,
      vendorId: this.data.vendorId,
    })
  }

  getCategory() {
    this.$productService.categorylist().subscribe((res) => {
      this.categories = res.data;
    })
  }

  getVendor() {
    this.$productService.vendorList().subscribe((res) => {
      this.vendors = res.data;
    })
  }


  onSubmit(): void {
    if (this.productForm.valid) {
      const productData = this.productForm.value;
      if (this.isEditMode) {
        // Update the existing product
        this.$productService.updateProduct(this.productId, productData).subscribe((res) => {
          if (res.status == 200) {
            this.$alertService.success("Product updated successfully");
            this.dialogRef.close(true);
          }
        });
      } else {
        // Create a new product
        this.$productService.addProduct(productData).subscribe((res) => {
          if (res.status == 200) {
            this.$alertService.success("Product added successfully");
            this.dialogRef.close(true);
          }
        })
      }
      this.router.navigate(['/products']);
    }
  };

  close() {
    this.dialogRef.close();
  }
}
