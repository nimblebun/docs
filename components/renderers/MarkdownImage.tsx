const MarkdownImage = ({ alt, src }: { alt: string; src: string }) => {
  src = src.replace('images/', '');

  return (
    <img
      alt={alt}
      src={require(`../../content/images/${src}`)}
    />
  );
};

export default MarkdownImage;
