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

    """returns C followed by <text> content"""
    text = text.replace("_", " ")
    return "C %s" % text


@app.route('/python', strict_slashes=False)
@app.route('/python/<string:text>', strict_slashes=False)
def python_text(text="is cool"):

    """returns Python is cool"""
    text = text.replace("_", " ")
    return "Python %s" % text


if __name__ == "__main__":
    app.run(host="0.0.0.0")
