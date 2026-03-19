from db import get_connection

conn = get_connection()

if conn.is_connected():
    print("database connected")
else:
    print("database is not connected")