from flask import Flask, request, jsonify, send_from_directory, session, url_for, render_template_string
from flask_cors import CORS, cross_origin
import mysql.connector
from werkzeug.security import generate_password_hash, check_password_hash
from itsdangerous import URLSafeTimedSerializer, SignatureExpired
from flask_mail import Mail, Message
import logging
from datetime import datetime
import jwt
from flask_session import Session

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
    MAIL_SERVER='smtp.office365.com',
    MAIL_PORT=587,
    MAIL_USE_TLS=True,
    MAIL_USERNAME='ignitepasswordreset@outlook.com',
    MAIL_PASSWORD='Capstone123'
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
            email = data['Email']
            password = data['Password']
            fullname = data['Fullname']
            hashed_password = generate_password_hash(password)  # Hash the password for security
            date_created = datetime.now()

            # Log the received data for debugging
            app.logger.debug(f'Received data: {data}')

            # Database connection
            conn = mysql.connector.connect(**db_config)
            cursor = conn.cursor(dictionary=True) 
            
            # Insert user login data into the UserLogins table
            query_userlogins = "INSERT INTO UserLogins (Username, Email, Password, Name) VALUES (%s, %s, %s, %s)"
            cursor.execute(query_userlogins, (username, email, hashed_password, fullname))
            
            # Fetch the generated UserID
            cursor.execute("SELECT UserID FROM UserLogins WHERE Username = %s", (username,))
            user = cursor.fetchone()
            if user:
                user_id = user['UserID']
            
                # Insert into UserInfo table
                query_userinfo = "INSERT INTO UserInfo (UserID, DateCreated) VALUES (%s, %s)"
                cursor.execute(query_userinfo, (user_id, date_created))
            
                conn.commit()
                return jsonify({"success": True, "message": "Signup successful"}), 201
            else:
                return jsonify({"success": False, "message": "User creation failed"}), 500

        except mysql.connector.Error as err:
            return jsonify({"success": False, "error": str(err)}), 500

        finally:
            cursor.close()
            conn.close()

@app.route('/login', methods=['POST', 'OPTIONS'])
@cross_origin(origin='http://localhost:8081', supports_credentials=True)  # Ensure correct origin
def login():
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
            
            conn = mysql.connector.connect(**db_config)
            cursor = conn.cursor(dictionary=True)
            
            # Fetch user from the database
            cursor.execute("SELECT * FROM UserLogins WHERE Username = %s;", (username,))
            user = cursor.fetchone()
            if user:
                user_pass = generate_password_hash(password)
                stored_hashed_password = user['Password']
                if check_password_hash(stored_hashed_password, password):
                    return jsonify({"success": True}), 200
                else:
                    return jsonify({"success": False, "message": "Invalid username or password"}), 401
            else:
                return jsonify({"success": False, "message": "Invalid username or password"}), 401

        except mysql.connector.Error as err:
            return jsonify({"success": False, "error": str(err)}), 500

        finally:
            cursor.close()
            conn.close()

@app.route('/reset-password', methods=['POST', 'OPTIONS'])
@cross_origin(origin='http://localhost:8081', supports_credentials=True)
def reset_password():
    if request.method == 'OPTIONS':
        response = app.make_default_options_response()
        response.headers.add("Access-Control-Allow-Origin", "http://localhost:8081")
        response.headers.add("Access-Control-Allow-Credentials", "true")
        response.headers.add("Access-Control-Allow-Methods", "POST, OPTIONS")
        response.headers.add("Access-Control-Allow-Headers", "Content-Type")
        return response

    if request.method == 'POST':
        app.logger.debug(f"Content-Type: {request.content_type}")
        
        if not request.is_json:
            return jsonify({"success": False, "error": "Unsupported Media Type: Expected 'application/json'"}), 415

        conn = None
        cursor = None
        try:
            data = request.json
            email = data['Email']
            
            conn = mysql.connector.connect(**db_config)
            cursor = conn.cursor(dictionary=True)
            
            # Check if the email exists in the database
            cursor.execute("SELECT * FROM UserLogins WHERE Email = %s;", (email,))
            user = cursor.fetchone()
            
            if not user:
                app.logger.debug(user)
                return jsonify({"success": False, "message": "Email not found"}), 404
            
            # Generate a password reset token
            serializer = URLSafeTimedSerializer(app.secret_key)
            token = serializer.dumps(email, salt='password-reset-salt')
            
            # Send email with the reset link
            msg = Message('Password Reset Request', sender='ignitepasswordreset@outlook.com', recipients=[email])
            link = url_for('reset_with_token', token=token, _external=True)
            msg.body = f'Your password reset link is {link}'
            mail.send(msg)
            
            return jsonify({"success": True}), 200
        
        except mysql.connector.Error as db_err:
            logging.error(f"Database error: {db_err}")
            return jsonify({"success": False, "error": "Database error"}), 500

        except Exception as e:
            logging.error(f"Error processing reset password request: {e}")
            return jsonify({"success": False, "error": "Internal server error"}), 500

        finally:
            if cursor is not None:
                cursor.close()
            if conn is not None:
                conn.close()

@app.route('/reset/<token>', methods=['POST', 'GET', 'OPTIONS'])
@cross_origin(origin='http://localhost:8081', supports_credentials=True)
def reset_with_token(token):
    if request.method == 'OPTIONS':
        response = app.make_default_options_response()
        response.headers.add("Access-Control-Allow-Origin", "http://localhost:8081")
        response.headers.add("Access-Control-Allow-Credentials", "true")
        response.headers.add("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        response.headers.add("Access-Control-Allow-Headers", "Content-Type")
        return response

    if request.method == 'GET':
        try:
            serializer = URLSafeTimedSerializer(app.secret_key)
            email = serializer.loads(token, salt='password-reset-salt', max_age=3600)
            return render_template_string('''
                <!doctype html>
                <html lang="en">
                  <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
                    <title>Reset Password</title>
                  </head>
                  <body>
                    <div class="container">
                      <h2>Reset Password for {{ email }}</h2>
                      <form action="" method="post">
                        <div class="form-group">
                          <label for="password">New Password</label>
                          <input type="password" class="form-control" id="password" name="password" required>
                        </div>
                        <button type="submit" class="btn btn-primary">Reset Password</button>
                      </form>
                    </div>
                  </body>
                </html>
            ''', email=email)
        except SignatureExpired:
            return jsonify({"success": False, "message": "The token is expired"}), 400
        except Exception as e:
            logging.error(f"Error processing password reset with token: {e}")
            return jsonify({"success": False, "error": str(e)}), 500

    if request.method == 'POST':
        conn = None
        cursor = None
        try:
            serializer = URLSafeTimedSerializer(app.secret_key)
            password = request.form['password']
            email = serializer.loads(token, salt='password-reset-salt', max_age=3600)
            
            hashed_password = generate_password_hash(password)
            
            conn = mysql.connector.connect(**db_config)
            cursor = conn.cursor()
            
            cursor.execute("UPDATE UserLogins SET Password = %s WHERE Email = %s;", (hashed_password, email))
            conn.commit()
            
            return jsonify({"success": True}), 200
        
        except SignatureExpired:
            return jsonify({"success": False, "message": "The token is expired"}), 400
        except Exception as e:
            logging.error(f"Error processing password reset with token: {e}")
            return jsonify({"success": False, "error": str(e)}), 500

        finally:
            if cursor is not None:
                cursor.close()
            if conn is not None:
                conn.close()

@app.route('/reset-username', methods=['POST', 'OPTIONS'])
@cross_origin(origin='http://localhost:8081', supports_credentials=True)
def reset_username():
    if request.method == 'OPTIONS':
        response = app.make_default_options_response()
        response.headers.add("Access-Control-Allow-Origin", "http://localhost:8081")
        response.headers.add("Access-Control-Allow-Credentials", "true")
        response.headers.add("Access-Control-Allow-Methods", "POST, OPTIONS")
        response.headers.add("Access-Control-Allow-Headers", "Content-Type")
        return response

    if request.method == 'POST':
        conn = None
        cursor = None
        try:
            data = request.json
            email = data.get('Email')

            if not email:
                logging.error(f"Missing required field: email={email}")
                return jsonify({"success": False, "message": "Missing required field"}), 400

            conn = mysql.connector.connect(**db_config)
            cursor = conn.cursor(dictionary=True)
            
            # Fetch the user from the database
            cursor.execute("SELECT * FROM UserLogins WHERE Email = %s;", (email,))
            user = cursor.fetchone()
            
            if not user:
                logging.error("Invalid email")
                return jsonify({"success": False, "message": "Invalid email"}), 401
            
            # Generate a username reset token
            serializer = URLSafeTimedSerializer(app.secret_key)
            token = serializer.dumps(email, salt='username-reset-salt')

            # Send email with the reset link
            msg = Message('Reset Username Request', sender='ignitepasswordreset@outlook.com', recipients=[email])
            link = url_for('reset_username_with_token', token=token, _external=True)
            msg.body = f'Your username reset link is {link}'
            mail.send(msg)
            
            return jsonify({"success": True, "message": "Reset link sent"}), 200
        
        except mysql.connector.Error as err:
            logging.error(f"Database error: {err}")
            return jsonify({"success": False, "error": str(err)}), 500

        except Exception as e:
            logging.error(f"Error sending reset username link: {e}")
            return jsonify({"success": False, "error": str(e)}), 500

        finally:
            if cursor is not None:
                cursor.close()
            if conn is not None:
                conn.close()

@app.route('/reset-username/<token>', methods=['POST', 'GET', 'OPTIONS'])
@cross_origin(origin='http://localhost:8081', supports_credentials=True)
def reset_username_with_token(token):
    if request.method == 'OPTIONS':
        response = app.make_default_options_response()
        response.headers.add("Access-Control-Allow-Origin", "http://localhost:8081")
        response.headers.add("Access-Control-Allow-Credentials", "true")
        response.headers.add("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        response.headers.add("Access-Control-Allow-Headers", "Content-Type")
        return response

    if request.method == 'GET':
        try:
            serializer = URLSafeTimedSerializer(app.secret_key)
            email = serializer.loads(token, salt='username-reset-salt', max_age=3600)
            return render_template_string('''
                <!doctype html>
                <html lang="en">
                  <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
                    <title>Reset Username</title>
                  </head>
                  <body>
                    <div class="container">
                      <h2>Reset Username for {{ email }}</h2>
                      <form id="reset-username-form">
                        <div class="form-group">
                          <label for="new-username">New Username</label>
                          <input type="text" class="form-control" id="new-username" name="new-username" required>
                        </div>
                        <button type="submit" class="btn btn-primary">Reset Username</button>
                      </form>
                    </div>
                    <script>
                      document.getElementById('reset-username-form').addEventListener('submit', function(event) {
                        event.preventDefault();
                        const newUsername = document.getElementById('new-username').value;
                        fetch(window.location.pathname, {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json'
                          },
                          body: JSON.stringify({ newUsername })
                        })
                        .then(response => response.json())
                        .then(data => {
                          if (data.success) {
                            alert('Username reset successfully.');
                          } else {
                            alert('Error resetting username: ' + data.message);
                          }
                        })
                        .catch(error => {
                          console.error('Error:', error);
                        });
                      });
                    </script>
                  </body>
                </html>
            ''', email=email)
        except SignatureExpired:
            return jsonify({"success": False, "message": "The token is expired"}), 400
        except Exception as e:
            logging.error(f"Error processing username reset with token: {e}")
            return jsonify({"success": False, "error": str(e)}), 500

    if request.method == 'POST':
        conn = None
        cursor = None
        try:
            data = request.json
            new_username = data.get('newUsername')
            serializer = URLSafeTimedSerializer(app.secret_key)
            email = serializer.loads(token, salt='username-reset-salt', max_age=3600)
            
            if not new_username:
                logging.error(f"Missing required field: newUsername={new_username}")
                return jsonify({"success": False, "message": "Missing required field"}), 400

            conn = mysql.connector.connect(**db_config)
            cursor = conn.cursor(dictionary=True)
            
            # Update the username in the database
            cursor.execute("UPDATE UserLogins SET Username = %s WHERE Email = %s;", (new_username, email))
            conn.commit()
            
            return jsonify({"success": True}), 200
        
        except SignatureExpired:
            return jsonify({"success": False, "message": "The token is expired"}), 400
        except mysql.connector.Error as err:
            logging.error(f"Database error: {err}")
            return jsonify({"success": False, "error": str(err)}), 500

        except Exception as e:
            logging.error(f"Error processing username reset: {e}")
            return jsonify({"success": False, "error": str(e)}), 500

        finally:
            if cursor is not None:
                cursor.close()
            if conn is not None:
                conn.close()


@app.route('/api/user/<username>', methods=['GET', 'OPTIONS'])
@cross_origin(origin='http://localhost:8081', supports_credentials=True)
def get_user_data(username):
    if request.method == 'OPTIONS':
        response = app.make_default_options_response()
        response.headers.add("Access-Control-Allow-Origin", "http://localhost:8081")
        response.headers.add("Access-Control-Allow-Credentials", "true")
        response.headers.add("Access-Control-Allow-Methods", "GET, OPTIONS")
        response.headers.add("Access-Control-Allow-Headers", "Content-Type")
        return response

    if request.method == 'GET':
        try:
            # Connect to the database
            conn = mysql.connector.connect(**db_config)
            cursor = conn.cursor(dictionary=True)

            # Fetch user data based on the provided username
            cursor.execute("SELECT * FROM UserLogins WHERE Username = %s", (username,))
            user_data = cursor.fetchone()

            if user_data:
                return jsonify(user_data), 200
            else:
                return jsonify({"error": "User not found"}), 404

        except mysql.connector.Error as err:
            print(f"Database error: {err}")
            return jsonify({"error": str(err)}), 500

        finally:
            cursor.close()
            conn.close()


@app.route('/submitSurvey', methods=['POST'])
@cross_origin(origin='http://localhost:8081', supports_credentials=True)  # Ensure correct origin
def submit_survey():
    try:
        survey_data = request.json  # Expecting surveyData to be a JSON object
        app.logger.debug(survey_data)

        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        # Insert survey data into the database
        username = survey_data['Username']
        age = survey_data['age']
        gender = survey_data['gender']
        fitness_goal = survey_data['fitnessGoal']
        body_type = survey_data['bodyType']
        fitness_level = survey_data['fitnessLevel']
        activity_level = survey_data['activityLevel']
        activities = survey_data['activities']
        challenges = survey_data['challenges']
        survey_id = 0

        # Fetch GenderID
        cursor.execute("SELECT GenderID FROM Genders WHERE GenderName = %s;", (gender,))
        gender_id_row = cursor.fetchone()
        gender_id = gender_id_row[0] if gender_id_row else None

        # Fetch FitnessGoalID
        cursor.execute("SELECT FitnessGoalID FROM FitnessGoals WHERE FitnessGoalName = %s;", (fitness_goal,))
        fitness_goal_id_row = cursor.fetchone()
        fitness_goal_id = fitness_goal_id_row[0] if fitness_goal_id_row else None

        # Fetch BodyTypeID
        cursor.execute("SELECT BodyTypeID FROM BodyTypes WHERE BodyTypeName = %s;", (body_type,))
        body_type_id_row = cursor.fetchone()
        body_type_id = body_type_id_row[0] if body_type_id_row else None

        # Fetch FitnessLevelID
        cursor.execute("SELECT FitnessLevelID FROM FitnessLevels WHERE FitnessLevelName = %s;", (fitness_level,))
        fitness_level_id_row = cursor.fetchone()
        fitness_level_id = fitness_level_id_row[0] if fitness_level_id_row else None

        # Fetch ActivityLevelID
        cursor.execute("SELECT ActivityLevelID FROM ActivityLevels WHERE ActivityLevelName = %s;", (activity_level,))
        activity_level_id_row = cursor.fetchone()
        activity_level_id = activity_level_id_row[0] if activity_level_id_row else None


        cursor.execute("SELECT UserID FROM UserLogins WHERE Username = %s", (username,))
        user_id_row = cursor.fetchone()
        user_id = user_id_row[0] if user_id_row else None

        if user_id:
            # Execute the query to fetch the survey ID
            cursor.execute("SELECT SurveyID FROM UserInfo WHERE UserID = %s", (user_id,))
            survey_id_row = cursor.fetchone()
            survey_id = survey_id_row[0] if survey_id_row else None

            if not survey_id:
                # Insert new survey info if it doesn't exist
                cursor.execute(
                    "INSERT INTO SurveyInfo (user_id, gender_id, fitness_goal_id, body_type_id, fitness_level_id, activity_level_id) "
                    "VALUES (%s, %s, %s, %s, %s, %s)",
                    (user_id, gender_id, fitness_goal_id, body_type_id, fitness_level_id, activity_level_id)
                )
            else:
                # Update existing survey info
                cursor.execute(
                    "UPDATE SurveyInfo SET gender_id = %s, fitness_goal_id = %s, body_type_id = %s, fitness_level_id = %s, activity_level_id = %s "
                    "WHERE UserID = %s",
                    (gender_id, fitness_goal_id, body_type_id, fitness_level_id, activity_level_id, user_id)
                )
        else:
            raise ValueError("User ID not found for the given username.")
                    
        
        # Insert challenges
        for challenge in challenges:
            cursor.execute("SELECT ChallengeID FROM Challenges WHERE ChallengeName = %s;", (challenge,))
            challenge_id_row = cursor.fetchone()
            challenge_id = challenge_id_row[0] if challenge_id_row else None
            if challenge_id:
                cursor.execute("INSERT INTO SurveyToChallenges (SurveyID, ChallengeID) VALUES (%s, %s)",
                               (survey_id, challenge_id)
                               )

        # Insert activities
        for activity in activities:
            cursor.execute("SELECT ActivityID FROM Activities WHERE ActivityName = %s;", (activity,))
            activity_id_row = cursor.fetchone()
            activity_id = activity_id_row[0] if activity_id_row else None
            if activity_id:
                cursor.execute("INSERT INTO SurveyToActivities (SurveyID, ActivityID) VALUES (%s, %s)",
                               (survey_id, activity_id)
                               )
            
        

        conn.commit()
        cursor.close()
        conn.close()

        return jsonify({"success": True}), 201

    except mysql.connector.Error as err:
        return jsonify({"success": False, "error": str(err)}), 500


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



@app.route('/api/logout', methods=['POST'])
@cross_origin(origin='http://localhost:8081', supports_credentials=True)  # Ensure correct origin
def logout():
    try:
        return jsonify({"success": True}), 200
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


@app.route('/api/token', methods=['POST', 'OPTIONS'])
@cross_origin(origin='http://localhost:8081', supports_credentials=True) 
def generate_token_route():
    if request.method == 'OPTIONS':
        response = app.make_default_options_response()
        response.headers.add("Access-Control-Allow-Origin", "http://localhost:8081")
        response.headers.add("Access-Control-Allow-Credentials", "true")
        response.headers.add("Access-Control-Allow-Methods", "GET, OPTIONS")
        response.headers.add("Access-Control-Allow-Headers", "Content-Type")
        return response
    if request.method == 'GET':
        username = identify_logged_in_user()
        if not username:
            return jsonify({'message': 'User not authenticated'}), 401
        user_data = get_user_data(username)
        token = create_access_token(identity=user_data)
        print(token)
        return jsonify({'token': token})
   

def identify_logged_in_user():
    
    return session.get('Username')

# Function to generate a token
def create_access_token(user_data):
    # Payload can include user information
    payload = {
        'username': user_data['Username'],
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)
    }

    # Generate the token
    token = jwt.encode(payload, app.config['SECRET_KEY'], algorithm='HS256')
    print(token)
    return token
def get_username(username):
    
    return {'username': username}

if __name__ == '__main__':
    app.run(debug=True)
