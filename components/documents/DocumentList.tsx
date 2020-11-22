import { IDocument } from '@/lib/documents';
import Link from 'next/link';

const DocumentList = ({ documents }: { documents: IDocument[] }) => {
  return (
    <section>
      {documents.map(doc => (
        <Link href={`/${doc.slug}`} key={doc.slug}>
          <a>{doc.title}</a>
        </Link>
      ))}
    </section>
  );
};

export default DocumentList;
