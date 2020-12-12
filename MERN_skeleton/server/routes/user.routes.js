import express from 'express';
import userCtrl from '../controllers/user.controller';
import authCtrl from '../controllers/auth.controller';

//declare API endpoints that correspond to user CRUD operations 
//and configure express router to handle userID para in a requested route 
const router = express.Router();

router.route('/api/users').get(userCtrl.list)
                            .post(userCtrl.create);
 //read route only needs authentication verif
 //update,delete check both authentication and authorization before CRUD executions.                           
router.route('/api/users/:userId').get(authCtrl.requireSignin, userCtrl.read)
                                    .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
                                        .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove);

router.param('userId', userCtrl.userByID);

export default router;
