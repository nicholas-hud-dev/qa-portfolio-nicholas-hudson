# API Testing Examples (Manual QA + Postman Style)

This document demonstrates structured API testing coverage including functional validation, negative testing, edge cases, and basic security considerations.

The goal is to show QA thinking: validating correctness, failure behavior, and data integrity across API endpoints.

---

# 1. Authentication API

## Endpoint
POST /api/auth/login

## Request
{
  "email": "testuser@example.com",
  "password": "Password123!"
}

## Expected Response (200 OK)
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1021,
    "email": "testuser@example.com",
    "role": "member"
  },
  "expiresIn": 3600
}

---

## Test Scenarios

### Valid Login
- Verify status code is 200
- Verify token is returned and not empty
- Verify user object contains correct email and ID
- Verify expiration field exists and is numeric

---

### Invalid Password
Request:
{
  "email": "testuser@example.com",
  "password": "WrongPassword"
}

Expected:
- Status: 401 Unauthorized
- Error message: "Invalid credentials"

---

### Non-Existent User
Request:
{
  "email": "nonexistent@example.com",
  "password": "Password123!"
}

Expected:
- Status: 401 or 404 (implementation dependent)
- System should not reveal whether the email exists

---

### Missing Fields
Request:
{
  "email": "testuser@example.com"
}

Expected:
- Status: 400 Bad Request
- Validation error for missing password field

---

### Edge Case: SQL Injection Attempt
Request:
{
  "email": "testuser@example.com' OR '1'='1",
  "password": "Password123!"
}

Expected:
- Request is safely rejected
- No authentication bypass occurs
- No database errors exposed

---

### Edge Case: Empty Payload
Request:
{}

Expected:
- Status: 400 Bad Request
- Required field validation errors returned

---

# 2. User Profile API

## Endpoint
GET /api/users/{id}

## Valid Request
GET /api/users/1021

## Expected Response (200 OK)
{
  "id": 1021,
  "email": "testuser@example.com",
  "name": "Test User",
  "membershipStatus": "active",
  "createdAt": "2025-01-10T12:34:56Z"
}

---

## Test Scenarios

### Valid User ID
- Verify correct user data is returned
- Verify response schema consistency
- Verify timestamp format is ISO 8601

---

### Invalid ID Format
GET /api/users/abc123

Expected:
- 400 Bad Request or 404 Not Found
- No internal error messages exposed

---

### Non-Existent User
GET /api/users/999999

Expected:
- 404 Not Found
- Proper error message returned

---

### Authorization Check
Request without valid auth token:

Expected:
- 401 Unauthorized
- No sensitive data returned

---

# 3. Data Integrity Validation

## Schema Checks
- Required fields must always be present
- No unexpected null values in critical fields
- Data types must remain consistent

## Security Checks
- No sensitive data exposed in responses
- Error messages must not reveal internal system details
- Injection attempts must not succeed

## Performance Checks (Manual QA Perspective)
- Standard responses should return within acceptable time (< 1–2 seconds)
- No timeout or degradation under normal expected usage

---

# 4. Summary

This document demonstrates:

- REST API understanding (requests, responses, status codes)
- Positive and negative test case design
- Edge case and failure-mode thinking
- Basic security awareness
- Structured QA documentation suitable for real-world teams
