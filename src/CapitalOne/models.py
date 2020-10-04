from sqlalchemy import Integer, String, Boolean, DateTime, ARRAY, Column, ForeignKey
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

db = SQLAlchemy()


def setup_db(app):
    '''
    Connect to the database by reading database settings from the config file
    '''
    app.config.from_object('config')
    db.app = app
    db.init_app(app)
    migrate = Migrate(app, db)
    return db

# CustomerAccount = db.Table("customer_account",
#                         db.Column('id', db.Integer, primary_key=True),
#                         db.Column('account_id', db.String(120), db.ForeignKey('account.account_id', ondelete='cascade')),
                        # db.Column('co_customer_id', db.String(120), db.ForeignKey('customer.co_customer_id', ondelete='cascade'))
                    # )

class Customer(db.Model):
    '''
    Model that defines a customer and his attributes
    '''
    __tablename__ = 'customer'

    id = db.Column(db.Integer, db.Sequence("customer_id_seq"))
    first_name = db.Column(db.String(120), nullable=False)
    last_name = db.Column(db.String(120), nullable=False)
    full_name = db.Column(db.String(240), nullable=False)
    address_line_1 = db.Column(db.String(500), nullable=False)
    address_line_2 = db.Column(db.String(500), nullable=True)
    city = db.Column(db.String(120), nullable=False)
    state = db.Column(db.String(120), nullable=False)
    zip = db.Column(db.Integer, nullable=False)
    preferred_currency = db.Column(db.String(120), nullable=False)
    language = db.Column(db.String(120), nullable=False)
    co_customer_id = db.Column(db.String(120), nullable=False, primary_key=True)
    account = db.relationship("Account", cascade="all,delete")

    def __init__(self, full_name, address_line_1, address_line_2, city, state, country, zip, preferred_currency, language, co_customer_id):
        self.first_name = full_name.split(" ")[0]
        self.last_name = full_name.split(" ")[1]
        self.full_name = full_name
        self.address_line_1 = address_line_1
        self.address_line_2 = address_line_2
        self.city = city
        self.state = state
        self.zip = zip
        self.preferred_currency = preferred_currency
        self.language = language
        self.co_customer_id = co_customer_id

    def insert(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def format(self):
        return {
        'id': self.id,
        'full_name': self.full_name,
        'address_line_1': self.address_line_1,
        'address_line_2': self.address_line_2,
        'city': self.city,
        'state': self.state,
        'zip': self.zip,
        'preferred_currency': self.preferred_currency,
        'language': self.language,
        'co_customer_id': self.co_customer_id
        }

    def __repr__(self):
        return f'<Customer ID: {self.co_customer_id}, Customer Name: {self.full_name}>'


class Account(db.Model):
    '''
    Model that defines an account and its attributes
    '''
    __tablename__ = 'account'

    id = db.Column(db.Integer, db.Sequence("account_id_seq"))
    type = db.Column(db.String(120), nullable=False)
    nickname = db.Column(db.String(120), nullable=False)
    rewards = db.Column(db.Integer, nullable=False)
    balance = db.Column(db.Integer, nullable=False)
    co_customer_id = db.Column(db.String(120), db.ForeignKey("customer.co_customer_id", ondelete="CASCADE"))
    account_id = db.Column(db.String(120), primary_key=True)
    # customer = db.relationship("Customer", backref=db.backref("customer"))

    def __init__(self, type, nickname, rewards, balance, co_customer_id, account_id):
        self.type = type
        self.nickname = nickname
        self.rewards = rewards
        self.balance = balance
        self.co_customer_id = co_customer_id
        self.account_id = account_id

    def insert(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def format(self):
        return {
        'id': self.id,
        'type': self.type,
        'nickname': self.nickname,
        'rewards': self.rewards,
        'balance': self.balance,
        'co_customer_id': self.co_customer_id,
        'account_id': self.account_id
        }

    def __repr__(self):
        return f'<Account ID: {self.account_id}, Account customer id: {self.co_customer_id}>'

