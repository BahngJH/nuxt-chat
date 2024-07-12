import { useBase, createRouter, defineEventHandler } from 'h3';
import * as userController from '~~/server/controller/user';

const router = createRouter();

router.get('/user', defineEventHandler(userController.read));
router.post('/user', defineEventHandler(userController.add));
router.get('/user/:id', defineEventHandler(userController.detail));
router.put('/user/:id', defineEventHandler(userController.update));
router.delete('/user/:id', defineEventHandler(userController.remove));

export default useBase('/api', router.handler);