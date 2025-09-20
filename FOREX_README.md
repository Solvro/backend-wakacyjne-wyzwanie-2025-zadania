# Forex Currency Exchange Rate Scraper

This module implements a currency exchange rate scraper that fetches real-time exchange rates from the National Bank of Poland (NBP) API.

## Features

- **Real-time currency fetching**: Fetches current exchange rates for USD, EUR, and GBP against PLN
- **Database storage**: Stores historical rates in PostgreSQL using Prisma
- **REST API endpoints**: Provides endpoints to fetch rates and view history
- **Comprehensive error handling**: Handles network failures, API errors, and database issues
- **Full test coverage**: Unit tests for services and controllers, E2E tests for endpoints
- **TypeScript support**: Fully typed with proper validation

## API Endpoints

### POST /forex/fetch

Fetches current exchange rates from NBP API and saves them to the database.

**Response:**

```json
{
  "fetchedCount": 3,
  "rates": [
    {
      "currencyName": "USD",
      "rate": 4.1234,
      "fetchedAt": "2025-09-20T10:30:00.000Z"
    },
    {
      "currencyName": "EUR",
      "rate": 4.5678,
      "fetchedAt": "2025-09-20T10:30:00.000Z"
    },
    {
      "currencyName": "GBP",
      "rate": 5.2345,
      "fetchedAt": "2025-09-20T10:30:00.000Z"
    }
  ],
  "fetchedAt": "2025-09-20T10:30:00.000Z"
}
```

### GET /forex/latest

Returns the most recent exchange rates for each supported currency.

**Response:**

```json
[
  {
    "currencyName": "USD",
    "rate": 4.1234,
    "fetchedAt": "2025-09-20T10:30:00.000Z"
  },
  {
    "currencyName": "EUR",
    "rate": 4.5678,
    "fetchedAt": "2025-09-20T10:30:00.000Z"
  },
  {
    "currencyName": "GBP",
    "rate": 5.2345,
    "fetchedAt": "2025-09-20T10:30:00.000Z"
  }
]
```

### GET /forex/history

Returns historical exchange rates with optional filtering.

**Query Parameters:**

- `currency` (optional): Filter by currency code (e.g., USD, EUR, GBP)
- `limit` (optional): Maximum number of records to return (default: 10, max: 100)

**Examples:**

- `GET /forex/history` - Get last 10 rates for all currencies
- `GET /forex/history?currency=USD` - Get last 10 rates for USD only
- `GET /forex/history?limit=5` - Get last 5 rates for all currencies
- `GET /forex/history?currency=EUR&limit=20` - Get last 20 rates for EUR

### GET /forex/schedule/status

Returns information about scheduled tasks for currency rate fetching.

**Response:**

```json
{
  "enabled": true,
  "schedules": [
    {
      "name": "Daily Morning Fetch",
      "expression": "0 9 * * *",
      "description": "Fetches currency rates every day at 9:00 AM (NBP working hours)",
      "nextRun": "2025-09-21T09:00:00.000Z"
    },
    {
      "name": "Weekday Afternoon Fetch",
      "expression": "0 14 * * 1-5",
      "description": "Fetches currency rates on weekdays at 2:00 PM for midday updates",
      "nextRun": "2025-09-20T14:00:00.000Z"
    },
    {
      "name": "Weekly Maintenance",
      "expression": "0 0 * * 1",
      "description": "Runs weekly maintenance every Monday at midnight (cleans up old data)",
      "nextRun": "2025-09-23T00:00:00.000Z"
    }
  ]
}
```

## Scheduled Tasks

The forex module includes automated scheduled tasks using `@nestjs/schedule`:

### Daily Morning Fetch (`0 9 * * *`)

- **When**: Every day at 9:00 AM
- **Purpose**: Fetches the latest currency rates when NBP typically publishes new data
- **Action**: Calls `fetchCurrentRates()` and saves new rates to database

### Weekday Afternoon Fetch (`0 14 * * 1-5`)

- **When**: Every weekday at 2:00 PM
- **Purpose**: Provides midday rate updates for active trading days
- **Action**: Calls `fetchCurrentRates()` for the latest rates

### Weekly Maintenance (`0 0 * * 1`)

- **When**: Every Monday at midnight
- **Purpose**: Cleanup and maintenance of historical data
- **Action**: Removes currency rate records older than 30 days to keep database optimized

All scheduled tasks include comprehensive error handling and logging. Failed tasks are logged but don't affect application stability.

## Data Source

The scraper uses the **NBP (National Bank of Poland) Web API**, which provides:

- Official, reliable exchange rates
- JSON format responses
- No rate limiting or authentication required
- Historical data available
- Regular updates (working days)

**API Endpoint:** `https://api.nbp.pl/api/exchangerates/tables/a`

## Supported Currencies

Currently supports the following currencies against PLN:

- **USD** - US Dollar
- **EUR** - Euro
- **GBP** - British Pound Sterling

## Database Schema

The module uses the existing `ForexRate` table in the Prisma schema:

```prisma
model ForexRate {
  id        Int      @id @default(autoincrement())
  currencyName String
  rate      Float
  fetchedAt DateTime @default(now())
}
```

## Error Handling

The module includes comprehensive error handling for:

- Network connectivity issues
- NBP API unavailability or errors
- Invalid response formats
- Database connection problems
- Invalid request parameters

All errors are logged and return appropriate HTTP status codes with descriptive messages.

## Testing

### Unit Tests

- **ForexService**: Tests API fetching, database operations, and error scenarios
- **ForexController**: Tests endpoint validation and response handling

### E2E Tests

- Tests complete workflow from API calls to database persistence
- Validates all endpoints with various query parameters
- Tests error scenarios and edge cases

### Running Tests

```bash
# Unit tests
npm run test src/forex

# E2E tests
npm run test:e2e -- forex.e2e-spec.ts

# All tests
npm run test
```

## Usage Examples

### Fetch Current Rates

```bash
curl -X POST http://localhost:3000/forex/fetch
```

### Get Latest Rates

```bash
curl http://localhost:3000/forex/latest
```

### Get USD History

```bash
curl "http://localhost:3000/forex/history?currency=USD&limit=5"
```

### Check Schedule Status

```bash
curl http://localhost:3000/forex/schedule/status
```

## Architecture

The forex module follows NestJS best practices:

- **Module**: `ForexModule` - Configures dependencies and exports
- **Service**: `ForexService` - Business logic for fetching, storing rates, and scheduled tasks
- **Controller**: `ForexController` - HTTP endpoints and validation
- **DTOs**: Type definitions and validation rules
- **Scheduling**: `@nestjs/schedule` integration for automated tasks
- **Tests**: Comprehensive unit and E2E test coverage

## Future Enhancements

Potential improvements for the forex module:

- **Dynamic scheduling**: Add endpoints to modify schedule configurations
- **More currencies**: Support additional currencies from NBP API
- **Rate change alerts**: Notify on significant rate changes
- **Caching**: Add Redis caching for frequently accessed data
- **Historical analysis**: Add endpoints for rate trends and statistics
- **WebSocket updates**: Real-time rate updates for connected clients
- **Health checks**: Monitor scheduled task execution and NBP API health
