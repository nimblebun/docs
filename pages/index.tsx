import DocumentList from '@/components/documents/DocumentList';
import Meta from '@/components/Meta';
import TheHeader from '@/components/the-header/TheHeader';
import { fetchDocuments, IDocument } from '@/lib/documents';

const Home = ({ documents }: { documents: IDocument[] }) => {
  return (
    <main>
      <Meta
        title="Home"
        description="Standards, specs, and other documents from Nimble Bun Works."
        url="/"
      />

      <TheHeader />
      <DocumentList documents={documents} />
    </main>
  );
};

export const getStaticProps = async ctx => {
  const documents = fetchDocuments();

  return {
    props: {
      documents
    }
  };
};

export default Home;
