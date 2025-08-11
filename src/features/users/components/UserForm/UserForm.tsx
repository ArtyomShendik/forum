import { Form, Input, Button, Modal, DatePicker, message } from 'antd';
import { useState, type FC } from 'react';
import styles from './UserForm.module.scss';
import dayjs from 'dayjs';
import type { User } from '../../../../types/user';

interface UserFormProps {
  isVisible: boolean;
  onCancel: () => void;
  onSubmit: (user: User) => void;
  initialData: User;
}

export const UserForm: FC<UserFormProps> = ({
  isVisible,
  onCancel,
  onSubmit,
  initialData,
}) => {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (values: any) => {
    setIsSubmitting(true);

    try {
      const updatedUser: User = {
        ...initialData,
        name: values.name.trim(),
        email: values.email.trim(),
        phone: values.phone?.trim() || '',
        address: values.address?.trim() || '',
        city: values.city?.trim() || '',
        country: values.country?.trim() || '',
        birthDate: values.birthDate
          ? values.birthDate.format('YYYY-MM-DD')
          : '',
      };

      onSubmit(updatedUser);
      message.success('Профиль успешно обновлен!');
    } catch {
      message.error('Ошибка при обновлении профиля');
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
      title="Редактировать профиль"
      open={isVisible}
      onCancel={handleCancel}
      footer={null}
      width={600}
    >
      <div className={styles['user-form']}>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            name: initialData.name,
            email: initialData.email,
            phone: initialData.phone,
            address: initialData.address,
            city: initialData.city,
            country: initialData.country,
            birthDate: initialData.birthDate
              ? dayjs(initialData.birthDate)
              : undefined,
          }}
          className={styles['form']}
        >
          <Form.Item
            name="name"
            label="Имя"
            rules={[
              { required: true, message: 'Пожалуйста, введите имя' },
              { min: 2, message: 'Имя должно содержать минимум 2 символа' },
              { max: 50, message: 'Имя не должно превышать 50 символов' },
            ]}
          >
            <Input placeholder="Введите ваше имя" maxLength={50} />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Пожалуйста, введите email' },
              {
                type: 'email',
                message: 'Пожалуйста, введите корректный email',
              },
            ]}
          >
            <Input placeholder="Введите ваш email" type="email" />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Телефон"
            rules={[
              {
                pattern: /^[+]?[0-9\s\-()]+$/,
                message: 'Введите корректный номер телефона',
              },
            ]}
          >
            <Input placeholder="Введите номер телефона" />
          </Form.Item>

          <Form.Item
            name="address"
            label="Адрес"
            rules={[
              { max: 200, message: 'Адрес не должен превышать 200 символов' },
            ]}
          >
            <Input placeholder="Введите адрес" maxLength={200} />
          </Form.Item>

          <Form.Item
            name="city"
            label="Город"
            rules={[
              {
                max: 50,
                message: 'Название города не должно превышать 50 символов',
              },
            ]}
          >
            <Input placeholder="Введите город" maxLength={50} />
          </Form.Item>

          <Form.Item
            name="country"
            label="Страна"
            rules={[
              {
                max: 50,
                message: 'Название страны не должно превышать 50 символов',
              },
            ]}
          >
            <Input placeholder="Введите страну" maxLength={50} />
          </Form.Item>

          <Form.Item name="birthDate" label="Дата рождения">
            <DatePicker
              placeholder="Выберите дату рождения"
              format="DD.MM.YYYY"
              style={{ width: '100%' }}
            />
          </Form.Item>

          <Form.Item className={styles['form-actions']}>
            <Button
              type="primary"
              htmlType="submit"
              loading={isSubmitting}
              className={styles['submit-button']}
            >
              {isSubmitting ? 'Сохранение...' : 'Сохранить'}
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
