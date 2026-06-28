package main.service;

import lombok.RequiredArgsConstructor;
import main.dto.TitleDto;
import main.repository.TitleRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TitleServiceImpl implements TitleService{

    private final TitleRepo titleRepo;

    @Override
    @Cacheable(value = "static", key = "'newestTitles'")
    @Transactional(readOnly = true, timeout = 3)
    public List<TitleDto> newestTitles() {
        return titleRepo.newestTitles();
    }

    @Override
    @Cacheable(value = "static", key = "'goldTitles'")
    @Transactional(readOnly = true, timeout = 3)
    public List<TitleDto> goldTitles() {
        return titleRepo.goldTitles();
    }

    @Override
    @Cacheable(value = "static", key = "'aiTitles'")
    @Transactional(readOnly = true, timeout = 3)
    public List<TitleDto> aiTitles() {
        return titleRepo.aiTitles();
    }

    @Override
    @Cacheable(value = "static", key = "'warTitles'")
    @Transactional(readOnly = true, timeout = 3)
    public List<TitleDto> warTitles() {
        return titleRepo.warTitles();
    }

    @Override
    @Cacheable(value = "static", key = "'cultureTitles'")
    @Transactional(readOnly = true, timeout = 3)
    public List<TitleDto> cultureTitles() {
        return titleRepo.cultureTitles();
    }

    @Override
    @Cacheable(value = "static", key = "'economyTitles'")
    @Transactional(readOnly = true, timeout = 3)
    public List<TitleDto> economyTitles() {
        return titleRepo.economyTitles();
    }

    @Override
    @Cacheable(value = "static", key = "'politicalTitles'")
    @Transactional(readOnly = true, timeout = 3)
    public List<TitleDto> politicalTitles() {
        return titleRepo.politicalTitles();
    }

    @Override
    @Cacheable(value = "static", key = "'technologyTitles'")
    @Transactional(readOnly = true, timeout = 3)
    public List<TitleDto> technologyTitles() {
        return titleRepo.technologyTitles();
    }

    @Override
    @Cacheable(value = "static", key = "'suggestTitles'")
    @Transactional(readOnly = true, timeout = 3)
    public List<TitleDto> suggestTitles() {
        return titleRepo.suggestTitles();
    }
}
