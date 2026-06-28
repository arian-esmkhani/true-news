package main.controller;

import lombok.RequiredArgsConstructor;
import main.dto.TitleDto;
import main.service.TitleService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/title")
@RequiredArgsConstructor
public class TitleController {

    private final TitleService titleService;

    @GetMapping("/newest")
    public List<TitleDto> newestTitles() {
        return titleService.newestTitles();
    }

    @GetMapping("/gold")
    public List<TitleDto> goldTitles() {
        return titleService.goldTitles();
    }

    @GetMapping("/ai")
    public List<TitleDto> aiTitles() {
        return titleService.aiTitles();
    }

    @GetMapping("/war")
    public List<TitleDto> warTitles() {
        return titleService.warTitles();
    }

    @GetMapping("/culture")
    public List<TitleDto> cultureTitles() {
        return titleService.cultureTitles();
    }

    @GetMapping("/economy")
    public List<TitleDto> economyTitles() {
        return titleService.economyTitles();
    }

    @GetMapping("/political")
    public List<TitleDto> politicalTitles() {
        return titleService.politicalTitles();
    }

    @GetMapping("/technology")
    public List<TitleDto> technologyTitles() {
        return titleService.technologyTitles();
    }

    @GetMapping("/suggest")
    public List<TitleDto> suggestTitles() {
        return titleService.suggestTitles();
    }
}
