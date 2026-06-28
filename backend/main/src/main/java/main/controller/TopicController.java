package main.controller;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Pattern;
import lombok.RequiredArgsConstructor;
import main.dto.TopicResponse;
import main.service.TopicService;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Validated
@RestController
@RequestMapping("/api/topic")
@RequiredArgsConstructor
public class TopicController {

    private final TopicService topicService;

    private static final String SAFE_STRING_PATTERN = "^[a-zA-Z0-9\\s\\-_.]*$|^$";
    private static final int MAX_PAGE_NUMBER = 1000;

    @GetMapping("/by-topic/{name}")
    public ResponseEntity<TopicResponse> getByTopic(
            @RequestParam(defaultValue = "0") @Min(0) @Max(MAX_PAGE_NUMBER) Integer page,
            @PathVariable @Pattern(regexp = SAFE_STRING_PATTERN) String name) {

        TopicResponse topic = topicService.getByTopic(name, page);
        if (topic == null) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(topic);
        }
    }

    @GetMapping("/search-topic/{name}")
    public ResponseEntity<TopicResponse> searchByTopic(
            @RequestParam(defaultValue = "0") @Min(0) @Max(MAX_PAGE_NUMBER) Integer page,
            @PathVariable @Pattern(regexp = SAFE_STRING_PATTERN) String name) {

        TopicResponse topic = topicService.searchByTopic(name, page);
        if (topic == null) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(topic);
        }
    }

    @GetMapping("/newest")
    public ResponseEntity<TopicResponse> getNewest(
            @RequestParam(defaultValue = "0") @Min(0) @Max(MAX_PAGE_NUMBER) Integer page) {

        TopicResponse topic = topicService.getNewest(page);
        if (topic == null) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(topic);
        }
    }
}
