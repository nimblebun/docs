import styles from './Document.module.scss';

import { IDocument } from '@/lib/documents';
import MarkdownImage from '../renderers/MarkdownImage';

import ReactMarkdown from 'react-markdown';
import HeadingRenderer from '../renderers/HeadingRenderer';
import toc from '@/lib/toc';
import DocumentMeta from './DocumentMeta';
import CodeBlock from '../renderers/CodeBlock';
import Badge from '../badge/Badge';

const renderers = {
  heading: HeadingRenderer,
  code: CodeBlock
};

const Document = ({ doc }: { doc: IDocument }) => {
  const tableOfContents = toc(doc.content);

  const level = process.env.NEXT_PUBLIC_DRAFT_LEVEL || 'draft';
  const dateString = level === 'release'
    ? `Nimble Bun Works Public Note ${doc.date}`
    : `Nimble Bun Works Editor's Draft ${doc.date}`;

  const dateClasses = [
    styles.date,
    styles[`level-${level}`]
  ].join(' ');

  return (
    <article className={styles.document}>
      <nav className={styles.toc} id="toc">
        <ReactMarkdown>{tableOfContents}</ReactMarkdown>
        <Badge />
      </nav>

      <div className={styles.wrapper}>
        <section className={styles.title}>
          {doc.icon && <MarkdownImage src={doc.icon} alt={doc.title} />}
          <h1>{doc.title}</h1>
        </section>

        <div className={dateClasses}>{dateString}</div>

        <section className={styles.content}>
          <DocumentMeta slug={doc.slug} editors={doc.editors} />
          <ReactMarkdown renderers={renderers}>{doc.content}</ReactMarkdown>
        </section>
      </div>

      <a href="#toc" className={styles.backToTop}>Back To Top</a>
    </article>
  );
};

export default Document;
