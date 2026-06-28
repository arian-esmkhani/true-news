package main.service;

import main.dto.TopicResponse;

public interface TopicService {
    //This method is for getting with category
    TopicResponse getByTopic(String name, int page);
    //This method is for searching with title or category
    TopicResponse searchByTopic(String name, int page);
    //For Newest page with show the newest topic
    TopicResponse getNewest(int page);
}
