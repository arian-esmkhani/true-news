package main.repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.PersistenceContext;
import main.dto.ArticleDto;
import main.dto.ArticleResponse;
import main.dto.TopicDto;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ArticleRepoJpa implements  ArticleRepo{

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public ArticleResponse getArticle(long topicID) {
        String sql = """
            SELECT
                t.title,
                t.description,
                t.imag_url,
                t.first_category,
                t.second_category,
                a.head,
                a.body,
                a.imag_url,
                a.sec
            FROM topic t
            JOIN article a ON a.topic_id = t.id
            WHERE t.id = :topicID
            AND a.deleted_at IS null
            ORDER BY a.sec
            """;

        @SuppressWarnings("unchecked")
        List<Object[]> results = entityManager.createNativeQuery(sql)
                .setParameter("topicID", topicID)
                .getResultList();

        if (results.isEmpty()) {
            throw new NoResultException("Article not found");
        }

        Object[] firstRow = results.getFirst();
        // title - description - imag_url - first_category - second_category
        TopicDto topicDto = new TopicDto(
                (String) firstRow[0], (String) firstRow[1], (String) firstRow[2],
                (String) firstRow[3], (String) firstRow[4]);

        List<ArticleDto> articleDto = results.stream()
                .filter(row -> row[5] != null)
                .map(row -> new ArticleDto(
                        (String) row[5],//head
                        (String) row[6],//body
                        (String) row[7],//imag_url
                        (Integer) row[8]//sec
                ))
                .toList();

        return new ArticleResponse(topicDto, articleDto);
    }
}
