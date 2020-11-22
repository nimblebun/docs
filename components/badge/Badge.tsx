import styles from './Badge.module.scss';

const Badge = () => {
  const level = process.env.NEXT_PUBLIC_DRAFT_LEVEL || 'draft';

  const classes = [
    styles.badge,
    styles[level]
  ].join(' ');

  const text = level === 'release'
    ? 'Nimble Bun Works Public Note'
    : 'Nimble Bun Works Editor\'s Draft';

  return (
    <div className={classes}>{text}</div>
  );
};

export default Badge;
