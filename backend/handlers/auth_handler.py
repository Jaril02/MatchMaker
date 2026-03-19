import tornado.web
import logging
from db import get_connection
import uuid
import json 

from handlers.base_handler import BaseHandler

class LoginHandler(BaseHandler):

    def post(self):
        try:    
            data = json.loads(self.request.body)

            email = data["email"]
            password = data["password"]


            if not email or not password:
                self.set_status(400)
                return self.write({
                    "status":"failed",
                    "message":"Email and Password is required"
                })

            conn = get_connection()
            cursor= conn.cursor(dictionary=True)

            cursor.execute(""" 
                Select * from users where email=%s   
            """,(email,))
            user=cursor.fetchone()

            if not user or user["password"] != password:
                self.set_status(401)
                return self.write({
                    "status": "failed",
                    "message": "Invalid credentials"
                })
            
            token = str(uuid.uuid4())
            user.pop("password",None)
            self.write({
                "message": "Login success",
                "token": token,
                "user": user
            })

        except Exception as e:
            logging.error(f"Login Error: {str(e)}")
            self.set_status(500)
            return self.write({
                "status":"failed",
                "message":"Internal server error"
            })