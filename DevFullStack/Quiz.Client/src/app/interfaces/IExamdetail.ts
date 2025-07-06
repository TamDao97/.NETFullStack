export interface ExamAnswer {
  idQuestion: string;
  name: string;
  content: string;
  isTrue: boolean;
  id: number;
}

export interface ExamDetail {
  id: number;
  questionName: string;
  questionLevelText: string;
  questionType: number;
  answers: Answer[];
  userSelectedAnswer: number | number[] | null;
  correctOrder?: number[]; // For ordering questions
}

export interface Answer {
  id: number;
  content: string;
  isCorrect?: boolean; // For true/false questions
  order?: number; // For ordering questions
}
