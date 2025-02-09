# Fuzzy Address Search

## Overview

Fuzzy Address Search is a package that allows you to fuzzy search for addresses. It currently only supports TomTom API for address search and only supports searching for addresses in Australia.

## Try out this package before installing it

You can try out this package by cloning the repository and running:

```bash
npm run test-script.ts
```

Make sure to set the `TEST_TOM_TOM_API_KEY` environment variable first (in `.env`, you can duplicate `.env.example` and rename it to `.env`). You can get a free API key from [TomTom](https://developer.tomtom.com/).

## Installation

You can install your package for your project by running:

```bash
npm install fuzzy-address-search
```

## Usage

Here is the basic example of how to use this package:

```typescript
import {
  Address,
  fuzzySearchAddress,
  initialise,
  IntegrationType,
} from "./src/index";

initialise(IntegrationType.TOMTOM, process.env.TEST_TOM_TOM_API_KEY);

const addresses: Address[] = await fuzzySearchAddress("1 George St, Sydney");
```

## Tests

To run the tests:

```bash
npm run test
```

## API

### Functions

#### initialise

**Description:** Initializes the integration with the specified API key.

**Parameters:**

- `integrationType: IntegrationType` - The type of integration to initialize (currently only supports `TOMTOM`)
- `apiKey: string` - The API key for the integration

**Usage:**

```typescript
initialise(IntegrationType.TOMTOM, "your-api-key");
```

#### fuzzySearchAddress

**Description:** Performs a fuzzy search for addresses based on the provided query.

**Parameters:**

- `query: string` - The address query to search for
- `countries: CountryType[]` (optional) - An array of country codes to limit the search to specific countries (default is `[CountryType.AUSTRALIA]`)

**Returns:** A promise that resolves to an array of `Address` objects.

**Usage:**

```typescript
const addresses: Address[] = await fuzzySearchAddress("1 George St, Sydney");
```

### Types

#### IntegrationType

**Description:** Enum representing the type of integration.

**Values:**

- `TOMTOM`

#### CountryType

**Description:** Enum representing supported countries.

**Values:**

- `AUSTRALIA`

#### Address

**Description:** Type representing an address.

**Fields:**

- `streetNumber: string`
- `streetName: string`
- `municipalitySubdivision: string`
- `municipality: string`
- `countrySubdivision: string`
- `postalCode: string`
- `countryCode: string`
- `country: string`
- `freeformAddress: string`

### Errors

**`ConfigurationError`**

Thrown when there is a configuration issue, such as missing or invalid integration type.

**`ParsingError`**

Thrown when there is an error parsing the response from the integration.

**`BadRequestError`**

Thrown when the request to the integration API is invalid.

**`UnauthorizedError`**

Thrown when the request to the integration API is unauthorized.

**`NotFoundError`**

Thrown when the requested resource is not found.

**`InternalServerError`**

Thrown when there is an internal server error in the integration API.

**`ServiceUnavailableError`**

Thrown when the integration API service is unavailable.

**`UnexpectedError`**

Thrown when an unexpected error occurs, when fetching data from the integration API.
