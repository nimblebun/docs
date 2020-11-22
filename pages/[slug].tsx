import Meta from '@/components/Meta';
import Document from '@/components/documents/Document';
import { fetchDocument, fetchDocuments, IDocument } from '@/lib/documents';

import Image from 'next/image';

const DocumentPage = ({ doc }: { doc: IDocument }) => {
  return (
    <main className="document">
      <Meta
        title={doc.title}
        description={doc.title}
        url={doc.slug}
      />

      <Document doc={doc} />
    </main>
  );
};

export const getStaticProps = async ctx => {
  const slug = ctx.params.slug;
  const doc = fetchDocument(slug);

  return {
    props: {
      doc
    }
  };
};

export const getStaticPaths = async ctx => {
  const documents = fetchDocuments();

  return {
    paths: documents.map(doc => {
      return {
        params: {
          slug: doc.slug
        }
      };
    }),
    fallback: false
  };
};

export default DocumentPage;
