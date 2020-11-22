import SyntaxHighlighter from 'react-syntax-highlighter';

const CodeBlock = ({ language, value }) => {
  return <SyntaxHighlighter language={language} useInlineStyles={false}>{value}</SyntaxHighlighter>;
};

export default CodeBlock;
