from flask import Flask, request, jsonify, render_template, redirect,Response, json, session
from flask_cors import CORS, cross_origin
from flask_session import Session
from tempfile import mkdtemp
from helpers import login_required
import sqlite3


app = Flask(__name__)
CORS(app)

app.config["TEMPLATES_AUTO_RELOAD"] = True

# Configure session to use filesystem (instead of signed cookies)
app.config["SESSION_FILE_DIR"] = mkdtemp()
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)


DATABASE = 'restaurant.db'

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':

        name = request.form['name']
        psw = request.form['psw']

        conn = sqlite3.connect(DATABASE)
        cur = conn.cursor()

        cur.execute('SELECT name, pw FROM waiters WHERE name=?', [name]) 
        dbusr = cur.fetchall()

        print(dbusr[0][1])
        if len(dbusr) != 1 or str(dbusr[0][1]) != psw:
            return redirect('/login')


        session["user_id"] = dbusr[0][0]
        return redirect("/")

   
    if "user_id" in session:
            return redirect('/')
    return render_template('login.html')




@app.route('/')
#login_required
def index():
    return render_template('index.html')

@app.route('/order')
def orderRedirect():
    return redirect('/')



@app.route('/item' , methods=['GET'])
#login_required
def getItemList():
    conn = sqlite3.connect(DATABASE)
    cur = conn.cursor()
    cur.execute('SELECT * FROM items')
    items = cur.fetchall()
    

    dictresp = []
    for i in items:
        x = {}
        x["id"] = i[0]
        x["name"] = i[1]
        x["price"] = i[2]
        dictresp.append(x)

    return jsonify(dictresp)

@app.route('/waiter' , methods=['GET'])
@login_required
def getWaiter():


    return jsonify(session["user_id"])

@app.route('/add-order', methods=['POST', 'OPTIONS'])
@cross_origin(origin='*', headers=['Content-Type','Authorization'])
@login_required
def addOrder(  ):
    
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
#login_required
def getOrders():

    try:
        conn = sqlite3.connect(DATABASE)
        cur = conn.cursor()
        cur.execute('SELECT * FROM orders') 
        orders_q = cur.fetchall()
        
        dictresp = []
        print(orders_q)
        for row in orders_q:
            x = {}
            x["orderNo"] = row[1]
            x["customer"] = row[2]
            x["waiter"] = row[3]
            x["orderType"] = row[4]
            x["time"] = row[6]
            dictresp.append(x)


        return jsonify(dictresp)
        
    except:
        print("Error getting orders from database")
    finally:
        conn.close()

    return "xd"

app.run(host= '0.0.0.0', debug=True,port="5000")
	
