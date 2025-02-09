import { findAllNotifications } from './_model';

export default async function Notifications() {
  const userId = 'test@example.com';
  const notifications = await findAllNotifications(userId);

  return (
    <ul>
      {notifications.map(({ isbn, title }) => (
        <li key={isbn}>
          {isbn}
          {title}
        </li>
      ))}
    </ul>
  );
}
