import { User } from '../models/user.js'


export const authenticateUser = async (req, res, next) => {
 try {
   const user = await User.findOne ({ accessToken: req.header("Authorization") })
   
   if (user) {
     req.user = user
     next()
   
    } else {
     res.status(401).json({
       success: false,
       message: "Authorization missing or invalid",
       loggedOut: true
     })
   }
   
 } catch (error) {
   res.status(500).json({
     message: "Internal server error",
     error: error.message
   })
 }
}
