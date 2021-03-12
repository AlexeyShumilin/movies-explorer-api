const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequestError = require('../errors/badrequest');
const UnauthorizedError = require('../errors/unauthorized');
const NotFoundError = require('../errors/notfounderr');
const ForbiddenError = require('../errors/forbidden');
const ConflictError = require('../errors/conflicterr');
const {JWT_SECRET} = require('../config');

const getMe = (req, res, next) => {
    const token = req.headers.authorization;

    const isAuthorized = (token) => {
        try {
            return jwt.verify(token, JWT_SECRET);
        } catch (err) {
            return false;
        }
    };

    if (!isAuthorized(token)) {
        throw new ForbiddenError('Access denied');
    }

    return User.findById(req.user._id)
        .then((user) => {
            if (!user) {
                throw new NotFoundError('wrong id');
            }
            return res.status(200).send({data: user});
        })
        .catch(next);
};

const updateMe = (req, res, next) => {
    const {name, mail} = req.body;
    const owner = req.user._id;

    return User.findOneAndUpdate(owner, {name, mail}, {new: true})
        .then((user) => {
            if (!user) {
                throw new NotFoundError('wrong id');
            }
            res.send(user);
        })
        .catch(next);
};

const login = (req, res, next) => {
    const {email, password} = req.body;

    return User.findUserByCredentials(email, password)
        .then((user) => {
            const token = jwt.sign({_id: user._id}, JWT_SECRET, {expiresIn: '7d'});

            return res.send({token});
        })
        .catch(() => {
            throw new UnauthorizedError('Incorrect email or password ');
        })
        .catch(next);
};

const createUser = (req, res, next) => {
    const {
        name, password, email,
    } = req.body;

    bcrypt.hash(password, 10)
        .then((hash) => User.create({
            name, password: hash, email,
        }))
        .then((user) => res.status(200).send({mail: user.email}))
        .catch((err) => {
            if (err.name === 'ValidationError' || err.name === 'CastError') {
                throw new BadRequestError('Data not valid');
            }
            if (err.name === 'MongoError' || err.code === '11000') {
                throw new ConflictError('email is already registered');
            }
        })
        .catch(next);
};

module.exports = {
    createUser, login, getMe, updateMe,
};
