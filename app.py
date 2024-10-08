import random
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

@app.route('/')
def home():
    return "Hello, World!"

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
        cursor = None
        conn = None
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
            if cursor is not None:
                cursor.close()
            if conn is not None:
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

@app.route('/submitSurvey/<username>', methods=['POST', 'GET', 'OPTIONS'])
@cross_origin(origin='http://localhost:8081', supports_credentials=True)
def submit_survey(username):


    if request.method == 'OPTIONS':
        response = app.make_default_options_response()
        response.headers.add("Access-Control-Allow-Origin", "http://localhost:8081")
        response.headers.add("Access-Control-Allow-Credentials", "true")
        response.headers.add("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        response.headers.add("Access-Control-Allow-Headers", "Content-Type")
        return response
    
    if request.method == 'POST':
        try:
            survey_data = request.json  # Expecting surveyData to be a JSON object

            conn = mysql.connector.connect(**db_config)
            cursor = conn.cursor()

            # Insert survey data into the database
            username = username
            gender = survey_data['gender']
            fitness_goal = survey_data['fitnessGoal']
            body_type = survey_data['bodyType']
            fitness_level = survey_data['fitnessLevel']
            activity_level = survey_data['activityLevel']
            activities = survey_data['activities']
            challenges = survey_data['challenges']
            survey_id = 0

            app.logger.debug("Received survey data for user: %s", username)
            app.logger.debug("Gender: %s, Fitness Goal: %s, Body Type: %s, Fitness Level: %s, Activity Level: %s, Activities: %s, Challenges: %s", 
                             gender, fitness_goal, body_type, fitness_level, activity_level, activities, challenges)

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

            # Fetch UserInfoID
            cursor.execute("SELECT UserInfoID FROM UserInfo WHERE UserID = %s", (user_id,))
            user_info_id_row = cursor.fetchone()
            user_info_id = user_info_id_row[0] if user_info_id_row else None

            if user_info_id:
                # Execute the query to fetch the survey ID
                cursor.execute("SELECT SurveyID FROM UserInfo WHERE UserInfoID = %s", (user_info_id,))
                survey_id_row = cursor.fetchone()
                survey_id = survey_id_row[0] if survey_id_row else None

                if survey_id is None:
                    # Insert new survey info if it doesn't exist
                    cursor.execute(
                        "INSERT INTO SurveyInfo (UserID, GenderID, FitnessGoalID, BodyTypeID, FitnessLevelID, ActivityLevelID) "
                        "VALUES (%s, %s, %s, %s, %s, %s) RETURNING SurveyID",
                        (user_info_id, gender_id, fitness_goal_id, body_type_id, fitness_level_id, activity_level_id)
                    )
                    survey_id = cursor.fetchone()[0]  # Fetch the newly inserted survey ID
                    app.logger.debug("Inserted new survey info for user ID: %s", user_id)
    
                    cursor.execute("UPDATE UserInfo SET SurveyID = %s WHERE UserInfoID = %s", (survey_id, user_info_id))
                    
                else: 
                    # Update existing survey info
                    cursor.execute(
                        "UPDATE SurveyInfo SET GenderID = %s, FitnessGoalID = %s, BodyTypeID = %s, FitnessLevelID = %s, ActivityLevelID = %s "
                        "WHERE SurveyID = %s",
                        (gender_id, fitness_goal_id, body_type_id, fitness_level_id, activity_level_id, survey_id)
                    )
                    app.logger.debug("Updated survey info for user ID: %s", user_id)
                    cursor.fetchall()
            else:
                raise ValueError("User ID not found for the given username.")
                        
            # # Insert challenges
            # for challenge in challenges:
            #     cursor.execute("SELECT ChallengeID FROM Challenges WHERE ChallengeName = %s;", (challenge,))
            #     challenge_id_row = cursor.fetchone()
            #     challenge_id = challenge_id_row[0] if challenge_id_row else None
            #     if challenge_id:
            #         cursor.execute("INSERT INTO SurveyToChallenges (SurveyID, ChallengeID) VALUES (%s, %s)",
            #                     (survey_id, challenge_id)
            #                     )
            #         app.logger.debug("Inserted challenge ID: %s for survey ID: %s", challenge_id, survey_id)

            # # Insert activities
            # for activity in activities:
            #     cursor.execute("SELECT ActivityID FROM Activities WHERE ActivityName = %s;", (activity,))
            #     activity_id_row = cursor.fetchone()
            #     activity_id = activity_id_row[0] if activity_id_row else None
            #     if activity_id:
            #         cursor.execute("INSERT INTO SurveyToActivities (SurveyID, ActivityID) VALUES (%s, %s)",
            #                     (survey_id, activity_id)
            #                     )
            #         app.logger.debug("Inserted activity ID: %s for survey ID: %s", activity_id, survey_id)

            conn.commit()
            cursor.close()
            conn.close()

            return jsonify({"success": True}), 201

        except mysql.connector.Error as err:
            return jsonify({"success": False, "error": str(err)}), 500
        
@app.route('/api/workouts/<username>', methods=['GET', 'POST', 'OPTIONS'])
@cross_origin(origin='http://localhost:8081', supports_credentials=True)
def get_workouts(username):
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        # Fetch the UserID
        cursor.execute("SELECT UserID FROM UserLogins WHERE Username = %s;", (username,))
        user_id_row = cursor.fetchone()
        if not user_id_row:
            app.logger.error(f"User '{username}' not found.")
            return jsonify({"error": "User not found"}), 404
        user_id = user_id_row[0]
        app.logger.debug(f"User ID: {user_id}")

        # Fetch the UserInfoID
        cursor.execute("SELECT UserInfoID FROM UserInfo WHERE UserID = %s;", (user_id,))
        user_info_id_row = cursor.fetchone()
        if not user_info_id_row:
            app.logger.error(f"User info for UserID '{user_id}' not found.")
            return jsonify({"error": "User info not found"}), 404
        user_info_id = user_info_id_row[0]
        app.logger.debug(f"User Info ID: {user_info_id}")

        if request.method == "OPTIONS":
            response = app.make_default_options_response()
            response.headers.add("Access-Control-Allow-Origin", "http://localhost:8081")
            response.headers.add("Access-Control-Allow-Credentials", "true")
            response.headers.add("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
            response.headers.add("Access-Control-Allow-Headers", "Content-Type")
            return response

        elif request.method == "GET":
            # Fetch SurveyID
            cursor.execute("SELECT SurveyID FROM UserInfo WHERE UserID = %s;", (user_id,))
            survey_id_row = cursor.fetchone()
            if not survey_id_row:
                app.logger.error(f"Survey ID for UserID '{user_id}' not found.")
                return jsonify({"error": "Survey ID not found"}), 404
            survey_id = survey_id_row[0]
            app.logger.debug(f"Survey ID: {survey_id}")

            # Fetch BodyTypeID and FitnessGoalID from SurveyInfo
            cursor.execute(
                """
                SELECT 
                    BodyTypes.BodyTypeName, 
                    FitnessGoals.FitnessGoalName 
                FROM 
                    SurveyInfo 
                JOIN 
                    BodyTypes ON SurveyInfo.BodyTypeID = BodyTypes.BodyTypeID 
                JOIN 
                    FitnessGoals ON SurveyInfo.FitnessGoalID = FitnessGoals.FitnessGoalID 
                WHERE 
                    SurveyInfo.SurveyID = %s;
                """,
                (survey_id,)
            )
            survey_info_row = cursor.fetchone()
            if not survey_info_row:
                app.logger.error(f"Survey info for SurveyID '{survey_id}' not found.")
                return jsonify({"error": "Survey info not found"}), 404
            body_type_name = survey_info_row[0]
            fitness_goal_name = survey_info_row[1]
            app.logger.debug(f"BodyType: {body_type_name}, FitnessGoal: {fitness_goal_name}")

            # Fetch full workout details based on BodyTypeID and FitnessGoalID
            cursor.execute(
                """
                SELECT 
                    Workouts.WorkoutID,
                    Workouts.WorkoutName,
                    Workouts.WorkoutDescription,
                    Workouts.WorkoutSets,
                    Workouts.WorkoutReps,
                    Workouts.WorkoutDuration
                FROM 
                    Workouts 
                JOIN 
                    BodyTypes ON Workouts.BodyTypeID = BodyTypes.BodyTypeID 
                JOIN 
                    FitnessGoals ON Workouts.FitnessGoalID = FitnessGoals.FitnessGoalID 
                WHERE 
                    BodyTypes.BodyTypeName = %s AND FitnessGoals.FitnessGoalName = %s;
                """,
                (body_type_name, fitness_goal_name)
            )
            workouts = cursor.fetchall()
            if not workouts:
                app.logger.error(f"No workouts found for BodyType '{body_type_name}' and FitnessGoal '{fitness_goal_name}'.")
                return jsonify({"error": "No workouts found"}), 404
            app.logger.debug(f"Workouts: {workouts}")

            workout_details = []
            for workout in workouts:
                workout_id = workout[0]
                workout_detail = {
                    "WorkoutID": workout[0],
                    "WorkoutName": workout[1],
                    "Description": workout[2],
                    "Sets": workout[3],
                    "Reps": workout[4],
                    "Duration": workout[5],
                }

                # Fetch exercises for each workout
                cursor.execute(
                    """
                    SELECT 
                        Exercises.ExerciseID,
                        Exercises.ExerciseName,
                        Exercises.Sets,
                        Exercises.Reps,
                        Exercises.ExerciseDescription
                    FROM 
                        Exercises
                    JOIN 
                        WorkoutsExercises ON Exercises.ExerciseID = WorkoutsExercises.ExerciseID
                    WHERE 
                        WorkoutsExercises.WorkoutID = %s
                    LIMIT 5;
                    """,
                    (workout_id,)
                )
                exercises = cursor.fetchall()
                if not exercises:
                    app.logger.debug(f"No exercises found for WorkoutID '{workout_id}'.")
                else:
                    app.logger.debug(f"Exercises for Workout {workout_id}: {exercises}")

                exercise_details = [
                    {
                        "ExerciseID": exercise[0],
                        "ExerciseName": exercise[1],
                        "Sets": exercise[2],
                        "Reps": exercise[3],
                        "Description": exercise[4],
                    }
                    for exercise in exercises
                ]

                # Combine workout and exercise details
                workout_detail["Exercises"] = exercise_details
                workout_details.append(workout_detail)
                
            return jsonify(workout_details), 200

        elif request.method == "POST":
            cursor.execute("SELECT WorkoutsCompleted FROM UserLogins WHERE UserID = %s;", (user_id,))
            app.logger.debug(f"User ID: {user_id}")
            num_complete = cursor.fetchone()

            if num_complete:
                num_complete = num_complete[0] + 1

                cursor.execute("UPDATE UserLogins SET WorkoutsCompleted = %s WHERE UserID = %s;", (num_complete, user_id))
                conn.commit()
                app.logger.debug(f"Workouts completed updated for user ID: {user_id}")
                return jsonify({"message": "Workouts completed updated successfully"}), 200
            else:
                return jsonify({"error": "User info not found"}), 404

    except mysql.connector.Error as err:
        app.logger.error(f"Database error: {err}")
        return jsonify({"error": str(err)}), 500

    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()

# NOT IMPLEMENTED
@app.route('/api/workouts/<workout_id>/exercises/<exercise_id>', methods=['DELETE', 'OPTIONS'])
@cross_origin(origin='http://localhost:8081', supports_credentials=True)
def delete_exercise(workout_id, exercise_id):
    try:
        if request.method == 'OPTIONS':
            response = app.make_default_options_response()
            response.headers.add("Access-Control-Allow-Origin", "http://localhost:8081")
            response.headers.add("Access-Control-Allow-Credentials", "true")
            response.headers.add("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
            response.headers.add("Access-Control-Allow-Headers", "Content-Type")
            return response
        
        if request.method == 'DELETE':

            if not workout_id.isdigit() or not exercise_id.isdigit():
                return jsonify({"success": False, "error": "Invalid workout_id or exercise_id"}), 400

            conn = mysql.connector.connect(**db_config)
            cursor = conn.cursor()

            # Delete the exercise
            cursor.execute("DELETE FROM WorkoutsExercises WHERE ExerciseID = %s;", (exercise_id))
            conn.commit()
            app.logger.debug(f"Deleted exercise ID: {exercise_id}")

        conn.close()
        return jsonify({"success": True}), 200

    except mysql.connector.Error as err:
        app.logger.error(f"Database error: {err}")
        return jsonify({"success": False, "error": str(err)}), 500

# NOT IMPLEMENTED
@app.route('/api/exercises/random', methods=['PUT', 'OPTIONS'])
def get_random_exercise(exercise_id):
    try:
        if request.method == 'OPTIONS':
            response = app.make_default_options_response()
            response.headers.add("Access-Control-Allow-Origin", "http://localhost:8081")
            response.headers.add("Access-Control-Allow-Credentials", "true")
            response.headers.add("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
            response.headers.add("Access-Control-Allow-Headers", "Content-Type")
            return response
        
        if request.method == 'PUT':
            # Query all exercises from the database
            conn = mysql.connector.connect(**db_config)
            cursor = conn.cursor()

            exercise_id = request.args.get('exercise_id')

            # Fetch exercises from the database
            cursor.execute("SELECT * FROM Exercises", (exercise_id))
            exercises = cursor.fetchall()
            conn.commit()

            if not exercises:
                return jsonify({"error": "No exercises found"}), 404

            # Randomly select one exercise
            random_exercise = random.choice(exercises)

            # Serialize the exercise data to JSON
            exercise_data = {
                "id": random_exercise.id,
                "ExerciseName": random_exercise.ExerciseName,
                "Sets": random_exercise.Sets,
                "Reps": random_exercise.Reps,
                "Description": random_exercise.Description
            }
            conn.close()
            cursor.close()
            return jsonify(exercise_data), 200
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/logout', methods=['POST'])
@cross_origin(origin='http://localhost:8081', supports_credentials=True)  # Ensure correct origin
def logout():
    if request.method == 'POST':
        try:
            return jsonify({"success": True}), 200
        except Exception as e:
            return jsonify({"success": False, "error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
