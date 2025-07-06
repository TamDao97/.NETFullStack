import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExamdetailService } from '../../services/examdetail.service';
import { ExamDetail } from '../../interfaces/IExamdetail';

@Component({
  selector: 'app-examdetail',
  templateUrl: './examdetail.component.html',
  styleUrls: ['./examdetail.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class ExamdetailComponent implements OnInit, OnDestroy {
  examDetails: ExamDetail[] = [];
  currentQuestionIndex = 0;
  doubtfulQuestions = new Set<number>();
  totalTime: number = 30 * 60; // seconds
  timerInterval: any;
  minutes: string = '30';
  seconds: string = '00';
  isSubmitted: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private examService: ExamdetailService
  ) {}

  ngOnInit(): void {
    const topicId = this.route.snapshot.paramMap.get('id');
    console.log('Topic ID:', topicId);

    if (topicId) {
      console.log('Calling API to get exam details...');
      this.examService.getExamDetailByIdTopic(topicId).subscribe({
        next: (response) => {
          if (response && response.data) {
            try {
              const examData = Array.isArray(response.data)
                ? response.data
                : [response.data];

              this.examDetails = examData.map((q: any) => {
                const answers = Array.isArray(q.answers) ? q.answers : [];
                const mappedAnswers = answers.map((ans: any) => ({
                  id: ans.id || 0,
                  content: ans.content || '',
                  isCorrect: ans.isCorrect || false,
                  order: ans.order || 0,
                }));

                return {
                  id: q.id || 0,
                  questionName: q.questionName || '',
                  questionLevelText: q.questionLevelText || '',
                  questionType: q.questionType || 'SINGLE_CHOICE',
                  answers: mappedAnswers,
                  userSelectedAnswer:
                    q.questionType === 'MULTIPLE_CHOICE' ? [] : null,
                };
              });
            } catch (error) {
              console.error('Error mapping exam data:', error);
            }
          } else {
            console.error('No data in response:', response);
          }
        },
        error: (error) => {
          console.error('Error fetching exam details:', error);
        },
      });
    } else {
      console.warn('No topic ID found. Using mock data for testing.');

      // ✅ Mock data dùng để test
      this.examDetails = [
        {
          id: 1,
          questionName: 'Câu 1: Thủ đô của Việt Nam là gì?',
          questionLevelText: 'Dễ',
          questionType: 0,
          answers: [
            { id: 1, content: 'Hà Nội', isCorrect: true, order: 1 },
            { id: 2, content: 'TP. Hồ Chí Minh', isCorrect: false, order: 2 },
            { id: 3, content: 'Đà Nẵng', isCorrect: false, order: 3 },
          ],
          userSelectedAnswer: null
        },
        {
          id: 2,
          questionName: 'Câu 2: Chọn các quốc gia thuộc châu Á',
          questionLevelText: 'Trung bình',
          questionType: 1,
          answers: [
            { id: 4, content: 'Việt Nam', isCorrect: true, order: 1 },
            { id: 5, content: 'Trung Quốc', isCorrect: true, order: 2 },
            { id: 6, content: 'Pháp', isCorrect: false, order: 3 },
          ],
          userSelectedAnswer: []
        },
        {
          id: 3,
          questionName: 'Câu 3: Trái đất là hình tròn?',
          questionLevelText: 'Dễ',
          questionType: 2,
          answers: [
            { id: 7, content: 'Đúng', isCorrect: true, order: 1 },
            { id: 8, content: 'Sai', isCorrect: false, order: 2 },
          ],
          userSelectedAnswer: null
        },
        {
          id: 4,
          questionName: 'Câu 4: Sắp xếp các bước nấu cơm',
          questionLevelText: 'Khó',
          questionType: 3,
          answers: [
            { id: 9, content: 'Vo gạo', isCorrect: true, order: 1 },
            { id: 10, content: 'Cho vào nồi', isCorrect: true, order: 2 },
            { id: 11, content: 'Bật nút nấu', isCorrect: true, order: 3 },
          ],
          userSelectedAnswer: []
        }
      ];
    }

    this.startTimer();
  }

  ngOnDestroy(): void {
    clearInterval(this.timerInterval);
  }

  getInputType(type: number): string {
    switch (type) {
      case 0:
      case 2:
        return 'radio';
      case 1:
        return 'checkbox';
      default:
        return 'radio';
    }
  }

  getAnswerLetter(index: number): string {
    return String.fromCharCode(65 + index); // 65 = 'A'
  }

  getQuestionTypeText(type: string): string {
    const types = {
      SINGLE_CHOICE: 'Chọn 1 đáp án',
      MULTIPLE_CHOICE: 'Chọn nhiều đáp án',
      TRUE_FALSE: 'Đúng/Sai',
      ORDERING: 'Sắp xếp',
    };
    return types[type as keyof typeof types] || type;
  }

  onSelectAnswer(question: ExamDetail, answerId: number): void {
    switch (question.questionType) {
      case 0:
      case 2:
        question.userSelectedAnswer = answerId;
        break;

      case 1:
        if (!Array.isArray(question.userSelectedAnswer)) {
          question.userSelectedAnswer = [];
        }

        const idx = question.userSelectedAnswer.indexOf(answerId);
        if (idx === -1) {
          question.userSelectedAnswer.push(answerId);
        } else {
          question.userSelectedAnswer.splice(idx, 1);
        }
        break;
    }

    this.saveAnswer(question);
  }

  moveAnswerUp(question: ExamDetail, index: number): void {
    if (index > 0) {
      const temp = question.answers[index];
      question.answers[index] = question.answers[index - 1];
      question.answers[index - 1] = temp;
      question.userSelectedAnswer = question.answers.map((a) => a.id);
    }
  }

  moveAnswerDown(question: ExamDetail, index: number): void {
    if (index < question.answers.length - 2) {
      const temp = question.answers[index];
      question.answers[index] = question.answers[index + 2];
      question.answers[index + 2] = temp;
      question.userSelectedAnswer = question.answers.map((a) => a.id);
    }
  }

  isAnswerSelected(question: ExamDetail, answerId: number): boolean {
    if (question.questionType === 1) {
      return (
        Array.isArray(question.userSelectedAnswer) &&
        question.userSelectedAnswer.includes(answerId)
      );
    } else {
      return question.userSelectedAnswer === answerId;
    }
  }

  toggleDoubt(index: number): void {
    if (this.doubtfulQuestions.has(index)) {
      this.doubtfulQuestions.delete(index);
    } else {
      this.doubtfulQuestions.add(index);
    }
  }

  isDoubtful(index: number): boolean {
    return this.doubtfulQuestions.has(index);
  }

  isQuestionAnswered(question: ExamDetail): boolean {
    if (question.questionType === 1) {
      return (
        Array.isArray(question.userSelectedAnswer) &&
        question.userSelectedAnswer.length > 0
      );
    } else if (question.questionType === 3) {
      return (
        Array.isArray(question.userSelectedAnswer) &&
        question.userSelectedAnswer.length === question.answers.length
      );
    } else {
      return question.userSelectedAnswer !== null;
    }
  }

  getAnsweredCount(): number {
    return this.examDetails.filter((q) => this.isQuestionAnswered(q)).length;
  }

  scrollToQuestion(index: number): void {
    this.currentQuestionIndex = index;
    const element = document.getElementById(`question-${index}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  startTimer(): void {
    this.timerInterval = setInterval(() => {
      if (this.totalTime > 0) {
        this.totalTime--;
        this.updateTimeDisplay();
      } else {
        clearInterval(this.timerInterval);
        this.submitExam();
      }
    }, 1000);
  }

  updateTimeDisplay(): void {
    const mins = Math.floor(this.totalTime / 60);
    const secs = this.totalTime % 60;
    this.minutes = mins < 10 ? '0' + mins : '' + mins;
    this.seconds = secs < 10 ? '0' + secs : '' + secs;
  }

  submitExam(): void {
    if (this.isSubmitted) return;

    this.isSubmitted = true;
    clearInterval(this.timerInterval);
    console.log('Submitting exam with answers:', this.examDetails);
  }

  private saveAnswer(question: ExamDetail): void {
    console.log(
      'Saving answer for question:',
      question.id,
      'Answer:',
      question.userSelectedAnswer
    );
  }
}
