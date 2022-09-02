const {Router} = require('express');
const { getUsers, register, login, protected, logout, getProjects, getBugs, newProject, newBug, deleteBug, updateUserEmail, updateUserPassword, addBugComment, getBugComments, deleteComment, deleteProject} = require('../controllers/auth')
const {validationMiddleware} = require('../middlewares/validations-middleware')
const {registerValidation, loginValidation, passwordsMatch, emailsMatch, updateEmail} = require('../validators/auth')
const router = Router();
const { userAuth } = require('../middlewares/auth-middleware')




router.get('/dashboard/get-bug-comments', getBugComments)
router.get('/dashboard/get-users', getUsers)
router.get('/protected', userAuth, protected)
router.get('/logout', logout)
router.get('/get-projects', getProjects)
router.get('/get-bugs', getBugs)
router.post('/register', registerValidation, validationMiddleware, register)
router.post('/login', loginValidation, validationMiddleware, login)
router.post('/dashboard/new-project', newProject)
router.post('/dashboard/new-bug', newBug)
router.delete('/dashboard/posts/:id', deleteBug)
router.delete('/dashboard/delete-comment/:id', deleteComment)
router.delete('/dashboard/delete-project/:id', deleteProject)
router.put('/dashboard/update-email', loginValidation, updateEmail, emailsMatch, validationMiddleware, updateUserEmail, login)
router.put('/dashboard/update-password', loginValidation, passwordsMatch, validationMiddleware, updateUserPassword)
router.post('/dashboard/add-bug-comment', addBugComment)
module.exports = router;