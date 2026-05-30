#!/usr/bin/env bash
# Exit on error
set -o errexit

# Install Python dependencies
pip install --upgrade pip
pip install -r requirements.txt

# Create database tables (SQLAlchemy creates them if they don't exist)
python -c "
from app import app, db
with app.app_context():
    db.create_all()
    print('Database tables verified/created successfully.')
"
