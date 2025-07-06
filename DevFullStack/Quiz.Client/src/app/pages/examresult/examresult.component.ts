import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ExamDetail, Answer } from '../../interfaces/IExamdetail';

@Component({
  selector: 'app-examresult',
  templateUrl: './examresult.component.html',
  styleUrls: ['./examresult.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class ExamresultComponent implements OnInit {
  score: number = 0;
  correctCount: number = 0;
  total: number = 0;
  timeUsed: number = 0;
  topicId: string | null = null;
  examDetails: ExamDetail[] = [];

  constructor(private router: Router, private route: ActivatedRoute) {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras.state as any;
    if (state) {
      this.score = state.score;
      this.correctCount = state.correctCount;
      this.total = state.total;
      this.timeUsed = state.timeUsed;
      this.topicId = state.topicId;
      this.examDetails = state.examDetails || [];
    }
  }

  ngOnInit() {
  }

  isCorrect(question: ExamDetail): boolean {
    if (question.questionType === 1) {
      const correctAns = question.answers.filter(a => a.isCorrect).map(a => a.id).sort();
      const userAns = Array.isArray(question.userSelectedAnswer) ? [...question.userSelectedAnswer].sort() : [];
      return JSON.stringify(correctAns) === JSON.stringify(userAns);
    } else if (question.questionType === 3) {
      const correctOrder = question.answers.map(a => a.id);
      const userOrder = Array.isArray(question.userSelectedAnswer) ? question.userSelectedAnswer : [];
      return JSON.stringify(correctOrder) === JSON.stringify(userOrder);
    } else {
      const correctAns = question.answers.find(a => a.isCorrect)?.id;
      return question.userSelectedAnswer === correctAns;
    }
  }

  getUserAnswerContent(question: ExamDetail): string[] {
    if (question.userSelectedAnswer === null || question.userSelectedAnswer === undefined) return ["Bạn chưa trả lời"];
    
    const selectedIds = Array.isArray(question.userSelectedAnswer) ? question.userSelectedAnswer : [question.userSelectedAnswer];
    const answers = selectedIds.map(id => question.answers.find(a => a.id === id)?.content || '').filter(content => content);
    
    if (question.questionType === 3) {
      return answers.map((ans, index) => `${index + 1}. ${ans}`);
    }
    
    return answers.length > 0 ? answers : ["Bạn chưa trả lời"];
  }

  getCorrectAnswerContent(question: ExamDetail): string[] {
    let correctAnswers: Answer[] = [];
    if (question.questionType === 3) {
       correctAnswers = [...question.answers];
    } else {
       correctAnswers = question.answers.filter(a => a.isCorrect);
    }

    if (question.questionType === 3) {
      return correctAnswers.map((ans, index) => `${index + 1}. ${ans.content}`);
    }

    return correctAnswers.map(a => a.content);
  }

}
