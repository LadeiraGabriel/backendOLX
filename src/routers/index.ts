import { Router } from "express";
import {homeController} from '../controllers/homeController'
import {createUsers, loginUser} from '../controllers/userController';

const router = Router();


router.post('/', homeController);
router.post('/cadastrar', createUsers);
router.post("/login", loginUser);


/* router.get('/optinemail', function()) */


export default router;