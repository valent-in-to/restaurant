from flask import Flask, request, jsonify, render_template, redirect,Response, json, session
from flask_cors import CORS, cross_origin
import sqlite3
from helpers import query, querym

from flask_jwt_extended import create_access_token, JWTManager


app = Flask(__name__)
CORS(app)
jwt = JWTManager(app) 
#app.config["TEMPLATES_AUTO_RELOAD"] = True
app.config['SECRET_KEY'] = 'elgaty'


DATABASE = 'restaurant.db'

@app.route('/login', methods=[ 'POST'])
@cross_origin()
def login():
    if request.method == 'POST':

        data = request.json
        name = data["username"]
        psw = data["password"]

        conn = sqlite3.connect(DATABASE)
        cur = conn.cursor()

        cur.execute('SELECT name, pw FROM waiters WHERE name=?', [name]) 
        dbusr = cur.fetchone()
        conn.close()
  
        
        if dbusr[0] != name:
            return "usuario no encontrado", 401
            
        if str(dbusr[1]) != psw:
            return "contraseña incorrecta", 401
            

        token = create_access_token(identity={'name': name})
        

        
        return jsonify({"token": token}), 200
        

   
    if "user_id" in session:
            return redirect('/')
    return render_template('login.html')

#RUTA DE REGISTRO

@app.route('/signup', methods=['POST'])
def register():

    try:
        data = request.json

        ARGS = [ data["username"], data["password"] ]

        conn = sqlite3.connect(DATABASE)
        cur = conn.cursor()

        cur.executemany("INSERT INTO waiters(name, pw) VALUES(?,?)", (ARGS,)) 
        conn.commit()
        conn.close()
    except: 

        return "error en registro, posiblemente el nombre ya existe", 400
    
    resp = jsonify(success=True)
    return resp


@app.route('/')

def index():
    return render_template('index.html')


@app.route('/item' , methods=['GET'])

def getItemList():
    conn = sqlite3.connect(DATABASE)
    cur = conn.cursor()
    cur.execute('SELECT * FROM items')
    items = cur.fetchall()
    conn.close()
    

    dictresp = []
    for i in items:
        x = {}
        x["id"] = i[0]
        x["name"] = i[1]
        x["price"] = i[2]
        dictresp.append(x)

    return jsonify(dictresp)

@app.route('/waiter' , methods=['GET'])

def getWaiter():
    return jsonify("papu")


@app.route('/add-order', methods=['POST', 'OPTIONS'])
@cross_origin(origin='*', headers=['Content-Type','Authorization'])
def addOrder():
    
    data = json.loads(request.data)

    if not data:
        return("error")

    orders_var = [
        int(data["orderNo"]),
        str(data["customerName"]),
        str(data["waiter"]),
        int(data["orderType"])
    ]

    order_items_var = []
    for i in data["orderItems"]:
        x = (i["orderId"], i["itemId"], i["amount"])
        order_items_var.append(x)

    try:
        conn = sqlite3.connect(DATABASE)
        cur = conn.cursor()
        cur.executemany('INSERT INTO orders("orderNo","table","waiter","orderType") VALUES(?,?,?,?)', (orders_var,)) 
        cur.executemany('INSERT INTO orderItems VALUES(?,?,?)', (order_items_var),)
        conn.commit()
        
    except:
        print("Error uploading order to database")
    finally:
        conn.close()

    
    resp = jsonify(success=True)
    return resp

@app.route('/orders', methods=['GET'])
@cross_origin(origin='*', headers=['Content-Type','Authorization'])

def getOrders():

    try:
        conn = sqlite3.connect(DATABASE)
        cur = conn.cursor()
        cur.execute('SELECT * FROM orders ORDER BY id DESC') 
        orders_q = cur.fetchall()
        
        dictresp = []
      
        for row in orders_q:
            x = {}
            x["orderNo"] = row[1]
            x["customer"] = row[2]
            x["waiter"] = row[3]
            x["orderType"] = row[4]
            x["time"] = row[6][:5]
            dictresp.append(x)


        return jsonify(dictresp)
        
    except:
        print("Error getting orders from database")
    finally:
        conn.close()

    return "xd"

if __name__ == "__main__":
    app.run(host= '0.0.0.0', debug=True,port="5000")

	
