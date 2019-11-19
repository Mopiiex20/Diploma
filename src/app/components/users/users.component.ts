import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/users.service';
import { UserModel } from '../../models';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public displayedColumns: string[] = ['ID', 'E-mail', 'User Name', 'Group'];
  public dataSource: MatTableDataSource<UserModel>;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private userService: UserService
  ) {
 
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.userService.get('get-all').subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;

    });

  }

}
