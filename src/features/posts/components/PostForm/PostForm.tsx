import { Form, Input, Button, message, Modal } from 'antd';
import { useState, type FC } from 'react';
import styles from './PostForm.module.scss';
import type { Post } from '../../../../types/post';

const { TextArea } = Input;

interface PostFormProps {
  isVisible: boolean;
  onCancel: () => void;
  onSubmit: (post: Omit<Post, 'id' | 'userId'>) => void;
}

export const PostForm: FC<PostFormProps> = ({
  isVisible,
  onCancel,
  onSubmit,
}) => {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values: { title: string; body: string }) => {
    setIsSubmitting(true);

    try {
      const newPost: Omit<Post, 'id' | 'userId'> = {
        title: values.title.trim(),
        body: values.body.trim(),
      };

      onSubmit(newPost);
      form.resetFields();
      message.success('Пост успешно добавлен!');
      onCancel();
    } catch {
      message.error('Ошибка при добавлении поста');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      title="Добавить новый пост"
      open={isVisible}
      onCancel={handleCancel}
      footer={null}
      width={700}
    >
      <div className={styles['post-form']}>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className={styles['form']}
        >
          <Form.Item
            name="title"
            label="Заголовок поста"
            rules={[
              {
                required: true,
                message: 'Пожалуйста, введите заголовок поста',
              },
              {
                min: 5,
                message: 'Заголовок должен содержать минимум 5 символов',
              },
              {
                max: 100,
                message: 'Заголовок не должен превышать 100 символов',
              },
            ]}
          >
            <Input
              placeholder="Введите заголовок поста"
              maxLength={100}
              showCount
            />
          </Form.Item>

          <Form.Item
            name="body"
            label="Содержание поста"
            rules={[
              {
                required: true,
                message: 'Пожалуйста, введите содержание поста',
              },
              { min: 20, message: 'Пост должен содержать минимум 20 символов' },
              { max: 2000, message: 'Пост не должен превышать 2000 символов' },
            ]}
          >
            <TextArea
              placeholder="Введите содержание поста"
              rows={8}
              maxLength={2000}
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
              {isSubmitting ? 'Добавление...' : 'Добавить пост'}
            </Button>

            <Button onClick={handleCancel} className={styles['cancel-button']}>
              Отмена
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};
