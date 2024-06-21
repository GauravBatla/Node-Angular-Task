import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from '../../core/services/alert.service';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [NgbAccordionModule, CommonModule, RouterModule,],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  isHalfShown = false;
  @Input() toggle = false
  constructor(public dialog: MatDialog,
    private route: Router,
    private alertService: AlertService
  ) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { width: '250px', disableClose: true });

    dialogRef?.afterClosed()?.subscribe((result) => {
      console.log('The dialog was closed', result);
      if (result) {
        sessionStorage.clear();
        localStorage.setItem('isLoggedIn', 'false');
        localStorage.clear();
        localStorage.removeItem('token');
        this.route.navigate(['/login']);
        this.alertService.success('Logout successfully')
      }
    });
  }
}
