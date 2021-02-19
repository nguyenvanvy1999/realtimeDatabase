const joi = require('joi'),
    custom = require('../setting/joi/custom');

const joiConfig = {
    general: {
        string: joi.string().required(),
        _id: custom.joiOID.objectId().required(),
    },
    user: {
        email: joi
            .string()
            .email({ minDomainSegments: 2, tlds: { allow: ['vn', 'com', 'net'] } })
            .required(),
        username: joi.string().alphanum().min(4).max(20).required(),
        password: joi
            .string()
            .regex(/^[a-zA-Z0-9]{3,30}$/)
            .min(4)
            .required(), //FIXME: none !@#
        role: joi.string().valid('Admin', 'User'),
        token: custom.joiJWT.jwt().required(),
    },
};

module.exports = joiConfig;