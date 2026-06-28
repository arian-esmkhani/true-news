import { TopicDto } from "./topic-type";

export interface ArticleDto{
    head: string;
    body: string;
    imgUrl: string;
    sec: number;
}

export interface ArticleResponse{
    topicDto: TopicDto;
    articleDto: ArticleDto[];
}
