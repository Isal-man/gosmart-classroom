export const ShortenText = ({ text, maxLength }) => {
  const shorten = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + '...';
  };

  return <span>{shorten(text, maxLength)}</span>;
};