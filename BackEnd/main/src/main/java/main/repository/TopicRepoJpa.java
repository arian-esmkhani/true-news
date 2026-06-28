package main.repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import main.dto.DataDto;
import org.springframework.stereotype.Repository;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class TopicRepoJpa implements TopicRepo{

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<DataDto> getByTopic(String name, int limit, int offset) {
        TypedQuery<DataDto> query = entityManager.createQuery("""
                    SELECT NEW main.dto.DataDto(
                        t.id, t.title, t.imgUrl)
                    FROM Topic t
                    WHERE t.deletedAt IS NULL AND(
                    LOWER(t.firstCategory) = LOWER(:name)
                    OR LOWER(t.secondCategory) = LOWER(:name))
                    ORDER BY t.id ASC
                    """, DataDto.class);
        return query.setFirstResult(offset)
                .setMaxResults(limit)
                .setParameter("name", name)
                .getResultList();
    }

    @Override
    public Long countGetByTopic(String name) {
        return entityManager.createQuery(
                """
                SELECT COUNT(t)
                FROM Topic t
                WHERE t.deletedAt IS NULL
                AND LOWER(t.firstCategory) = LOWER(:name)
                OR LOWER(t.secondCategory) = LOWER(:name)
                """, Long.class).setParameter("name", name).getSingleResult();
    }

    @Override
    public List<DataDto> searchByTopic(String name, int limit, int offset) {

        try {
            StringBuilder jpql = new StringBuilder("""
            SELECT NEW main.dto.DataDto(
                  t.id, t.title, t.imgUrl)
            FROM Topic t
            WHERE t.deletedAt IS NULL
            """);

            Map<String, Object> parameters = new HashMap<>();

            if (name != null && !name.trim().isEmpty()) {
                jpql.append(" AND (LOWER(t.title) LIKE LOWER(CONCAT('%', :name, '%'))" +
                        "OR LOWER(t.firstCategory) LIKE LOWER(CONCAT('%', :name, '%'))" +
                        "OR LOWER(t.secondCategory) LIKE LOWER(CONCAT('%', :name, '%')))");
                parameters.put("name", name.trim());
            }

            TypedQuery<DataDto> query = entityManager
                    .createQuery(jpql.toString(), DataDto.class);

            parameters.forEach(query::setParameter);

            return query
                    .setFirstResult(offset)
                    .setMaxResults(limit)
                    .getResultList();
        } catch (NoResultException e) {
            return Collections.emptyList();
        }
    }

    @Override
    public Long countSearchByTopic(String name) {
        try {
            StringBuilder jpql = new StringBuilder("""
            SELECT COUNT(t)
            FROM Topic t
            WHERE t.deletedAt IS NULL
            """);

            Map<String, Object> parameters = new HashMap<>();

            if (name != null && !name.trim().isEmpty()) {
                jpql.append(" AND (LOWER(t.title) LIKE LOWER(CONCAT('%', :name, '%'))" +
                        "OR LOWER(t.firstCategory) LIKE LOWER(CONCAT('%', :name, '%'))" +
                        "OR LOWER(t.secondCategory) LIKE LOWER(CONCAT('%', :name, '%')))");
                parameters.put("name", name.trim());
            }

            TypedQuery<Long> query = entityManager
                    .createQuery(jpql.toString(), Long.class);

            parameters.forEach(query::setParameter);

            return query.getSingleResult();

        } catch (NoResultException e) {
            return 0L;
        }
    }

    @Override
    public List<DataDto> getNewest(int limit, int offset) {
        TypedQuery<DataDto> query = entityManager.createQuery("""
                    SELECT NEW main.dto.DataDto(
                        t.id, t.title, t.imgUrl)
                    FROM Topic t
                    WHERE t.deletedAt IS NULL
                    ORDER BY t.createdAt DESC
                    """, DataDto.class);
        return query.setFirstResult(offset)
                .setMaxResults(limit)
                .getResultList();
    }

    @Override
    public Long countNewest() {
        return entityManager.createQuery(
                """
                SELECT COUNT(t)
                FROM Topic t
                WHERE t.deletedAt IS NULL
                """, Long.class).getSingleResult();
    }
}
