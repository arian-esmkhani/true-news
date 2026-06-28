package main.service;

import lombok.RequiredArgsConstructor;
import main.dto.DataDto;
import main.repository.SliderRepo;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SliderServiceImpl implements SliderService{

    private final SliderRepo sliderRepo;

    @Override
    @Transactional(readOnly = true, timeout = 3)
    @Cacheable(value = "static", key = "'trendSlider'")
    public List<DataDto> trendSlider() {
        return sliderRepo.trendSlider();
    }

    @Override
    @Transactional(readOnly = true, timeout = 3)
    @Cacheable(value = "static", key = "'interviewSlider'")
    public List<DataDto> interviewSlider() {
        return sliderRepo.interviewSlider();
    }

    @Override
    @Transactional(readOnly = true, timeout = 3)
    @Cacheable(value = "static", key = "'noteSlider'")
    public List<DataDto> noteSlider() {
        return sliderRepo.noteSlider();
    }

    @Override
    @Transactional(readOnly = true, timeout = 3)
    @Cacheable(value = "static", key = "'newestSlider'")
    public List<DataDto> newestSlider() {
        return sliderRepo.newestSlider();
    }
}
