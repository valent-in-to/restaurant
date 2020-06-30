import sqlite3

if __name__ == "__main__":
    
    while True:
        nombre = str(input('nombre: '))
        precio = int(input('precio: '))
        info = [(nombre, precio)]
        
        db = sqlite3.connect('restaurantdb')
        cur = db.cursor()

        cur.executemany('INSERT INTO items(name, price) VALUES(?,?)', info)
        db.commit()
        

        