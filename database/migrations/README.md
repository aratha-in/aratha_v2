# Database Migrations

This directory contains schema migration scripts and versioned SQL/JSON delta updates for the Aratha database layer.

## Schema Locations
- Primary JSON document store: `database/schema/db.json`
- SQLite / Postgres schema (Payload CMS): `database/schema/aratha.db`

## Running Migrations
Migration scripts placed in `database/migrations/` execute sequentially before production deployments or when bootstrapping environment instances.
