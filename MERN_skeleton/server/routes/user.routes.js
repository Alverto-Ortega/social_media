import express from 'express';
import userCtrl from '../controllers/user.controller';

//declare API endpoints that correspond to user CRUD operations 
//and configure express router to handle userID para in a requested route 
const router = express.Router();

router.route('/api/users').get(userCtrl.list)
                            .post(userCtrl.create);

router.route('/api/users/:userId').get(userCtrl.read)
                                    .put(userCtrl.update)
                                        .delete(userCtrl.remove);

router.param('userId', userCtrl.userByID);

export default router;
