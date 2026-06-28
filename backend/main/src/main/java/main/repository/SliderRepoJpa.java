package main.repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import main.dto.DataDto;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class SliderRepoJpa implements SliderRepo{

    private static final String TREND = "trend";
    private static final String INTERVIEW = "interview";
    private static final String NOTE = "note";
    private static final int STATIC_LIMIT = 5;

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<DataDto> trendSlider() {
        TypedQuery<DataDto> query = entityManager.createQuery("""
                SELECT NEW main.dto.DataDto(
                    t.id, t.title, t.imgUrl)
                FROM Topic t
                WHERE t.deletedAt IS NULL AND t.status = :par
                ORDER BY t.createdAt DESC
                """, DataDto.class);
        return query.setParameter("par", TREND)
                .setMaxResults(STATIC_LIMIT)
                .getResultList();
    }

    @Override
    public List<DataDto> interviewSlider() {
        TypedQuery<DataDto> query = entityManager.createQuery("""
                SELECT NEW main.dto.DataDto(
                    t.id, t.title, t.imgUrl)
                FROM Topic t
                WHERE t.deletedAt IS NULL AND t.status = :par
                ORDER BY t.createdAt DESC
                """, DataDto.class);
        return query.setParameter("par", INTERVIEW)
                .setMaxResults(STATIC_LIMIT)
                .getResultList();
    }

    @Override
    public List<DataDto> noteSlider() {
        TypedQuery<DataDto> query = entityManager.createQuery("""
                SELECT NEW main.dto.DataDto(
                    t.id, t.title, t.imgUrl)
                FROM Topic t
                WHERE t.deletedAt IS NULL AND t.status = :par
                ORDER BY t.createdAt DESC
                """, DataDto.class);
        return query.setParameter("par", NOTE)
                .setMaxResults(STATIC_LIMIT)
                .getResultList();
    }

    @Override
    public List<DataDto> newestSlider() {
        TypedQuery<DataDto> query = entityManager.createQuery("""
                SELECT NEW main.dto.DataDto(
                    t.id, t.title, t.imgUrl)
                FROM Topic t
                WHERE t.deletedAt IS NULL
                ORDER BY t.createdAt DESC
                """, DataDto.class);
        return query.setMaxResults(STATIC_LIMIT)
                .getResultList();
    }
}
