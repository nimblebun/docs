import slugify from '@sindresorhus/slugify';

interface HeadingLine {
  original: string;
  content: string;
  slug: string;
  level: number;
}

const headingsToMarkdown = (headings: HeadingLine[]): string => {
  const title = '# Table of Contents\n\n';
  const list = headings.map(heading => {
    const spaces = new Array(2 * heading.level - 2).fill(' ').join('');
    return `${spaces}- [${heading.content}](#${heading.slug})`;
  });

  return `${title}${list.join('\n')}`;
};

const toc = (input: string): string => {
  const re = /^#{1,6}(.+)/gm;

  const matches = input.match(re);

  const headings: HeadingLine[] = matches.map(m => {
    const original = m;

    const headingWithoutHash = m.replace(/^#{1,6}/g, '');
    const level = m.length - headingWithoutHash.length;

    const content = headingWithoutHash.trim();
    const slug = slugify(content);

    return {
      original,
      content,
      slug,
      level
    };
  });

  return headingsToMarkdown(headings);
};

export default toc;
