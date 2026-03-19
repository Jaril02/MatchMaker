from db import get_connection

from handlers.base_handler import BaseHandler

class SearchHandler(BaseHandler):

    def get(self):
        try:
            gender=self.get_argument("gender",None)

            conn=get_connection()
            cursor=conn.cursor(dictionary=True)

            if gender:
                cursor.execute(
                    "Select id,name,age,interests from users where gender=%s",(gender,)
                )
            else:
                cursor.execute(
                    "SELECT id, name, age, gender, interests FROM users"
                )
            users=cursor.fetchall()
            for user in users:
                if isinstance(user["interests"], str):
                    user["interests"] = user["interests"].split(",")
            
            self.write({
                "result":users
            })
        except Exception as e:
            self.write({
                "status":"Failed",
                "message":"Search not found"
            })


    def compatability(user1, user2):
        score = 0
        
        common = set(user1["interests"]) & set(user2["interests"])
        score += len(common) * 10
        
        age_diff = abs(user1["age"] - user2["age"])
        if age_diff <= 5:
            score += 30

        return score