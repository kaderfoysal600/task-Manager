import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListTasksComponent } from './list-tasks.component';
import { ListTasksRoutingModule } from './list-tasks-routing.module';
import { TaskModule } from 'src/app/dialog/task/task.module';
import { ConfirmDialogModule } from 'src/app/shared/dialog/confirm-dialog/confirm-dialog.module';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  declarations: [ListTasksComponent],
  imports: [
    CommonModule,
    ListTasksRoutingModule,
    TaskModule,
    ConfirmDialogModule,
    MaterialModule,
  ],
})
export class ListTasksModule {}
