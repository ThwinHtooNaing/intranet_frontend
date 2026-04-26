import Sidebar from '@/components/admin/Sidebar';
import Header from '@/components/admin/Header';
import styles from './admin.module.css';

export const metadata = {
  title: 'University Admin',
};

export default function AdminLayout({ children }) {
  return (
    <div className={styles.adminRoot}>
      <Sidebar />
      <div className={styles.mainWrapper}>
        <Header />
        {children}
      </div>
    </div>
  );
}
