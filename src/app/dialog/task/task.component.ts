import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  // Data Form
  @ViewChild('formElement') formElement: NgForm;
  dataForm?: FormGroup;
  // Store Data+
  divisionData: any;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    // Init Data Form
    this.initDataForm();
    if (this.data) {
      this.divisionData = this.data;
      this.setFormValue();
    }
  }

  /**
   * INIT FORM & Submit
   * initDataForm()
   * setFormValue()
   * onSubmit()
   */
  private initDataForm() {
    this.dataForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: [null, Validators.required], 
      status: ['not completed', Validators.required]
    });
  }

  private setFormValue() {
    this.dataForm.patchValue({
      ...this.divisionData,
    });
  }

  onSubmit() {
    if (this.dataForm.invalid) {
      return;
    }
    this.dialogRef.close({
      data: this.dataForm.value,
    });
    console.log('user data from frontend', this.dataForm.value);
  }

  resetEditForm() {
    this.divisionData = this.data;
    this.setFormValue();
  }

  resetAddForm() {
    this.dataForm.reset();
  }

  /**
   * ON CLOSE DIALOG
   */
  onClose() {
    this.dialogRef.close();
  }
}
