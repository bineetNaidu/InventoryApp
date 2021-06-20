import { Response, Request } from 'express';
import { Comment } from '../../../models/Comment.model';
import { decodeJWT } from '../../../utils/jwtUtils';

export const createComment = async (req: Request, res: Response) => {
  const item_id = req.params.item_id;

  const { comment: commentText } = req.body;

  const decodedToken = await decodeJWT(
    req.headers.authorization!.split(' ')[1]
  );

  const author_id = decodedToken.id;

  const comment = await Comment.create({
    author_id,
    comment: commentText,
    commented_at: new Date().toUTCString(),
    item_id,
  }).save();

  res.json({
    comment,
    success: true,
    status: req.statusCode,
    message: req.statusMessage,
  });
};
