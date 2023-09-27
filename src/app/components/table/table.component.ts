import {Component, OnInit} from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { EditDialogComponent, DialogData } from '../edit/edit-dialog.component';
import jwtDecode from 'jwt-decode';

export interface PeriodicElement {
  model: string;
  position: number;
  amount: number;
  change: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, model: 'Citroën C3', amount: 2.268, change: '-27%'},
  {position: 2, model: 'Peugeot 208', amount: 2.107, change: '-24%'},
  {position: 3, model: 'Kia Ceed/Xceed', amount: 1.750, change: '-1%'},
  {position: 4, model: 'Ford Kuga', amount: 1.619, change: '-53%'},
  {position: 5, model: 'Toyota Yaris', amount: 1.515, change: '-45%'},
  {position: 6, model: 'VW T-Roc', amount: 1.435, change: '-7%'},
  {position: 7, model: 'Mercedes-Benz C-class', amount: 1.361, change: '-9%'},
  {position: 8, model: 'Hyundai i10', amount: 1.300, change: '-26%'},
  {position: 9, model: 'Nissan Qashqai', amount: 1.246, change: '-42%'},
  {position: 10, model: 'Toyota Yaris Cross', amount: 1.114, change: '100%'},
];

@Component({
  selector: 'table-column-styling-example',
  styleUrls: ['./table.component.css'],
  templateUrl: './table.component.html',
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['demo-position', 'demo-model', 'demo-amount', 'demo-change'];
  dataSource = ELEMENT_DATA;
  isEditor: boolean = false;

  constructor(public dialog: MatDialog) {
    // Check the user's role and set isEditor accordingly
    const token = localStorage.getItem('token');
    console.log(token); // Check if the token is retrieved correctly    
    if (token) {
      const decodedToken: any = jwtDecode(token);
      const userRole = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      console.log(decodedToken); // Log the decoded token to check the role
      this.isEditor = userRole === 'Editor1' || userRole === 'Editor2';
      console.log('isEditor:', this.isEditor); // Log the value of isEditor
    }    
  }

  ngOnInit(): void {
    if (this.isEditor) {
      this.displayedColumns.push('edit');
    }
  }

  editElement(element: PeriodicElement): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '250px',
      data: {model: element.model, amount: element.amount, change: element.change}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result) {
        element.model = result.model;
        element.amount = result.amount;
        element.change = result.change;
      }
    });
  }
}