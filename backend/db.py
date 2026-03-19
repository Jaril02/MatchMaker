import mysql.connector

def get_connection():
    conn=mysql.connector.connect(
        host="localhost",
        user="root",
        password="jaril123",
        database= "matchmaking"
    )
    return conn