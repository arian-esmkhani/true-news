package main.service;

import lombok.RequiredArgsConstructor;
import main.dto.ArticleResponse;
import main.repository.ArticleRepo;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ArticleServiceImpl implements ArticleService{

    private final ArticleRepo articleRepo;

    @Override
    @Transactional(readOnly = true, timeout = 3)
    public ArticleResponse getArticle(long topicID) {
        return articleRepo.getArticle(topicID);
    }
}
