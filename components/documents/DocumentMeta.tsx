import styles from './DocumentMeta.module.scss';

export interface DocumentMetaProps {
  slug: string;
  editors: string[];
}

interface Editor {
  name: string;
  company: string;
  url: string;
}

const parseEditor = (editor: string): Editor => {
  const re = /(.+)(?= \() \((.+)(?=<)<(.+)(?=>)/g;

  const match = re.exec(editor);

  const name = match[1];
  const company = match[2];
  const url = match[3];

  return { name, company, url };
};

const DocumentMeta = ({ slug, editors }: DocumentMetaProps) => {
  const latestVersion = `https://docs.nimblebun.works/${slug}/`;
  const editorsDraft = `https://nimblebun.github.io/docs/${slug}/`;

  const gitHistory = `https://github.com/nimblebun/docs/commits/master/content/${slug}.md`;

  const editorsMetadata = editors.map(parseEditor);

  return (
    <div className={styles.metadata}>
      <div className={styles.line}>
        <strong>Latest version:</strong>
        <a href={latestVersion} target="_blank" rel="noreferrer noopener">{latestVersion}</a>
      </div>

      <div className={styles.line}>
        <strong>Latest editor's draft:</strong>
        <a href={editorsDraft} target="_blank" rel="noreferrer noopener">{editorsDraft}</a>
      </div>

      <div className={styles.line}>
        <strong>Editors:</strong>
        <ul>
          {editorsMetadata.map((editor, idx) => (
            <li key={idx}>{editor.name} (<a href={editor.url} target="_blank" rel="noreferrer noopener">{editor.company}</a>)</li>
          ))}
        </ul>
      </div>

      <div className={styles.line}>
        <strong>Repository:</strong>
        <ul>
          <li>
            <a href="https://github.com/nimblebun/docs/" target="_blank" rel="noreferrer noopener">GitHub</a>
          </li>
          <li>
            <a href="https://github.com/nimblebun/docs/issues" target="_blank" rel="noreferrer noopener">Issue Tracker</a>
          </li>
          <li>
            <a href={gitHistory} target="_blank" rel="noreferrer noopener">Commit History</a>
          </li>
        </ul>
      </div>

      <div className={styles.copy}>&copy; Nimble Bun Works (<a href="https://github.com/nimblebun/docs/blob/master/LICENSE" target="_blank" rel="noreferrer noopener">MIT</a>)</div>
    </div>
  );
};

export default DocumentMeta;
