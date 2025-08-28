# Zadania z kursu "Od zera do backend developera"

<p align="center">
  <img src="https://github.com/user-attachments/assets/7c32ec09-c2ac-4961-82e6-a98f04220510"/>
</p>

To repozytorium jest miejscem, w którym wykonujemy zadania z kursu, który znajduje się w repozytorium [backend-wakacyjne-wyzwanie-2025](https://github.com/Solvro/backend-wakacyjne-wyzwanie-2025)

## 🎯 API Endpoints

### Trips (Wycieczki)

#### Podstawowe operacje CRUD

- **GET** `/trips` - Pobierz wszystkie wycieczki
- **GET** `/trips/:id` - Pobierz wycieczkę po ID
- **POST** `/trips` - Utwórz nową wycieczkę
- **PUT** `/trips/:id` - Zaktualizuj całą wycieczkę
- **PATCH** `/trips/:id/status` - Zaktualizuj tylko status wycieczki
- **DELETE** `/trips/:id` - Usuń wycieczkę

#### Zarządzanie uczestnikami

- **GET** `/trips/:id/participants` - Pobierz uczestników wycieczki
- **POST** `/trips/:id/participants` - Dodaj uczestnika do wycieczki

#### Zarządzanie wydatkami

- **GET** `/trips/:id/expenses` - Pobierz wydatki wycieczki
- **POST** `/trips/:id/expenses` - Dodaj wydatek do wycieczki

#### Podsumowania

- **GET** `/trips/:id/summary` - Pobierz podsumowanie wycieczki z analizą kosztów

### 📊 Przykładowe żądania

#### Utwórz nową wycieczkę

```json
POST /trips
{
  "name": "Wakacje w Hiszpanii",
  "description": "Wspaniały tygodniowy pobyt na Costa del Sol",
  "startDate": "2025-07-15",
  "endDate": "2025-07-22",
  "budget": 5000
}
```

#### Dodaj uczestnika

```json
POST /trips/1/participants
{
  "name": "Jan Kowalski",
  "email": "jan.kowalski@example.com",
  "phone": "+48 123 456 789",
  "isOrganizer": false
}
```

#### Dodaj wydatek

```json
POST /trips/1/expenses
{
  "title": "Bilety lotnicze",
  "description": "Loty Warszawa - Malaga - Warszawa",
  "amount": 1200,
  "category": "TRANSPORT",
  "date": "2025-07-15",
  "participantId": 1
}
```

### 🗄️ Seedowanie bazy danych

Aby wypełnić bazę danych przykładowymi danymi:

```bash
npm run seed
```

### 🚀 Uruchamianie aplikacji

#### Tryb deweloperski

```bash
npm run start:dev
```

#### Tryb produkcyjny

```bash
npm run build
npm run start:prod
```

#### Testowanie API

Po uruchomieniu aplikacji będzie dostępna pod adresem `http://localhost:3000`

Przykładowe żądania można testować za pomocą curl, Postman, lub Insomnia.

### 🏗️ Struktura projektu

- `src/trips/` - Moduł zarządzania wycieczkami
  - `trips.controller.ts` - Kontroler HTTP endpointów
  - `trips.service.ts` - Logika biznesowa wycieczek
  - `participants.service.ts` - Logika biznesowa uczestników
  - `expenses.service.ts` - Logika biznesowa wydatków
  - `trips.module.ts` - Moduł NestJS
  - `dto/` - Data Transfer Objects (DTOs)
    - `trip.dto.ts` - DTOs dla wycieczek
    - `participant.dto.ts` - DTOs dla uczestników
    - `expense.dto.ts` - DTOs dla wydatków
- `src/prisma/` - Serwis komunikacji z bazą danych
- `prisma/schema.prisma` - Schemat bazy danych
- `prisma/seed.ts` - Dane seedujące

### 🎨 Architektura i Best Practices

#### Separacja odpowiedzialności

- **Controllers** - Obsługują żądania HTTP i delegują logikę do serwisów
- **Services** - Zawierają logikę biznesową i operacje na danych
- **DTOs** - Definiują strukturę danych wejściowych/wyjściowych
- **Prisma Service** - Zarządza komunikacją z bazą danych

#### Zastosowane wzorce

- **Dependency Injection** - Serwisy są wstrzykiwane do kontrolerów
- **Single Responsibility** - Każdy serwis odpowiada za jedną domenę
- **Type Safety** - Używanie TypeScript DTOs i typów z Prisma
