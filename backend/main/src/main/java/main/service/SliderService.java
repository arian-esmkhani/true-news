package main.service;

import main.dto.DataDto;

import java.util.List;

public interface SliderService {
    List<DataDto> trendSlider();
    List<DataDto> interviewSlider();
    List<DataDto> noteSlider();
    List<DataDto> newestSlider();
}
