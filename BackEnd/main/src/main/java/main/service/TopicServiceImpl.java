package main.service;

import lombok.RequiredArgsConstructor;
import main.dto.DataDto;
import main.dto.TopicResponse;
import main.helper.PageInfo;
import main.repository.TopicRepo;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
@RequiredArgsConstructor
public class TopicServiceImpl implements TopicService {

    private final TopicRepo topicRepo;
    private final PageInfo pageInfo;

    private static final int PAGE_SIZE = 12;

    @Override
    @Transactional(readOnly = true, timeout = 4)
    public TopicResponse getByTopic(String name, int page) {

        boolean hasNext = pageInfo.hasNext(countGetByTopic(name),
                page, PAGE_SIZE);

        List<DataDto> getByTopic = topicRepo.getByTopic(name,
                PAGE_SIZE, page *  PAGE_SIZE);

        return new TopicResponse(getByTopic, hasNext);
    }

    @Transactional(readOnly = true, timeout = 2)
    private Long countGetByTopic(String name) {
        return topicRepo.countGetByTopic(name);
    }

    @Override
    @Transactional(readOnly = true, timeout = 4)
    public TopicResponse searchByTopic(String name, int page) {

        boolean hasNext = pageInfo.hasNext(countSearchByTopic(name),
                page, PAGE_SIZE);

        List<DataDto> searchByTopic = topicRepo.searchByTopic(name,
                PAGE_SIZE, page *  PAGE_SIZE);

        return new TopicResponse(searchByTopic, hasNext);
    }

    @Transactional(readOnly = true, timeout = 2)
    private Long countSearchByTopic(String name) {
        return topicRepo.countSearchByTopic(name);
    }

    @Override
    @Transactional(readOnly = true, timeout = 4)
    public TopicResponse getNewest(int page) {

        boolean hasNext = pageInfo.hasNext(countNewest(),
                page, PAGE_SIZE);

        List<DataDto> getByTopic = topicRepo.getNewest(
                PAGE_SIZE, page *  PAGE_SIZE);

        return new TopicResponse(getByTopic, hasNext);
    }

    @Transactional(readOnly = true, timeout = 2)
    private Long countNewest() {
        return topicRepo.countNewest();
    }
}
