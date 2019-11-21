export interface Questions {
    title: string;
    answers: string[]
}

export interface TestModel {
    id?: number;
    isCurrentlyDoing?: boolean;
    title: string;
    questions?: Array<Questions>;
    duration: number
}

export interface AnswersWithTest {
    answers: object;
    test: TestModel
}