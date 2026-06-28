package main.repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import main.dto.TitleDto;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class TitleRepoJpa implements TitleRepo {

    private static final int STATIC_LIMIT = 6;
    private static final int SUGGEST_LIMIT = 10;
    private static final int NEWEST_LIMIT = 24;
    private static final String GOLD = "gold";
    private static final String AI = "ai";
    private static final String WAR = "war";
    private static final String CULTURE = "culture";
    private static final String ECONOMY = "economy";
    private static final String POLITICAL = "political";
    private static final String TECHNOLOGY = "technology";
    private static final String SUGGEST = "suggest";

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<TitleDto> newestTitles() {
        TypedQuery<TitleDto> query = entityManager.createQuery("""
                SELECT NEW main.dto.TitleDto(
                    t.id, t.title)
                FROM Topic t
                WHERE t.deletedAt IS NULL
                ORDER BY t.createdAt DESC
                """, TitleDto.class);
        return query.setMaxResults(NEWEST_LIMIT)
                .getResultList();
    }

    @Override
    public List<TitleDto> goldTitles() {
        TypedQuery<TitleDto> query = entityManager.createQuery("""
                SELECT NEW main.dto.TitleDto(
                    t.id, t.title)
                FROM Topic t
                WHERE t.deletedAt IS NULL AND t.secondCategory = :par
                ORDER BY t.createdAt DESC
                """, TitleDto.class);
        return query.setParameter("par", GOLD)
                .setMaxResults(STATIC_LIMIT)
                .getResultList();
    }

    @Override
    public List<TitleDto> aiTitles() {
        TypedQuery<TitleDto> query = entityManager.createQuery("""
                SELECT NEW main.dto.TitleDto(
                    t.id, t.title)
                FROM Topic t
                WHERE t.deletedAt IS NULL AND t.secondCategory = :par
                ORDER BY t.createdAt DESC
                """, TitleDto.class);
        return query.setParameter("par", AI)
                .setMaxResults(STATIC_LIMIT)
                .getResultList();
    }

    @Override
    public List<TitleDto> warTitles() {
        TypedQuery<TitleDto> query = entityManager.createQuery("""
                SELECT NEW main.dto.TitleDto(
                    t.id, t.title)
                FROM Topic t
                WHERE t.deletedAt IS NULL AND t.secondCategory = :par
                ORDER BY t.createdAt DESC
                """, TitleDto.class);
        return query.setParameter("par", WAR)
                .setMaxResults(STATIC_LIMIT)
                .getResultList();
    }

    @Override
    public List<TitleDto> cultureTitles() {
        TypedQuery<TitleDto> query = entityManager.createQuery("""
                SELECT NEW main.dto.TitleDto(
                    t.id, t.title)
                FROM Topic t
                WHERE t.deletedAt IS NULL AND t.firstCategory = :par
                ORDER BY t.createdAt DESC
                """, TitleDto.class);
        return query.setParameter("par", CULTURE)
                .setMaxResults(STATIC_LIMIT)
                .getResultList();
    }

    @Override
    public List<TitleDto> economyTitles() {
        TypedQuery<TitleDto> query = entityManager.createQuery("""
                SELECT NEW main.dto.TitleDto(
                    t.id, t.title)
                FROM Topic t
                WHERE t.deletedAt IS NULL AND t.firstCategory = :par
                ORDER BY t.createdAt DESC
                """, TitleDto.class);
        return query.setParameter("par", ECONOMY)
                .setMaxResults(STATIC_LIMIT)
                .getResultList();
    }

    @Override
    public List<TitleDto> politicalTitles() {
        TypedQuery<TitleDto> query = entityManager.createQuery("""
                SELECT NEW main.dto.TitleDto(
                    t.id, t.title)
                FROM Topic t
                WHERE t.deletedAt IS NULL AND t.firstCategory = :par
                ORDER BY t.createdAt DESC
                """, TitleDto.class);
        return query.setParameter("par", POLITICAL)
                .setMaxResults(STATIC_LIMIT)
                .getResultList();
    }

    @Override
    public List<TitleDto> technologyTitles() {
        TypedQuery<TitleDto> query = entityManager.createQuery("""
                SELECT NEW main.dto.TitleDto(
                    t.id, t.title)
                FROM Topic t
                WHERE t.deletedAt IS NULL AND t.firstCategory = :par
                ORDER BY t.createdAt DESC
                """, TitleDto.class);
        return query.setParameter("par", TECHNOLOGY)
                .setMaxResults(STATIC_LIMIT)
                .getResultList();
    }

    @Override
    public List<TitleDto> suggestTitles() {
        TypedQuery<TitleDto> query = entityManager.createQuery("""
                SELECT NEW main.dto.TitleDto(
                    t.id, t.title)
                FROM Topic t
                WHERE t.deletedAt IS NULL AND t.status = :par
                ORDER BY t.createdAt DESC
                """, TitleDto.class);
        return query.setParameter("par", SUGGEST)
                .setMaxResults(SUGGEST_LIMIT)
                .getResultList();
    }
}
