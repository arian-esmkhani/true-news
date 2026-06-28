package main.repository;

import main.dto.TitleDto;

import java.util.List;

//These methods are for showing topics title
public interface TitleRepo {
    List<TitleDto> newestTitles();
    List<TitleDto> goldTitles();
    List<TitleDto> aiTitles();
    List<TitleDto> warTitles();
    List<TitleDto> cultureTitles();
    List<TitleDto> economyTitles();
    List<TitleDto> politicalTitles();
    List<TitleDto> technologyTitles();
    List<TitleDto> suggestTitles();
}
