import { findAllNotifications } from './_model';

export default async function Notifications() {
  const notifications = await findAllNotifications();

  return (
    <ul>
      {notifications.map(({ isbn, onPreOrder, onSale }) => (
        <li key={isbn}>
          {isbn} ( 予約開始時: {onPreOrder ? 'o' : 'x'}, 発売開始時:{' '}
          {onSale ? 'o' : 'x'} )
        </li>
      ))}
    </ul>
  );
}
