import Link from 'next/link';
import styles from './header.module.scss';

export default function Header(): JSX.Element {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href="/">
          <img
            className={styles.logo}
            src="/images/logo.svg"
            alt="spacetraveling logo"
          />
        </Link>
      </div>
    </header>
  );
}
