package main.repository;

import main.dto.DataDto;

import java.util.List;

public interface SliderRepo {
    List<DataDto> trendSlider();
    List<DataDto> interviewSlider();
    List<DataDto> noteSlider();
    List<DataDto> newestSlider();
}
