import { Card, Avatar, Typography, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import type { FC } from 'react';
import styles from './CommentCard.module.scss';
import type { Comment } from '../../../../types/comment';

const { Text, Paragraph } = Typography;

interface CommentCardProps {
  comment: Comment;
}

export const CommentCard: FC<CommentCardProps> = ({ comment }) => {
  return (
    <Card className={styles['comment-card']}>
      <div className={styles['comment-header']}>
        <Space align="center">
          <Avatar
            icon={<UserOutlined />}
            size="small"
            className={styles['comment-avatar']}
          />
          <div className={styles['comment-author']}>
            <Text strong>{comment.name}</Text>
            <Text type="secondary" className={styles['comment-email']}>
              {comment.email}
            </Text>
          </div>
        </Space>
      </div>

      <Paragraph className={styles['comment-body']}>{comment.body}</Paragraph>
    </Card>
  );
};
