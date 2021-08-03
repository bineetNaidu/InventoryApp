import { Request, Response } from 'express';
import { param, query } from 'express-validator';
import { Comment } from '../../../models/Comments';

export const deleteCommentValidations = [
  param('item_id')
    .not()
    .isEmpty()
    .withMessage('Should have an item_id')
    .trim()
    .escape()
    .toInt(),
  query('comment_id')
    .not()
    .isEmpty()
    .withMessage('Should have a comment_id')
    .trim()
    .escape()
    .toInt(),
];

export const deleteComment = async (req: Request, res: Response) => {
  const item_id = req.params.item_id;
  const comment_id = req.query.id;

  const comment = await Comment.findOne({
    where: { id: comment_id, item_id },
  });

  if (!comment) {
    throw new Error('The Comment was Not Found');
  }

  await Comment.createQueryBuilder()
    .delete()
    .from(Comment)
    .where('id = :id', { id: comment.id })
    .execute();

  res.json({
    deleted_comment_id: comment.id,
    deleted: true,
    success: true,
  });
};
