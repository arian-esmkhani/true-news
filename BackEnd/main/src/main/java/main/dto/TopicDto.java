package main.dto;

//Topic structure
public record TopicDto(
        String title,
        String description,
        String imgUrl,
        String firstCategory,
        String secondCategory
) {
}
