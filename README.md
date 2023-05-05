# Daily Diet API

## Description

This is a small exercise to create a REST API using node.js and fastify. The API is a simple CRUD for a daily diet. The API will use sqlite3 as database.

## Functional Requirements

- [x] should be possible to create a new user
- [ ] should be possible identify a user on a request using a token
- [x] should be possible to register a meal with following information:
  - name
  - description
  - date & time
  - is or isn't part of the diet
- [x] should be possible to update a meal, changing any of the information above
- [x] should be possible to delete a meal
- [x] should be possible to list all meals from a user
- [x] should be possible to view a single meal
- [ ] should be possible to retrieve user metrics:
  - total amount of registered meals
  - total amount of meals that are part of the diet
  - total amount of meals that aren't part of the diet
  - best streak of days with meals that are part of the diet

## Business Rules

- [ ] An user can only see, edit and delete meals registered by himself
