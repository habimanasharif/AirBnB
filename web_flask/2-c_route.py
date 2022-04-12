#!/usr/bin/python3
""" a script that starts a Flask web application:"""
from flask import Flask

app = Flask(__name__)


@app.route('/', strict_slashes=False)
def hello_HBNH():
    """returns Hello HBNB"""
    greeting = "Hello HBNB!"
    return greeting


@app.route('/hbnb', strict_slashes=False)
def hbnb():
    """returns HBNB"""
    display = "HBNB"
    return dispay


@app.route('/c/<string:text>', strict_slashes=False)
def c_text(text):
    """prints C followed by <text> content"""
    text = text.replace("_", " ")
    return "C %s" % text


if __name__ == "__main__":
    app.run(host="0.0.0.0")
