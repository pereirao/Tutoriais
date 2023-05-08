import pyodbc

cnxn = pyodbc.connect('DRIVER={ODBC Driver 17 for SQL Server};SERVER=(LocalDB)\\MSSQLLocalDB;DATABASE=PyODBC;')
cursor = cnxn.cursor()
rows = cursor.execute("select * from employees").fetchall()

for row in rows:
    print("*".join([str(c) for c in row]))
