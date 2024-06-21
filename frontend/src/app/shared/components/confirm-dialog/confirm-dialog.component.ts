import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NavComponent } from '../../../layout/nav/nav.component';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss'
})
export class ConfirmDialogComponent implements OnInit { 
  constructor(public dialogRef: MatDialogRef<NavComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  close(state:boolean) {
    this.dialogRef.close(state);    
  }
  ngOnInit(){
    console.log(this.data);
  }
}
