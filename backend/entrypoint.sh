#!/bin/sh
set -e

echo "==> Running Django Migrations..."
python manage.py migrate --noinput

echo "==> Seeding Default Portfolio Data & Superuser..."
python seed_data.py || true

echo "==> Starting Gunicorn Server..."
exec gunicorn config.wsgi:application --bind 0.0.0.0:8000 --workers 3 --timeout 120
