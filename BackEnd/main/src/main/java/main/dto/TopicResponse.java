package main.dto;

import java.util.List;

//For Topic repo DataDto with HasNext
public record TopicResponse(
        List<DataDto> dataDto,
        boolean hasNext
) {
}
