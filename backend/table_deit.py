import sqlite3

connection = sqlite3.connect("./backend/amgdb.db")
cursor = connection.cursor()

cursor.execute("DROP TABLE attendance")
connection.commit()

cursor.close()
connection.close()
