package main.service;

import main.dto.ArticleResponse;

public interface ArticleService {
    //For Finding Article
    ArticleResponse getArticle(long topicID);
}
