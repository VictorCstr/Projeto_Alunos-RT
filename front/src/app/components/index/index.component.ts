import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from 'src/app/interfaces/Student';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent {
  students!: Student[];
  studentBySchool!: Student[];
  school!: string;

  constructor(private route: ActivatedRoute, private userService: UserService) {
    this.listGlobalRanking();
  }

  listGlobalRanking(): void {
    this.userService.getGlobalRaking().subscribe(
      (users) => {
        this.students = users;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  changeSchool(school: string) {
    this.school = school;
    this.listRankingBySchool();
  }

  listRankingBySchool(): void {
    this.userService.getRankingBySchool(this.school as string).subscribe(
      (users) => {
        this.studentBySchool = users;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
