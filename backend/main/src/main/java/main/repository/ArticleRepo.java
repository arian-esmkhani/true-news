package main.repository;

import main.dto.ArticleResponse;

//For Finding Article
public interface ArticleRepo {
    ArticleResponse getArticle(long topicID);
}
