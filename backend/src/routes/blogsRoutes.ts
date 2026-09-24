import { Router } from 'express';
import * as blogsController from '../controllers/blogsController';

const router = Router();

router.get('/', blogsController.getBlogs);
router.post('/', blogsController.createBlog);
router.put('/:id', blogsController.updateBlog);
router.delete('/:id', blogsController.deleteBlog);

export default router;
