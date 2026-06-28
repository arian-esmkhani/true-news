# Full-Stack News/Content Platform

A complete web application with a Spring Boot backend API and a Next.js frontend, delivering dynamic content including articles, topics, sliders, and categorized titles with caching and async support.

## Architecture Overview
<img src="ar.png" width="760" alt="Architecture">

## Tech Stack

### Backend
- **Java 21** with Spring Boot
- **Spring Data JPA** & **Hibernate**
- **Spring Cache** with **Redis**
- **Spring Async** with custom thread pool
- **MySQL** (assumed, based on JPA usage)
- **Maven** (presumed)
- **Validation** (Hibernate Validator)

### Frontend
- **Next.js** (React framework)
- **TypeScript**
- **Tailwind CSS**

## Backend Overview

The backend provides REST APIs for content delivery with built-in performance optimizations.

### Key Features
- **Async Processing** – Custom thread pool for non-blocking operations (`AsyncConfig`)
- **Redis Caching** – Tiered caching strategy with different TTLs per entity (`CacheConfig`)
- **JSON Serialization** – `GenericJackson2JsonRedisSerializer` for human-readable cache
- **Pagination** – Reusable `PageInfo` helper with 12 items per page
- **Validation** – Request validation (`@Positive`, `@Max`, `@Pattern`) on all endpoints
- **Read-only Transactions** – Optimized with timeouts (2–4 sec) on all queries

### API Modules
| Controller | Endpoints | Description |
|------------|-----------|-------------|
| `ArticleController` | `/api/article/get/{topicID}` | Full article + topic metadata |
| `SliderController` | `/api/slider/{trend,interview,note,newest}` | Top 5 items per category |
| `TitleController` | `/api/title/{newest,gold,ai,war,culture,economy,political,technology,suggest}` | Lists of titles (6–24 items) |
| `TopicController` | `/api/topic/by-topic/{name}`, `/search-topic/{name}`, `/newest` | Paginated topic lists with hasNext flag |

### Database Entities (implied)
- `Topic` – Main content container (title, description, image, categories)
- `Article` – Detailed content (head, body, image, section order)

### Caching Strategy
| Cache Name | TTL |
|------------|-----|
| Default | 2 hours |
| `user` | 20 minutes |
| `static` | 5 hours |

### Async Executor
- Core threads: 3
- Max threads: 10
- Queue capacity: 50
- Prefix: `Async-`

## Frontend Overview

The frontend is built with Next.js and Tailwind CSS, consuming the backend APIs.

- **Responsive layout** with Tailwind CSS
- **Type-safe API calls** using TypeScript interfaces matching backend DTOs:
  - `ArticleResponse` (topic + article sections)
  - `DataDto` (id, title, imgUrl)
  - `TitleDto` (id, title)
  - `TopicResponse` (list + pagination flag)
- **Client-side caching** with SWR or React Query (if implemented)
- **Dynamic routing** for topics and articles