# Zadania z kursu "Od zera do backend developera"

<p align="center">
  <img src="https://github.com/user-attachments/assets/7c32ec09-c2ac-4961-82e6-a98f04220510"/>
</p>

To repozytorium jest miejscem, w którym wykonujemy zadania z kursu, który znajduje się w repozytorium [backend-wakacyjne-wyzwanie-2025](https://github.com/Solvro/backend-wakacyjne-wyzwanie-2025)

## 🎯 API Endpoints

### 🔐 Authentication & Authorization

#### Authentication endpoints

- **POST** `/auth/signup` - Zarejestruj nowego użytkownika
- **POST** `/auth/login` - Zaloguj użytkownika i otrzymaj token
- **PUT** `/auth/users/roles` - Zaktualizuj role użytkownika (tylko Admin) 🔒
- **GET** `/auth/users` - Pobierz wszystkich użytkowników (tylko Admin) 🔒

#### User Management

- **GET** `/user/:id` - Pobierz dane użytkownika po ID 🔒
- **PATCH** `/user/:id` - Zaktualizuj dane użytkownika 🔒
- **DELETE** `/user/:id` - Usuń użytkownika (tylko Admin) 🔒

### 🎭 System Ról

Aplikacja wykorzystuje system ról oparty na ciągach binarnych:

- **Administrator** (0) - Pełny dostęp do systemu
- **Moderator** (1) - Zarządzanie wycieczkami i użytkownikami
- **User** (2) - Standardowy dostęp użytkownika
- **Guest** (3) - Dostęp tylko do odczytu
- **Trip Coordinator** (4) - Zarządzanie wycieczkami i uczestnikami

### Trips (Wycieczki)

#### Podstawowe operacje CRUD

- **GET** `/trips` - Pobierz wszystkie wycieczki
- **GET** `/trips/:id` - Pobierz wycieczkę po ID
- **POST** `/trips` - Utwórz nową wycieczkę 🔒 _(Admin, Trip Coordinator)_
- **PUT** `/trips/:id` - Zaktualizuj całą wycieczkę 🔒 _(Admin, Trip Coordinator, Moderator)_
- **PATCH** `/trips/:id/status` - Zaktualizuj tylko status wycieczki 🔒 _(Admin, Trip Coordinator, Moderator)_
- **DELETE** `/trips/:id` - Usuń wycieczkę 🔒 _(Admin, Trip Coordinator)_

#### Zarządzanie uczestnikami

- **GET** `/trips/:id/participants` - Pobierz uczestników wycieczki
- **POST** `/trips/:id/participants` - Dodaj uczestnika do wycieczki 🔒 _(Admin, Trip Coordinator)_
- **PUT** `/trips/:id/participants/:id` - Zaktualizuj uczestnika 🔒 _(Admin, Trip Coordinator, Moderator)_
- **DELETE** `/trips/:id/participants/:id` - Usuń uczestnika 🔒 _(Admin, Trip Coordinator)_

#### Zarządzanie wydatkami

- **GET** `/trips/:id/expenses` - Pobierz wydatki wycieczki
- **POST** `/trips/:id/expenses` - Dodaj wydatek do wycieczki 🔒 _(Admin, Trip Coordinator, User)_
- **PUT** `/trips/:id/expenses/:id` - Zaktualizuj wydatek 🔒 _(Admin, Trip Coordinator, User)_
- **DELETE** `/trips/:id/expenses/:id` - Usuń wydatek 🔒 _(Admin, Trip Coordinator)_

#### Podsumowania

- **GET** `/trips/:id/summary` - Pobierz podsumowanie wycieczki z analizą kosztów

### 📊 Przykładowe żądania

#### 🔐 Rejestracja użytkownika

```json
POST /auth/signup
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### 🔑 Logowanie użytkownika

```json
POST /auth/login
{
  "email": "user@example.com",
  "password": "password123"
}
```

Odpowiedź:

```json
{
  "email": "user@example.com",
  "roles": "00100",
  "token": "token_1693920000000:user@example.com",
  "id": 1
}
```

#### 🛡️ Zarządzanie rolami (tylko Admin)

```json
PUT /auth/users/roles
Authorization: Bearer token_1693920000000:user@example.com
{
  "userId": 2,
  "roles": [2, 4]
}
```

#### Utwórz nową wycieczkę

```json
POST /trips
Authorization: Bearer token_1693920000000:user@example.com
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
Authorization: Bearer token_1693920000000:user@example.com
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
Authorization: Bearer token_1693920000000:user@example.com
{
  "title": "Bilety lotnicze",
  "description": "Loty Warszawa - Malaga - Warszawa",
  "amount": 1200,
  "category": "TRANSPORT",
  "date": "2025-07-15",
  "participantId": 1
}
```

### 🔒 Autoryzacja

Aplikacja wykorzystuje system autoryzacji oparty na tokenach. Każdy token zawiera:

- Prefix `token_`
- Timestamp (ważność 1 godzina)
- Email użytkownika

Format tokena: `token_1693920000000:user@example.com`

**Nagłówek Authorization:** `Bearer token_1693920000000:user@example.com`

### ✅ Walidacja danych

Wszystkie endpointy wykorzystują `class-validator` do walidacji danych wejściowych:

- **Email** - Walidacja formatu email
- **Hasła** - Minimum 8 znaków, maksimum 128 znaków
- **Daty** - Format YYYY-MM-DD, daty w przyszłości
- **Kwoty** - Dodatnie liczby całkowite (w groszach)
- **Numery telefonów** - Format międzynarodowy (+48123456789)
- **Kategorie wydatków** - Enum: ACCOMMODATION, FOOD, TRANSPORT, ENTERTAINMENT, OTHER
- **Statusy wycieczek** - Enum: PLANNED, ACTIVE, COMPLETED, CANCELLED

### 🗄️ Seedowanie bazy danych

Aby wypełnić bazę danych przykładowymi danymi:

```bash
npm run seed
```

### 🧪 Testowanie

#### Uruchamianie testów jednostkowych

```bash
npm test
```

#### Uruchamianie testów e2e

Testy e2e wymagają działającej bazy danych PostgreSQL. Ustaw zmienną środowiskową `DATABASE_URL` wskazującą na bazę testową:

```bash
# Skonfiguruj bazę testową
export DATABASE_URL="postgresql://user:password@localhost:5432/budzetownik_test?schema=public"

# Przygotuj bazę dla testów e2e
npm run test:e2e:setup

# Uruchom testy e2e
npm run test:e2e
```

**Uwaga:** Testy e2e automatycznie czyszczą bazę danych przed każdym testem, więc używaj oddzielnej bazy testowej.

#### Uruchamianie wszystkich testów

```bash
npm run preflight  # lint + format + typecheck + tests + e2e + build
```

### 🚀 Uruchamianie aplikacji

#### Konfiguracja środowiska

Przed uruchomieniem aplikacji, skonfiguruj zmienne środowiskowe:

```bash
# .env
DATABASE_URL="postgresql://user:password@localhost:5432/budzetownik?schema=public"
EXPIRY_TIME_MS=3600000  # 1 hour in milliseconds
```

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

Po uruchomieniu aplikacji będzie dostępna pod adresem `http://localhost:5000`

- **Swagger/OpenAPI dokumentacja:** `http://localhost:5000/api`
- **CORS:** Skonfigurowany dla localhost z portami 5000-5599
- **Autoryzacja:** Bearer token w nagłówku Authorization

Przykładowe żądania można testować za pomocą curl, Postman, Insomnia lub interfejsu Swagger.

### 🏗️ Struktura projektu

- `src/auth/` - Moduł autentykacji i autoryzacji
  - `auth.controller.ts` - Kontroler endpointów autentykacji
  - `auth.service.ts` - Logika biznesowa autentykacji
  - `auth.guard.ts` - Guard do weryfikacji tokenów
  - `roles/` - System ról i uprawnień
    - `role.decorator.ts` - Dekorator dla ról
    - `role.guard.ts` - Guard do sprawdzania uprawnień
  - `dto/auth.dto.ts` - DTOs dla autentykacji
- `src/user/` - Moduł zarządzania użytkownikami
  - `user.controller.ts` - Kontroler użytkowników
  - `user.service.ts` - Logika biznesowa użytkowników
  - `dto/` - DTOs dla użytkowników
- `src/trips/` - Moduł zarządzania wycieczkami
  - `trips.controller.ts` - Kontroler HTTP endpointów
  - `trips.service.ts` - Logika biznesowa wycieczek
  - `trips.module.ts` - Moduł NestJS
  - `dto/trip.dto.ts` - DTOs dla wycieczek
- `src/participants/` - Moduł uczestników
  - `participants.controller.ts` - Kontroler uczestników
  - `participants.service.ts` - Logika biznesowa uczestników
  - `dto/participant.dto.ts` - DTOs dla uczestników
- `src/expenses/` - Moduł wydatków
  - `expenses.controller.ts` - Kontroler wydatków
  - `expenses.service.ts` - Logika biznesowa wydatków
  - `dto/expense.dto.ts` - DTOs dla wydatków
- `src/validators/` - Niestandardowe walidatory
  - `is-future-date.validator.ts` - Walidator dat przyszłych
  - `is-after-date.validator.ts` - Walidator porównania dat
- `src/config/` - Konfiguracja aplikacji
- `src/prisma/` - Serwis komunikacji z bazą danych
- `lib/roles/` - Biblioteka systemu ról
  - `role-utils.ts` - Narzędzia do zarządzania rolami
  - `generate-role-string.ts` - Generator ciągów ról
- `prisma/schema.prisma` - Schemat bazy danych
- `prisma/seed.ts` - Dane seedujące

### 🎨 Architektura i Best Practices

#### Separacja odpowiedzialności

- **Controllers** - Obsługują żądania HTTP i delegują logikę do serwisów
- **Services** - Zawierają logikę biznesową i operacje na danych
- **Guards** - Kontrolują dostęp do endpointów (autentykacja i autoryzacja)
- **DTOs** - Definiują strukturę danych wejściowych/wyjściowych z walidacją
- **Validators** - Niestandardowe walidatory dla specyficznych reguł biznesowych
- **Prisma Service** - Zarządza komunikacją z bazą danych

#### Zastosowane wzorce

- **Dependency Injection** - Serwisy są wstrzykiwane do kontrolerów
- **Single Responsibility** - Każdy serwis odpowiada za jedną domenę
- **Type Safety** - Używanie TypeScript DTOs i typów z Prisma
- **Role-Based Access Control (RBAC)** - System ról z ciągami binarnymi
- **Token-Based Authentication** - Tokeny z timestamp do autoryzacji
- **Input Validation** - Automatyczna walidacja wszystkich danych wejściowych
- **CORS Security** - Ograniczenie dostępu do localhost w development

#### Bezpieczeństwo

- **Haszowanie haseł** - bcrypt z saltem
- **Walidacja tokenów** - Sprawdzanie ważności i formatu
- **System ról** - Granularny dostęp do zasobów
- **Walidacja danych** - Sanityzacja i sprawdzanie wszystkich inputów
- **CORS** - Kontrola dostępu z różnych domen

#### 🆕 Nowe funkcje w tej wersji

- ✅ **System autentykacji** - Rejestracja, logowanie, tokeny
- ✅ **System autoryzacji** - Role użytkowników z uprawnieniami
- ✅ **Walidacja danych** - class-validator na wszystkich endpointach
- ✅ **Guards** - AuthGuard i RoleGuard dla bezpieczeństwa
- ✅ **Niestandardowe walidatory** - Daty przyszłe i porównania dat
- ✅ **Swagger z autoryzacją** - Bearer token w dokumentacji API
- ✅ **CORS** - Konfiguracja dla środowiska deweloperskiego
- ✅ **Biblioteka ról** - System binarny do zarządzania uprawnieniami
