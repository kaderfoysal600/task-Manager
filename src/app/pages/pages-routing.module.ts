import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,

    children: [
      {
        path: '',
        redirectTo: 'list-tasks',
        pathMatch: 'full',
      },
      {
        path: 'list-tasks',
        loadChildren: () =>
          import('./list-tasks/list-tasks.module').then(
            (m) => m.ListTasksModule
          ),
      },
      
     
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
