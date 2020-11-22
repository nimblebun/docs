import styles from './TheHeader.module.scss';

const TheHeader = () => {
  return (
    <header className={styles.wrapper}>
      <div className={styles.logo}>
        <img src="/assets/logo.png" alt="Nimble Bun Works" />
      </div>

      <div className={styles.sitename}>
        <h1>Nimble Bun Works Notes and Drafts</h1>
      </div>
    </header>
  );
};

export default TheHeader;
