from .app import db
from flask_sqlalchemy import sqlalchemy
from FLASK import flask

#################################################
# Flask Setup
#################################################

app = Flask(__name__)

#################################################
# Database Setup
#################################################

app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get('DATABASE.url', ' ') or "sqlite:///db/bellybutton.sqlite"
db = SQLAlchemy(app)


class belly_buttom_biodiversity(db.Model):
    __tablename__ = 'Belly Button Biodiversity'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64))
    lat = db.Column(db.Float)
    lon = db.Column(db.Float)

    def __repr__(self):
        return '<Belly Button Metadata %r>' % (self.name)