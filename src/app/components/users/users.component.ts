import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/users.service';
import { UserModel } from '../../models';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public displayedColumns: string[] = ['select', 'ID', 'E-mail', 'User Name', 'Group'];
  public dataSource: MatTableDataSource<UserModel>;
  public selection = new SelectionModel<UserModel>(true, []);

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private userService: UserService
  ) { }

  deleteSelected() {
    this.selection.selected.forEach(el => {
      this.userService.delete(`${el.id.toString()}`).subscribe(
        data => {
          if (data.success) {
            this.userService.get('get-all').subscribe((data) => {
              this.dataSource = new MatTableDataSource<UserModel>(data);
              this.dataSource.sort = this.sort;
              this.selection.clear()
            });
          }
        }
      )
    })
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    if (this.dataSource) {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    }
    return false

  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: UserModel): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.userService.get('get-all').subscribe((data) => {
      this.dataSource = new MatTableDataSource<UserModel>(data);
      this.dataSource.sort = this.sort;
    });
  }
}
