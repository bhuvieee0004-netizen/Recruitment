import os
import time
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
from werkzeug.utils import secure_filename
from sqlalchemy import inspect

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests from the React frontend

# --- Database Configuration using SQLAlchemy ---
DB_USER = os.environ.get("DB_USER", "postgres")
DB_PASSWORD = os.environ.get("DB_PASSWORD", "")
DB_HOST = os.environ.get("DB_HOST", "localhost")
DB_PORT = os.environ.get("DB_PORT", "5432")
DB_NAME = os.environ.get("DB_NAME", "aiotics")

# SQLAlchemy connection string for PostgreSQL
app.config['SQLALCHEMY_DATABASE_URI'] = f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# --- File Upload Configuration ---
UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), 'uploads')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


# --- Database Model ---
class Applicant(db.Model):
    """SQLAlchemy model representing the 'applicants' table."""
    __tablename__ = 'applicants'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(255), nullable=False)
    phone = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    skills = db.Column(db.Text, nullable=False)
    years_of_experience = db.Column(db.Integer, nullable=False)
    resume_file_path = db.Column(db.Text, nullable=True)
    linkedin_url = db.Column(db.String(255), nullable=True)
    github_url = db.Column(db.String(255), nullable=True)
    created_at = db.Column(db.DateTime, server_default=db.func.current_timestamp())

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'phone': self.phone,
            'email': self.email,
            'skills': self.skills,
            'years_of_experience': self.years_of_experience,
            'resume_file_path': self.resume_file_path,
            'linkedin_url': self.linkedin_url,
            'github_url': self.github_url,
            'created_at': self.created_at.isoformat() if self.created_at else None,
        }


# --- API Routes ---

@app.route('/api/apply', methods=['POST'])
def apply():
    """
    POST /api/apply
    Receives multipart/form-data from the React frontend.
    Validates required fields, saves the resume file, and inserts the applicant into the database.
    """
    try:
        # 1. Extract form data
        name = request.form.get('name')
        phone = request.form.get('phone')
        email = request.form.get('email')
        skills = request.form.get('skills')
        years_of_experience = request.form.get('years_of_experience')
        linkedin_url = request.form.get('linkedin_url', None)
        github_url = request.form.get('github_url', None)

        # 2. Server-side validation
        if not all([name, phone, email, skills, years_of_experience]):
            return jsonify({'error': 'Required fields are missing: name, phone, email, skills, years_of_experience'}), 400

        try:
            years_of_experience = int(years_of_experience)
        except ValueError:
            return jsonify({'error': 'years_of_experience must be a number.'}), 400

        # 3. Handle resume file upload
        resume_file_path = None
        if 'resume' in request.files:
            file = request.files['resume']
            if file and file.filename:
                filename = secure_filename(file.filename)
                unique_filename = f"{int(time.time())}_{filename}"
                file_path = os.path.join(app.config['UPLOAD_FOLDER'], unique_filename)
                file.save(file_path)
                resume_file_path = file_path

        # 4. Create applicant record using SQLAlchemy ORM
        new_applicant = Applicant(
            name=name,
            phone=phone,
            email=email,
            skills=skills,
            years_of_experience=years_of_experience,
            resume_file_path=resume_file_path,
            linkedin_url=linkedin_url or None,
            github_url=github_url or None,
        )

        db.session.add(new_applicant)
        db.session.commit()

        return jsonify({
            'message': 'Application submitted successfully!',
            'applicant': new_applicant.to_dict()
        }), 201

    except Exception as e:
        db.session.rollback()
        error_msg = str(e)
        print(f"Error processing application: {error_msg}")

        # Handle unique email constraint violation
        if 'unique' in error_msg.lower() or 'duplicate' in error_msg.lower() or '23505' in error_msg:
            return jsonify({'error': 'An application with this email already exists.'}), 409

        return jsonify({'error': 'Internal server error.'}), 500


# --- Application Startup ---
if __name__ == '__main__':
    # Create tables if they don't exist (SQLAlchemy handles this automatically)
    with app.app_context():
        db.create_all()
        print("Database tables verified/created successfully.")

    port = int(os.environ.get('PORT', 5000))
    app.run(debug=True, port=port)
