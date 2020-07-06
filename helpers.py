import os
import requests
import urllib.parse

from flask import redirect, render_template, request, session
from functools import wraps

def login_required(f):
    """
    Decorate routes to require login.

    http://flask.pocoo.org/docs/1.0/patterns/viewdecorators/
    """
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if session.get("user_id") is None:
            return redirect("/login")
        return f(*args, **kwargs)
    return decorated_function

def query(db, query, arg):
    if not arg:
        arg = ""
    conn = sqlite3.connect(db)
    cur = conn.cursor()

    cur.execute(query, [arg]) 
    return cur.fetchall()

def querym(db, query, args):
    conn = sqlite3.connect(db)
    cur = conn.cursor()

    cur.executemany(query, (args,)) 
    return cur.fetchall()