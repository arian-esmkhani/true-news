package main.repository;

import main.dto.DataDto;

import java.util.List;

//Is for Finding topics
public interface TopicRepo {
    //This method is for getting with category
    List<DataDto> getByTopic(String name, int limit, int offset);
    Long countGetByTopic(String name);
    //This method is for searching with title or category
    List<DataDto> searchByTopic(String name, int limit, int offset);
    Long countSearchByTopic(String name);
    //For Newest page with show the newest topic
    List<DataDto> getNewest(int limit, int offset);
    Long countNewest();
}
