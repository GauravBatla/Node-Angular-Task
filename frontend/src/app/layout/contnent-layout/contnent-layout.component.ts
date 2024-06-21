import { Component, EventEmitter, Output } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { NavComponent } from '../nav/nav.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-contnent-layout',
  standalone: true,
  imports: [HeaderComponent, NavComponent, CommonModule,RouterModule,NgxPaginationModule],
  templateUrl: './contnent-layout.component.html',
  styleUrl: './contnent-layout.component.scss',
  
})
export class ContnentLayoutComponent {
  isHalfShown: boolean = false;
  toggle: boolean = false;

  @Output() dataEvent = new EventEmitter<boolean>();

  ngOnInit() {

  }

  receiveData(data: boolean): void {
      this.isHalfShown = data
      this.toggle = this.isHalfShown
  }

  getValue() {
      this.dataEvent.emit(this.isHalfShown)
  }
}
