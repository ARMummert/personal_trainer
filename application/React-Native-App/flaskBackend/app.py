from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import LoginManager, UserMixin, login_user, logout_user, current_user, login_required

app = Flask(__name__)
CORS(app)

# Configuration for PostgreSQL and Flask-Login
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://username:password@localhost/yourdatabase'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'your_secret_key'  # Required for session management

db = SQLAlchemy(app)
migrate = Migrate(app, db)
login_manager = LoginManager(app)
login_manager.login_view = 'login'

@app.route('/api/workouts') # for line 10 in HomeScreen.tsx
def get_workouts():
    # Your code to fetch and return workouts
    pass

# User model
class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# Initialize the database
@app.before_first_request
def create_tables():
    db.create_all()

# Route to fetch workouts
@app.route('/api/workouts')
@login_required
def get_workouts():
    # Your code to fetch and return workouts
    return jsonify({'workouts': []})


# for line 35 in loginScreen.tsx
# Route to handle login
@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()
    if user and user.check_password(password):
        login_user(user)
        return jsonify({'success': True})
    else:
        return jsonify({'success': False}), 401

# Route to handle logout
@app.route('/api/logout')
@login_required
def logout():
    logout_user()
    return jsonify({'success': True})


# line 51 in loginScreen.tsx
# Route to handle password reset
@app.route('/api/reset-password', methods=['POST'])
def reset_password():
    data = request.json
    email = data.get('email')

    user = User.query.filter_by(email=email).first()
    if user:
        user.set_password('new_password')  # Set a new password (you might want to generate a random one)
        db.session.commit()
        return jsonify({'success': True})
    else:
        return jsonify({'success': False}), 404


# for line 72 in loginScreen.tsx
# Route to handle username reset
@app.route('/api/reset-username', methods=['POST'])
def reset_username():
    data = request.json
    email = data.get('email')

    user = User.query.filter_by(email=email).first()
    if user:
        user.email = 'new_email@example.com'  # Set a new email (you might want to handle this differently)
        db.session.commit()
        return jsonify({'success': True})
    else:
        return jsonify({'success': False}), 404

if __name__ == '__main__':
    app.run(debug=True)

