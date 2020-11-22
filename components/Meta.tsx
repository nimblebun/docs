import buildUrl from '@/lib/buildUrl';
import Head from 'next/head';

export interface IMetaParams {
  title: string;
  description: string;
  url: string;
}

const Meta = ({ title, description, url }: IMetaParams) => {
  title = `${title} - Nimble Bun Works Notes and Drafts`;

  url = buildUrl(url);

  return (
    <Head>
      <title>{title}</title>

      <meta name="title" content={title} />
      <meta name="description" content={description} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />

      <meta property="og:url" content={url} />
    </Head>
  );
};

export default Meta;
