const db = require('../db');
const {hash, compare} = require('bcrypt')
const {sign} = require('jsonwebtoken');
const {SECRET} = require('../constants');



//////////////////////////////////////////////////////////// fetch projects ////////////////////////////////////////////////////
exports.getProjects = async (req, res) => {
  try {
      const {rows} =  await db.query('select * from projects');
      
      return res.status(200).json(rows)
  } catch (err) {
      console.error(err.message)
  }
}


//////////////////////////////////////////////////////////// create new project ////////////////////////////////////////////////////
exports.newProject = async (req, res) => {
  const {project_name, url} = req.body;
  let errors = [];

  if(project_name.length > 50) {
    errors.push({message: 'Max Characters of 50 for Project Name Exeeded!'})
    return res.status(400).json(errors)
  }
  if(url.length > 50) {
    errors.push({message: 'Max Characters of 50 for URL Exeeded!'})
    return res.status(400).json(errors)
  }
  
  const checkProjectNameIsUnique = await db.query('select * from projects where project_name = $1', [project_name])
  const checkUrlIsUnique = await db.query('select * from projects where url = $1', [url])
  
  
  if(checkProjectNameIsUnique.rows.length > 0) {
    errors.push({message: "Project Name Already Exists! (Must Be Unique)"});
    return res.status(400).json(errors)
  }

  if(checkUrlIsUnique.rows.length > 0) {
    errors.push({message: "Url Already Exists! (Must Be Unique)"});
    return res.status(400).json(errors)
  }

  if(!errors.length) {
    await db.query('insert into projects (project_name, url) values ($1, $2)', [project_name, url]);
    return res.status(201).json({message: "You Have Successfully Created A New Project!"})
  } else {
    return res.status(400).json(errors)
  }
      
   
}

//////////////////////////////////////////////////////////// fetch bug comments ////////////////////////////////////////////////////
exports.getBugComments = async (req, res) => {

  try {
    const {rows} = await db.query('select * from comments');
    res.status(201).json(rows)
  } catch (error) {
    console.error(error.message)
  }
}

//////////////////////////////////////////////////////////// add bug comment ////////////////////////////////////////////////////
exports.addBugComment = async (req, res) => {
  const {bug_id, user_name, comment} = req.body;
  try {
    await db.query('insert into comments (bug_id, user_name, comment) values ($1, $2, $3)', [bug_id, user_name, comment]);
    res.status(201).json({
      success: true,
      message: 'Your Comment Has Been Added!'
    })
  } catch (error) {
    console.error(error.message)
  }
}

//////////////////////////////////////////////////////////// update user password ////////////////////////////////////////////////////
exports.updateUserPassword = async (req, res) => {
  const {email, password, new_password, confirm_password} = req.body;
  let errors = [];

  if(!email || !password || !new_password || !confirm_password) {
    errors.push({message: 'All Fields Must Be Filled Out!'})
  }
  if(!errors.length) {
    const new_hashed_password = await hash(new_password, 10)
    await db.query('update users set password = $1 where email = $2', [new_hashed_password, email]);
    return res.status(201).json({message: 'Your Password Has Been Upated!'})  
  } else {
    return res.status(400).json(errors);
  }
}



//////////////////////////////////////////////////////////// update user email ////////////////////////////////////////////////////
exports.updateUserEmail = async (req, res) => {
  const {email, new_email} = req.body;
  
    await db.query('update users set email = $1 where email = $2', [new_email, email]);
    return res.status(201).json({
      message: `Your Email Address Has Been Upated to ${new_email}`
    })
  
}


//////////////////////////////////////////////////////////// delete bug ////////////////////////////////////////////////////
exports.deleteBug = async (req, res) => {
  const {id} = req.params
  try {
      await db.query('delete from bugs where bug_id = $1', [id]);
      return res.status(200).json({
        success: true,
        message: "Bug Deleted"
    })
  } catch (error) {
      console.error(error.message)
      return res.status(500).json({
        error: error.message
      })
  }
}

//////////////////////////////////////////////////////////// delete comment ////////////////////////////////////////////////////
exports.deleteComment = async (req, res) => {
  const {id} = req.params
  try {
      await db.query('delete from comments where comment_id = $1', [id]);
      return res.status(200).json({
        success: true,
        message: "The Comment Has Been Deleted!"
    })
  } catch (error) {
      console.error(error.message)
      return res.status(500).json({
        error: error.message
      })
  }
}

//////////////////////////////////////////////////////////// delete project ////////////////////////////////////////////////////
exports.deleteProject = async (req, res) => {
  const {id} = req.params
  try {
      await db.query('delete from projects where id = $1', [id]);
      return res.status(200).json({
        success: true,
        message: "Project Has Been Deleted!"
    })
  } catch (error) {
      console.error(error.message)
      return res.status(500).json({
        error: error.message
      })
  }
}


//////////////////////////////////////////////////////////// add a new bug ////////////////////////////////////////////////////
exports.newBug = async (req, res) => {
  const {project_name, location, description, assigned_to} = req.body;
  let errors = [];

  if(!assigned_to.length || !description.length  || !location.length  || !project_name.length ) {
    errors.push({message: 'All fields must be filled out!'})
    return res.status(500).json(errors)
  }
  if(location.length > 20) {
      errors.push({message: 'Max characters of 50 exceeded for "location"'})
      return res.status(500).json(errors)
  }
  if(description.length > 300) {
      errors.push({message: 'Max characters of 300 exceeded for "description"'})
      return res.status(500).json(errors)
  }
  if(assigned_to.length > 30) {
      errors.push({message: 'Max characters of 50 exceeded for "assign to"'})
      return res.status(500).json(errors)
  }

  await db.query('insert into bugs (project_name, location, description, assigned_to) values ($1, $2, $3, $4)', [project_name, location, description, assigned_to]);
  return res.status(201).json({message: "You Have Successfully Created A New Bug!"})

}


/////////////////////////////////////////////////////////////////// fetch bugs //////////////////////////////////////////////////
exports.getBugs = async (req, res) => {
  try {
      const {rows} =  await db.query('select * from bugs');
      
      return res.status(200).json(rows)
  } catch (err) {
      console.error(err.message)
  }
}

////////////////////////////////////////////////////////////////// fetch users /////////////////////////////////////////////////
exports.getUsers = async (req, res) => {
  try {
      const {rows} =  await db.query('select email, first_name, last_name from users')
      
      return res.status(200).json(rows)
  } catch (err) {
      console.error(err.message)
  }
}


//////////////////////////////////////////////////////////////////////// register /////////////////////////////////////////////////////
exports.register = async (req, res) => {
    const {first_name, last_name, email, password} = req.body
    try {
        const hashedPassword = await hash(password, 10)
        await db.query('insert into users(first_name, last_name, email, password) values ($1, $2, $3, $4)', [first_name, last_name, email, hashedPassword]);
        return res.status(201).json({
            success: true,
            message: "You are now registered!"
        })
        
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            error: err.message
        })
    }
}

////////////////////////////////////////////////////////////////////// login //////////////////////////////////////////////////
exports.login = async (req, res) => {
    let user = req.user
    let payload = {
        id: user.user_id,
        email: user.email
    }

    try {
        const token = await sign(payload, SECRET)
        return res.status(200).cookie('token', token, {httpOnly: true}).json({
            success: true,
            message: 'Logged in successfully',
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            error: error.message
        })
    }
}


exports.protected = async (req, res) => {
    try {
      
      
      return res.status(200).json({
        info: 'Secure login',
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  ////////////////////////////////////////////////////////// logout ////////////////////////////////////////////////////////
  exports.logout = async (req, res) => {
    try {
      return res.status(200).clearCookie('token', { httpOnly: true }).json({
        success: true,
        message: 'You are now logged out',
      })
    } catch (error) {
      console.log(error.message)
      return res.status(500).json({
        error: error.message,
      })
    }
  }