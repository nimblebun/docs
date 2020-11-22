import matter from 'gray-matter';
import * as fs from 'fs';
import * as path from 'path';

const CONTENT_PATH = path.join(process.cwd(), 'content');

interface RawDocumentData {
  title: string;
  editors: string[];
  icon: string;
  date: string;
}

export interface IDocument extends RawDocumentData {
  slug: string;
  content?: string;
}

const fetchDocuments = (): IDocument[] => {
  return fs.readdirSync(CONTENT_PATH)
    .filter(f => f.endsWith('.md'))
    .map(f => {
      const raw = fs.readFileSync(path.join(CONTENT_PATH, f), { encoding: 'utf8' });

      const frontmatter = matter(raw);
      const data: RawDocumentData = frontmatter.data as RawDocumentData;

      const slug = f.replace('.md', '');

      return {
        ...data,
        slug
      };
    });
};

const fetchDocument = (slug: string): IDocument | null => {
  const postPath = path.join(CONTENT_PATH, `${slug}.md`);

  if (!fs.existsSync(postPath)) {
    return null;
  }

  const raw = fs.readFileSync(postPath, { encoding: 'utf8' });

  const frontmatter = matter(raw);
  const data: RawDocumentData = frontmatter.data as RawDocumentData;
  const content: string = frontmatter.content;

  return {
    ...data,
    content,
    slug
  };
};

export {
  fetchDocuments,
  fetchDocument
};
