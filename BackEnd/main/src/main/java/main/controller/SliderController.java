package main.controller;

import lombok.RequiredArgsConstructor;
import main.dto.DataDto;
import main.service.SliderService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/slider")
@RequiredArgsConstructor
public class SliderController {

    private final SliderService sliderService;

    @GetMapping("/trend")
    public List<DataDto> trendSlider() {
        return sliderService.trendSlider();
    }

    @GetMapping("/interview")
    public List<DataDto> interviewSlider() {
        return sliderService.interviewSlider();
    }

    @GetMapping("/note")
    public List<DataDto> noteSlider() {
        return sliderService.noteSlider();
    }

    @GetMapping("/newest")
    public List<DataDto> newestSlider() {
        return sliderService.newestSlider();
    }
}
