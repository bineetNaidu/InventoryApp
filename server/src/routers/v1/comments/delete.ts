import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Comment as CommentModel } from '../../../models/Comment.model';

export const deleteComment = async (req: Request, res: Response) => {
  const item_id = req.params.item_id;
  const comment_id = req.query.id as string; // ! FIX THIS!

  const comment = await getRepository(CommentModel).findOne({
    where: { id: comment_id, item_id },
  });

  if (!comment) {
    throw new Error('The Comment was Not Found');
  }

  await getRepository(CommentModel)
    .createQueryBuilder()
    .delete()
    .from(CommentModel)
    .where('id = :id', { id: comment.id })
    .execute();

  res.json({
    deleted_comment_id: comment.id,
    deleted: true,
    success: true,
  });
};
