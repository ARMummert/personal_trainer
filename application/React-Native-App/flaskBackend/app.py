from flask import Flask, request, jsonify, url_for
from flask_cors import CORS
import mysql.connector
from werkzeug.security import generate_password_hash, check_password_hash
from itsdangerous import URLSafeTimedSerializer, SignatureExpired
from flask_mail import Mail, Message

app = Flask(__name__)
CORS(app)  # This will allow your React Native app to communicate with your Flask backend

db_config = {
    'user': 'capstone_2024_ignite_db',
    'password': 'cs476su24',
    'host': 'classmysql.engr.oregonstate.edu',
    'database': 'capstone_2024_ignite_db',
}

app.config.update(
    MAIL_SERVER='smtp.your-email-provider.com',
    MAIL_PORT=587,
    MAIL_USE_TLS=True,
    MAIL_USERNAME='your-email@example.com',
    MAIL_PASSWORD='your-email-password'
)

mail = Mail(app)
serializer = URLSafeTimedSerializer(app.secret_key)

@app.route('/reset-password', methods=['POST'])
def reset_password():
    try:
        data = request.json
        email = data['Email']
        
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)
        
        # Check if the email exists in the database
        cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
        user = cursor.fetchone()
        
        if not user:
            return jsonify({"success": False, "message": "Email not found"}), 404
        
        # Generate a password reset token
        token = serializer.dumps(email, salt='password-reset-salt')
        
        # Send email with the reset link (in real application, use proper email service)
        msg = Message('Password Reset Request', sender='your-email@example.com', recipients=[email])
        link = url_for('reset_with_token', token=token, _external=True)
        msg.body = f'Your password reset link is {link}'
        mail.send(msg)
        
        return jsonify({"success": True}), 200
    
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500
    finally:
        cursor.close()
        conn.close()

@app.route('/reset/<token>', methods=['POST'])
def reset_with_token(token):
    try:
        password = request.json['password']
        email = serializer.loads(token, salt='password-reset-salt', max_age=3600)
        
        hashed_password = generate_password_hash(password)
        
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()
        
        cursor.execute("UPDATE users SET password = %s WHERE email = %s", (hashed_password, email))
        conn.commit()
        
        return jsonify({"success": True}), 200
    
    except SignatureExpired:
        return jsonify({"success": False, "message": "The token is expired"}), 400
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500
    finally:
        cursor.close()
        conn.close()

@app.route('/reset-username', methods=['POST'])
def reset_username():
    try:
        data = request.json
        username = data['Username']
        password = data['Password']
        new_username = data['NewUsername']
        
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)
        
        # Fetch the user from the database
        cursor.execute("SELECT * FROM users WHERE username = %s", (username,))
        user = cursor.fetchone()
        
        if not user or not check_password_hash(user['password'], password):
            return jsonify({"success": False, "message": "Invalid username or password"}), 401
        
        # Update the username in the database
        cursor.execute("UPDATE users SET username = %s WHERE username = %s", (new_username, username))
        conn.commit()
        
        cursor.close()
        conn.close()
        
        return jsonify({"success": True}), 200
    
    except mysql.connector.Error as err:
        return jsonify({"success": False, "error": str(err)}), 500

@app.route('/api/user', methods=['GET'])
def get_user_data():
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)

        cursor.execute("SELECT * FROM users")  # Adjust the query as per your database schema
        users = cursor.fetchall()

        cursor.close()
        conn.close()

        return jsonify(users), 200

    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 500

@app.route('/accountSignup', methods=['POST'])
def account_signup():
    try:
        data = request.json
        username = data['Username']
        email = data['Email']
        password = data['Password']
        hashed_password = generate_password_hash(password)  # Hash the password for security

        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        # Insert the new user into the database
        cursor.execute("INSERT INTO users (username, email, password) VALUES (%s, %s, %s)",
                       (username, email, hashed_password))
        conn.commit()

        cursor.close()
        conn.close()

        return jsonify({"success": True}), 201

    except mysql.connector.Error as err:
        return jsonify({"success": False, "error": str(err)}), 500

@app.route('/submitSurvey', methods=['POST'])
def submit_survey():
    try:
        survey_data = request.json  # Expecting surveyData to be a JSON object
        user_id = survey_data['user_id']  # Extracting user_id from the survey data
        answers = survey_data['answers']  # Assuming survey_data contains a list of answers

        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        # Insert survey data into the database
        for answer in answers:
            question_id = answer['question_id']
            response = answer['response']
            cursor.execute(
                "INSERT INTO survey_responses (user_id, question_id, response) VALUES (%s, %s, %s)",
                (user_id, question_id, response)
            )

        conn.commit()
        cursor.close()
        conn.close()

        return jsonify({"success": True}), 201

    except mysql.connector.Error as err:
        return jsonify({"success": False, "error": str(err)}), 500

@app.route('/api/workouts', methods=['GET'])
def get_workouts():
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)

        cursor.execute("SELECT * FROM workouts")  # Adjust the query as per your database schema
        workouts = cursor.fetchall()

        cursor.close()
        conn.close()

        return jsonify(workouts), 200

    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 500

@app.route('/api/login', methods=['POST'])
def login():
    try:
        data = request.json
        username = data['username']
        password = data['password']
        
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)
        
        # Fetch user from the database
        cursor.execute("SELECT * FROM users WHERE username = %s", (username,))
        user = cursor.fetchone()
        
        cursor.close()
        conn.close()
        
        if user and check_password_hash(user['password'], password):
            return jsonify({"success": True}), 200
        else:
            return jsonify({"success": False, "message": "Invalid username or password"}), 401
    
    except mysql.connector.Error as err:
        return jsonify({"success": False, "error": str(err)}), 500

@app.route('/api/logout', methods=['POST'])
def logout():
    try:
        # Here, you would typically invalidate the session token or clear user-specific session data
        # Since this example is simple, we assume the user is logged out successfully
        return jsonify({"success": True}), 200
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
