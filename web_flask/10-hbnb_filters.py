#!/usr/bin/python3
""" a script that starts a Flask web application:"""

from flask import Flask, render_template
from models import storage, classes
from models.state import State

app = Flask(__name__)
app.url_map.strict_slashes = False


@app.route('/hbnb_filters')
def filters():
    """ The 'states' route.
        Sends a corresponding template.
    """
    states = storage.all(classes["State"]).values()
    amenities = storage.all(classes["Amenity"]).values()
    return render_template('10-hbnb_filters.html', states=states,
                           amenities=amenities)


@app.teardown_appcontext
def teardown_appcontext(self):
    """ Hook that runs before app closes
    """
    storage.close()


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
