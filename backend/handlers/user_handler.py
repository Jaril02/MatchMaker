
import json
import tornado.web
from db import get_connection
from handlers.base_handler import BaseHandler

class RegisterHandler(BaseHandler):

    def post(self):
        try:

            data = json.loads(self.request.body)

            name = data["name"]
            email = data["email"]
            password = data["password"]
            age = data["age"]
            gender = data["gender"]
            interests = data["interests"]

            conn = get_connection()
            cursor = conn.cursor()

            query = """
            INSERT INTO users (name,email,password,age,gender,interests)
            VALUES (%s,%s,%s,%s,%s,%s)
            """

            cursor.execute(query,(name,email,password,age,gender,interests))

            conn.commit()

            self.write({"message":"User registered"})
        

        
            

        except Exception as e:
            self.set_status(500)
            self.write({
                "status":"error",
                "message": str(e)
            })


        