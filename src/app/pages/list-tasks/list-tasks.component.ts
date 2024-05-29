import { TaskComponent } from './../../dialog/task/task.component';
import { DatePipe } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { TaskService } from 'src/app/service/task.service';
import { UiService } from 'src/app/service/ui.service';
import { ConfirmDialogComponent } from 'src/app/shared/dialog/confirm-dialog/confirm-dialog.component';

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: Date; 
  status: 'completed' | 'not completed'; 
}

@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss'],
})
export class ListTasksComponent implements OnInit, AfterViewInit {
  statusSelected = false;
  allTask;
  buttonDisabled: Boolean = false;
  selectedStatus: 'all' | 'completed' | 'not completed' = 'all'; 
  filteredTasks: Task[] = [];
  displayedColumns = ['actions', 'title', 'description', 'dueDate', 'status']; // Updated displayed columns
  dataSource = new MatTableDataSource<Task>([]);
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private uiService: UiService,
    private router: Router,
    private taskService: TaskService,
  ) {}

  ngOnInit(): void {
    this.taskService.tasks$.subscribe(tasks => {
      this.allTask = tasks;
      this.filterTasks(); 
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  filterTasks() {
    console.log('this.selectedStatus', this.selectedStatus);
    if (this.selectedStatus === 'all') {
      this.filteredTasks = this.allTask;
    } else {
      this.filteredTasks = this.allTask.filter(task => task.status === this.selectedStatus);
    }
    this.dataSource.data = this.filteredTasks;
  }

  onPageChange(event: PageEvent) {
    console.log(event); 
  }

  sortTasks(order: 'asc' | 'desc') {
    this.filteredTasks.sort((a, b) => {
      const dateA = new Date(a.dueDate);
      const dateB = new Date(b.dueDate);
      return order === 'asc' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
    });
    this.dataSource.data = this.filteredTasks;
  }

  public openEditControllerDialog(data?: any) {
    const dialogRef = this.dialog.open(TaskComponent, {
      maxWidth: '600px',
      width: '95%',
      data: data,
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult && dialogResult.data) {
        if (data) {
          this.updateTaskById(data.id, dialogResult.data);
        } else {
          this.addTask(dialogResult.data);
        }
      }
    });
  }

  addTask(data: Task) {
    this.taskService.addTask(data);
    this.uiService.success('Task added successfully');
  }

  updateTaskById(id: string, data: Task) {
    this.taskService.updateTask(id , data);
    this.uiService.success('Task updated successfully');
  }

  deleteTask(id: string) {
    this.taskService.deleteTask(id);
    this.uiService.success('Task deleted successfully');
  }

  public openConfirmDialog(data?: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: {
        title: 'Confirm Delete',
        message: 'Are you sure you want delete this data?',
      },
    });
    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        this.deleteTask(data.id);
      }
    });
  }
}
