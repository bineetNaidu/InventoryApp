import { Response, Request } from 'express';
import { body } from 'express-validator';
import { Comment } from '../../models/Comments';
import { decodeJWT } from '../../utils/jwtUtils';

export const createCommentValidations = [
  body('body')
    .not()
    .isEmpty()
    .withMessage('Should have a body')
    .isLength({ min: 1, max: 120 })
    .withMessage('Should have a body between 1 and 120 characters')
    .trim()
    .escape(),
];

export const createComment = async (req: Request, res: Response) => {
  const item_id = req.params.item_id;

  const { body } = req.body;

  const decodedToken = await decodeJWT(
    req.headers.authorization!.split(' ')[1]
  );

  const author_id = decodedToken.id;

  const comment = await Comment.create({
    item_id,
    author_id,
    body,
  }).save();

  res.json({
    comment,
    success: true,
    status: req.statusCode,
    message: req.statusMessage,
  });
};
