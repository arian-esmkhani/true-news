package main.dto;

import java.util.List;

//For using in Article section in front
public record ArticleResponse(
        TopicDto topicDto,
        List<ArticleDto> articleDto
) {
}
