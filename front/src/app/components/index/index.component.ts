import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from 'src/app/interfaces/Student';
import { UserService } from 'src/app/services/user.service';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent {
  students!: Student[];
  studentBySchool!: Student[];
  school!: string;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private socketService: SocketService
  ) {
    this.listGlobalRanking();

    this.socketService.conect();

    this.socketService.onEvent('connect').subscribe((socket) => {
      console.log('Conectado ao socket');
      this.socketService.onEvent('newGrades').subscribe((data) => {
        console.log('recebido evento');
        console.log(data);
        this.listGlobalRanking();
      });
    });
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
