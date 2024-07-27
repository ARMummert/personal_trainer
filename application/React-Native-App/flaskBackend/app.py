from flask import Flask, request, jsonify, url_for
from flask_cors import CORS, cross_origin
import mysql.connector
from werkzeug.security import generate_password_hash, check_password_hash
from itsdangerous import URLSafeTimedSerializer, SignatureExpired
from flask_mail import Mail, Message
import logging

app = Flask(__name__)
app.secret_key = 'your_secret_key'

# Database configuration
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

# CORS configuration
CORS(app, supports_credentials=True, origins=["https://localhost:8081"])

@app.route('/accountSignup', methods=['POST', 'OPTIONS'])
@cross_origin(origin='http://localhost:8081', supports_credentials=True)  # Ensure correct origin
def account_signup():
    if request.method == 'OPTIONS':
        response = app.make_default_options_response()
        response.headers.add("Access-Control-Allow-Origin", "http://localhost:8081")
        response.headers.add("Access-Control-Allow-Credentials", "true")
        response.headers.add("Access-Control-Allow-Methods", "POST, OPTIONS")
        response.headers.add("Access-Control-Allow-Headers", "Content-Type")
        return response

    if request.method == 'POST':
        try:
            data = request.json
            username = data['Username']
            password = data['Password']
            hashed_password = generate_password_hash(password)  # Hash the password for security

            # Log the received data for debugging
            app.logger.debug(f'Received data: {data}')

            # Database connection
            conn = mysql.connector.connect(**db_config)
            cursor = conn.cursor()

            # Insert a new user into the UserInfo table to generate the UserID
            query_userinfo = "INSERT INTO UserInfo (Name) VALUES (%s)"
            cursor.execute(query_userinfo, (username,))
            
            # Get the last inserted user ID
            user_id = cursor.lastrowid

            # Insert user login data into the UserLogins table using the generated UserID
            query_userlogins = "INSERT INTO UserLogins (UserID, Username, Password) VALUES (%s, %s, %s)"
            cursor.execute(query_userlogins, (user_id, username, hashed_password))
            conn.commit()

            return jsonify({"message": "Signup successful"}), 201

        except mysql.connector.Error as err:
            app.logger.error(f"Error during signup: {err}")
            return jsonify({"error": "Internal Server Error"}), 500

        finally:
            cursor.close()
            conn.close()

@app.route('/reset-password', methods=['POST'])
@cross_origin(origin='http://localhost:8081', supports_credentials=True)  # Ensure correct origin
def reset_password():
    try:
        data = request.json
        email = data['Email']
        
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)
        
        # Check if the email exists in the database
        cursor.execute("SELECT * FROM UserInfo WHERE Email = %s;", (email,))
        user = cursor.fetchone()
        
        if not user:
            return jsonify({"success": False, "message": "Email not found"}), 404
        
        # Generate a password reset token
        serializer = URLSafeTimedSerializer(app.secret_key)
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
@cross_origin(origin='http://localhost:8081', supports_credentials=True)  # Ensure correct origin
def reset_with_token(token):
    try:
        serializer = URLSafeTimedSerializer(app.secret_key)
        password = request.json['password']
        email = serializer.loads(token, salt='password-reset-salt', max_age=3600)
        
        hashed_password = generate_password_hash(password)
        
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()
        
        cursor.execute("UPDATE UserInfo SET Password = %s WHERE Email = %s;", (hashed_password, email))
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
@cross_origin(origin='http://localhost:8081', supports_credentials=True)  # Ensure correct origin
def reset_username():
    try:
        data = request.json
        username = data['Username']
        password = data['Password']
        new_username = data['NewUsername']
        
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)
        
        # Fetch the user from the database
        cursor.execute("SELECT * FROM UserLogins WHERE Username = %s;", (username,))
        user = cursor.fetchone()
        
        if not user or not check_password_hash(user['Password'], password):
            return jsonify({"success": False, "message": "Invalid username or password"}), 401
        
        # Update the username in the database
        cursor.execute("UPDATE UserLogins SET Username = %s WHERE Username = %s;", (new_username, username))
        conn.commit()
        
        return jsonify({"success": True}), 200
    
    except mysql.connector.Error as err:
        return jsonify({"success": False, "error": str(err)}), 500

    finally:
        cursor.close()
        conn.close()

@app.route('/api/user', methods=['GET'])
@cross_origin(origin='http://localhost:8081', supports_credentials=True)  # Ensure correct origin
def get_user_data():
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)

        cursor.execute("SELECT * FROM UserInfo;")
        users = cursor.fetchall()

        return jsonify(users), 200

    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 500

    finally:
        cursor.close()
        conn.close()

@app.route('/submitSurvey', methods=['POST'])
@cross_origin(origin='http://localhost:8081', supports_credentials=True)  # Ensure correct origin
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
                "INSERT INTO SurveyInfo (UserID, QuestionID, Response) VALUES (%s, %s, %s);",
                (user_id, question_id, response)
            )

        conn.commit()

        return jsonify({"success": True}), 201

    except mysql.connector.Error as err:
        return jsonify({"success": False, "error": str(err)}), 500

    finally:
        cursor.close()
        conn.close()

@app.route('/api/workouts', methods=['GET'])
@cross_origin(origin='http://localhost:8081', supports_credentials=True)  # Ensure correct origin
def get_workouts():
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)

        cursor.execute("SELECT * FROM Workouts;")
        workouts = cursor.fetchall()

        return jsonify(workouts), 200

    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 500

    finally:
        cursor.close()
        conn.close()

@app.route('/api/login', methods=['POST'])
@cross_origin(origin='http://localhost:8081', supports_credentials=True)  # Ensure correct origin
def login():
    try:
        data = request.json
        username = data['username']
        password = data['password']
        
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)
        
        # Fetch user from the database
        cursor.execute("SELECT * FROM UserLogins WHERE Username = %s;", (username,))
        user = cursor.fetchone()
        
        if user and check_password_hash(user['Password'], password):
            return jsonify({"success": True}), 200
        else:
            return jsonify({"success": False, "message": "Invalid username or password"}), 401

    except mysql.connector.Error as err:
        return jsonify({"success": False, "error": str(err)}), 500

    finally:
        cursor.close()
        conn.close()

@app.route('/api/logout', methods=['POST'])
@cross_origin(origin='http://localhost:8081', supports_credentials=True)  # Ensure correct origin
def logout():
    try:
        # Here, you would typically invalidate the session token or clear user-specific session data
        # Since this example is simple, we assume the user is logged out successfully
        return jsonify({"success": True}), 200
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
