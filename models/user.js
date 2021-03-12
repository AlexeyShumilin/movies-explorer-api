const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Required field'],
        minlength: [2, 'must be at least 2 characters'],
        maxlength: [30, 'must be at least 30 characters'],
    },
    password: {
        type: String,
        required: [true, 'Required field'],
        select: false,
    },
    email: {
        type: String,
        required: [true, 'Required field'],
        unique: true,
        validate: {
            validator(v) {
                return validator.isEmail(v);
            },
            message: 'Incorrect email format',
        },
    },
});

userSchema.statics.findUserByCredentials = function findUser(email, password) {
    return this.findOne({email}).select('+password')
        .then((user) => {
            if (!user) {
                return Promise.reject(new Error('Incorrect email or password'));
            }

            return bcrypt.compare(password, user.password)
                .then((matched) => {
                    if (!matched) {
                        return Promise.reject(new Error('Incorrect email or password'));
                    }
                    return user;
                });
        });
};

module.exports = mongoose.model('user', userSchema);
