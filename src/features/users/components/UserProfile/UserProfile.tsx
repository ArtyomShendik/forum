import { Card, Avatar, Typography, Space, Button, Divider } from 'antd';
import { UserOutlined, EditOutlined } from '@ant-design/icons';
import { useState, type FC } from 'react';
import { UserForm } from '../UserForm/UserForm';
import styles from './UserProfile.module.scss';
import type { User } from '../../../../types/user';
import { useUserStore } from '../../../../store/user.store';

const { Title, Text } = Typography;

export const UserProfile: FC = () => {
  const { user, updateUser } = useUserStore();
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleUpdateUser = (updatedUser: User) => {
    updateUser(updatedUser);
    setIsFormVisible(false);
  };

  if (!user) {
    return <div>Пользователь не найден</div>;
  }

  return (
    <div className={styles['user-profile']}>
      <Card className={styles['profile-card']}>
        <div className={styles['profile-header']}>
          <Avatar
            size={80}
            icon={<UserOutlined />}
            className={styles['profile-avatar']}
          />
          <div className={styles['profile-info']}>
            <Title level={2} className={styles['profile-name']}>
              {user.name}
            </Title>
            <Text type="secondary" className={styles['profile-email']}>
              {user.email}
            </Text>
          </div>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => setIsFormVisible(true)}
            className={styles['edit-button']}
          >
            Редактировать
          </Button>
        </div>

        <Divider />

        <div className={styles['profile-details']}>
          <Space
            direction="vertical"
            size="large"
            className={styles['details-list']}
          >
            <div className={styles['detail-item']}>
              <Text strong>Имя:</Text>
              <Text>{user.name}</Text>
            </div>

            <div className={styles['detail-item']}>
              <Text strong>Email:</Text>
              <Text>{user.email}</Text>
            </div>

            <div className={styles['detail-item']}>
              <Text strong>Телефон:</Text>
              <Text>{user.phone || 'Не указан'}</Text>
            </div>

            <div className={styles['detail-item']}>
              <Text strong>Адрес:</Text>
              <Text>{user.address || 'Не указан'}</Text>
            </div>

            <div className={styles['detail-item']}>
              <Text strong>Город:</Text>
              <Text>{user.city || 'Не указан'}</Text>
            </div>

            <div className={styles['detail-item']}>
              <Text strong>Страна:</Text>
              <Text>{user.country || 'Не указан'}</Text>
            </div>

            <div className={styles['detail-item']}>
              <Text strong>Дата рождения:</Text>
              <Text>{user.birthDate || 'Не указана'}</Text>
            </div>
          </Space>
        </div>
      </Card>

      <UserForm
        isVisible={isFormVisible}
        onCancel={() => setIsFormVisible(false)}
        onSubmit={handleUpdateUser}
        initialData={user}
      />
    </div>
  );
};
