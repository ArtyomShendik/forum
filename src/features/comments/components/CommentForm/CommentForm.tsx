import { Form, Input, Button, message } from 'antd';
import { useState, type FC } from 'react';
import styles from './CommentForm.module.scss';
import type { Comment } from '../../../../types/comment';
import { useUserStore } from '../../../../store/user.store';

const { TextArea } = Input;

interface CommentFormProps {
  onSubmit: (comment: Omit<Comment, 'id'>) => void;
  onCancel?: () => void;
}

export const CommentForm: FC<CommentFormProps> = ({ onSubmit, onCancel }) => {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useUserStore();

  const handleSubmit = async (values: {
    name: string;
    email: string;
    body: string;
  }) => {
    setIsSubmitting(true);

    try {
      const newComment: Omit<Comment, 'id'> = {
        userId: 1,
        name: user?.name || '',
        email: values.email.trim(),
        body: values.body.trim(),
      };

      onSubmit(newComment);
      form.resetFields();
      message.success('Комментарий добавлен!');
    } catch {
      message.error('Ошибка при добавлении комментария');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel?.();
  };

  return (
    <div className={styles['comment-form']}>
      <h3>Добавить комментарий</h3>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className={styles['form']}
      >
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Пожалуйста, введите email' },
            { type: 'email', message: 'Пожалуйста, введите корректный email' },
          ]}
        >
          <Input placeholder="Введите ваш email" type="email" />
        </Form.Item>

        <Form.Item
          name="body"
          label="Комментарий"
          rules={[
            { required: true, message: 'Пожалуйста, введите комментарий' },
            {
              min: 10,
              message: 'Комментарий должен содержать минимум 10 символов',
            },
            {
              max: 500,
              message: 'Комментарий не должен превышать 500 символов',
            },
          ]}
        >
          <TextArea
            placeholder="Введите ваш комментарий"
            rows={4}
            maxLength={500}
            showCount
          />
        </Form.Item>

        <Form.Item className={styles['form-actions']}>
          <Button
            type="primary"
            htmlType="submit"
            loading={isSubmitting}
            className={styles['submit-button']}
          >
            {isSubmitting ? 'Добавление...' : 'Добавить комментарий'}
          </Button>

          {onCancel && (
            <Button onClick={handleCancel} className={styles['cancel-button']}>
              Отмена
            </Button>
          )}
        </Form.Item>
      </Form>
    </div>
  );
};
