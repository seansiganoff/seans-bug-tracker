const { check } = require('express-validator');
const db = require('../db');
const {compare} = require('bcryptjs');



//////////////////////////////////////////////////////////////////  password validation  /////////////////////////////////////////////////////////////

const password = check('password').custom(async (password, {req}) => {
    if(password !== req.body.confirmPassword) {
        throw new Error('Password Does Not Match Confirm Password!')
    }}).isLength({min: 6, max: 15}).withMessage('Password has to be between 6 and 15 characters.')

    
//email
const email = check('email')
    .isEmail()
    .withMessage('Please provide a valid email.');




////////////////////////////////////////////////////////////////// email validation /////////////////////////////////////////////////////////////
const updateEmail = check('email').custom(async (email, {req}) => {
    const {password, new_email, confirm_email} = req.body;
    const user = await db.query('select * from users where email = $1', [new_email]);

console.log(user.rows[0])
    if(!email || !password || !new_email || !confirm_email) {
        throw new Error('All fields must be filled out!')
    }

    if(confirm_email !== new_email) {
        throw new Error('Confirm email does not match!')
    }
    if(user.rows[0]) {
        throw new Error('A user with that email already exists!')
    }
});


const emailExists = check('email').custom(async (email, {req}) => {

    if(!email || !req.body.confirmEmail) {
        throw new Error('All Fields Must Be Filled Out!')
    }

    if(email !== req.body.confirmEmail) throw new Error('Email Does Not Match Confirm Email!')
    const {rows} = await db.query('SELECT * FROM users WHERE email = $1', [email])
    if(rows.length) {
        throw new Error('The Email You Entered Is Already Taken!')
    }
})

const emailsMatch = check('new_email').custom(async (new_email, {req}) => {
    if(new_email !== req.body.confirm_email) {
        throw new Error('Email Does Not Match Confirm Email!')
    }
})

const passwordsMatch = check('new_password').custom(async (new_password, {req}) => {
    if(new_password !== req.body.confirm_password) {
        throw new Error('Password Does Not Match Confirm Password!')
    }
}).isLength({min: 6, max: 15}).withMessage('Password must be between 6 and 15 characters.')




//////////////////////////////////////////////////////////////////  login validation  /////////////////////////////////////////////////////////////
const loginFieldsCheck = check('email').custom(async (value, {req}) => {
    
    const user = await db.query('select * from users where email = $1', [value])
    
    if(!value || !req.body.password) {
        throw new Error('All Fields Must Be Filled Out!')
    }

    if(!user.rows.length) {
        throw new Error('The Email You Entered Does Not Exist!')
    }

    const validPassword  = await compare(req.body.password, user.rows[0].password)
    
    if(!validPassword) {
        throw new Error('INVALID PASSWORD!')
    }
    req.user = user.rows[0]
})





module.exports = {
    registerValidation: [email, password, emailExists],
    loginValidation: [loginFieldsCheck],
    passwordsMatch,
    emailsMatch,
    updateEmail,
}