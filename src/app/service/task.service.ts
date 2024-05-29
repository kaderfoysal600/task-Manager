import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UiService } from './ui.service'; // Assuming you have a UI service for error messages

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: Date; 
  status: 'completed' | 'not completed'; 
}

@Injectable({ providedIn: 'root' })
export class TaskService {
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  public tasks$: Observable<Task[]> = this.tasksSubject.asObservable();

  constructor(private uiService: UiService) { // Inject UiService for error handling
    this.loadTasksFromLocalStorage();
  }

  private loadTasksFromLocalStorage() {
    const storedTasks = localStorage.getItem('tasks');
    console.log('storedTasks', storedTasks);
    
    if (storedTasks) {
      this.tasksSubject.next(JSON.parse(storedTasks));
    }
  }

  private saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(this.tasksSubject.value));
  }

  addTask(task: Omit<Task, 'id'>) { // Don't expect id from input
    const newTask: Task = { id: Date.now().toString(), ...task }; 
    const updatedTasks = [...this.tasksSubject.value, newTask];
    this.tasksSubject.next(updatedTasks);
    this.saveTasksToLocalStorage();
  }

  updateTask(id:any , task: Task) {
    console.log('task', task);
    
    
    const updatedTask = this.tasksSubject.value.map(d => 
      d.id === id ? task : d
    );
    this.tasksSubject.next(updatedTask);
    this.saveTasksToLocalStorage();
  }

  deleteTask(id: string) {
    const updatedTasks = this.tasksSubject.value.filter(d => d.id !== id);
    this.tasksSubject.next(updatedTasks);
    this.saveTasksToLocalStorage();
  }
}
