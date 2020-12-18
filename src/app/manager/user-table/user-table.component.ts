import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, SortDirection } from '@angular/material/sort';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject, merge, of } from 'rxjs';
import { catchError, debounceTime, map, startWith, switchMap } from 'rxjs/operators';
import { OptionalTextValidation } from 'src/app/common/validations';
import { IUser } from 'src/app/user/user/user';
import { UserEntityService } from 'src/app/user/user/user-entity.service';
import { IUsers, UserService } from 'src/app/user/user/user.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css'],
})
export class UserTableComponent implements OnDestroy, AfterViewInit {
  displayedColumns = ['name', 'email', 'role', '_id'];
  items$: Observable<IUser[]> | undefined;
  resultsLength = 0;
  hasError = false;
  errorText = '';
  private skipLoading = false;
  private subs: SubSink = new SubSink();
  readonly isLoadingResults$ = new BehaviorSubject(true);
  loading$: Observable<boolean> | undefined;
  refresh$ = new Subject();
  useNgRxData = true;

  search = new FormControl('', OptionalTextValidation);

  @ViewChild(MatPaginator, { static: false })
  paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false })
  sort!: MatSort;

  constructor(
    private userService: UserService,
    private userEntityService: UserEntityService,
    private router: Router
  ) {
    this.loading$ = merge(this.userEntityService.loading$, this.isLoadingResults$);
  }

  // Click on OPEN SETTING FROM home.component
  changeRoute(row: IUser): void {
    this.router
      .navigate(['/manager/users', { outlets: { detail: ['detail'] } }], {
        skipLocationChange: true,
      })
      .then(() =>
        this.router.navigate(
          ['/manager/users', { outlets: { detail: ['user', { userId: row._id }] } }],
          { skipLocationChange: true }
        )
      );
  }

  getUsers(
    pageSize: number,
    searchText: string,
    pagesToSkip: number,
    sortColumn: string,
    sortDirection: SortDirection
  ): Observable<IUsers> {
    if (this.useNgRxData) {
      return this.userEntityService.getAll().pipe(
        map((value) => {
          return { total: value.length, data: value };
        })
      );
    } else {
      return this.userService.getUsers(
        pageSize,
        searchText,
        pagesToSkip,
        sortColumn,
        sortDirection
      );
    }
  }

  ngAfterViewInit(): void {
    this.subs.sink = this.sort.sortChange.subscribe(() => this.paginator.firstPage());
    if (this.skipLoading) {
      return;
    }

    this.items$ = merge(
      this.refresh$,
      this.sort.sortChange,
      this.paginator.page,
      this.search.valueChanges.pipe(debounceTime(1000))
    ).pipe(
      startWith({}),
      switchMap(() => {
        this.isLoadingResults$.next(true);
        return this.getUsers(
          this.paginator.pageSize,
          this.search.value,
          this.paginator.pageIndex,
          this.sort.active,
          this.sort.direction
        );
      }),
      map((results: { total: number; data: IUser[] }) => {
        this.isLoadingResults$.next(false);
        this.hasError = false;
        this.resultsLength = results.total;
        return results.data;
      }),
      catchError((err) => {
        this.isLoadingResults$.next(false);
        this.hasError = true;
        this.errorText = err;
        return of([]);
      })
    );
    this.items$.subscribe();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
