export interface Questions {
    title: string;
    answer1: string;
    answer2: string;
    answer3: string;
    answer4: string;
}

export interface TestModel {
    id?: number;
    isCurrentlyDoing?: boolean;
    title: string;
    questions?: Array<Questions>;
    duration: number
}