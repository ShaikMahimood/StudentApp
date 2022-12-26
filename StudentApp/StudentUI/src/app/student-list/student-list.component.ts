import { Component, OnInit } from '@angular/core';
import { StudentApiService } from '../shared/student-api.service';
import { Student } from '../models/student';
import { map } from 'rxjs';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  studentData!: Student[];

  constructor(private studentApi: StudentApiService, private confirmationDialogService: ConfirmationDialogService) { }

  ngOnInit(): void {
    this.getAll();
  }  
  
  getAll(){
    this.studentApi.getAllStudent().subscribe((res: any) => {
      this.studentData = res;
      console.log(this.studentData);
    });
  }

  getStudent(params: any) {
    console.log(params);
    this.studentApi.getStudent(params).subscribe((res: any) => {
      this.studentData = res;
      console.log(this.studentData);
    });
  }

  updateStudent(id: number){
    
  }

  removeStudent(id: number){
    this.studentApi.deleteStudent(id)
        .subscribe(
          data => {
            console.log(data);
            this.getAll();
          },
          error => console.log(error));
    }
    //this.studentApi.deleteStudent(id);

  openConfirmationDialog(id: number) {
    this.confirmationDialogService.confirm('Please confirm..', `Do you really want to RollNo: ${id}`)
    .then((confirmed) => {
      console.log('User confirmed:', confirmed);
      if(confirmed)
        this.removeStudent(id);
  })
    .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }
}
