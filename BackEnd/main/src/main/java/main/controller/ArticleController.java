package main.controller;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;
import main.dto.ArticleResponse;
import main.service.ArticleService;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Validated
@RestController
@RequestMapping("/api/article")
@RequiredArgsConstructor
public class ArticleController {

    private final ArticleService articleService;

    private static final long MAX_ID = 1000000;

    @GetMapping("/get/{topicID}")
    public ResponseEntity<ArticleResponse> getArticle(
            @PathVariable @Positive @Max(MAX_ID) long topicID) {

        ArticleResponse articleResponse = articleService.getArticle(topicID);

        if (articleResponse == null) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(articleResponse);
        }
    }
}
