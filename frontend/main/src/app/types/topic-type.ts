import { DataDto } from "./data-type";

export interface TopicDto{
    title: string;
    description: string;
    imgUrl: string;
    firstCategory: number;
    secondCategory: number;
}

export interface TopicResponse{
    dataDto: DataDto[];
    hasNext: boolean;
}