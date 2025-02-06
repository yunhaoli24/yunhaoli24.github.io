/**
 * Split text into parts, with text between ** markers marked for bold styling
 * @param {string} text - Text containing ** markers for bold sections
 * @returns {Array<{text: string, bold: boolean}>} Array of text parts with bold flags
 */
export const getAuthorParts = (text) => {
  const parts = [];
  let lastIndex = 0;
  let match;

  const regex = /\*\*([^*]+)\*\*/g;
  while ((match = regex.exec(text)) !== null) {
    // Add non-bold text before the match
    if (match.index > lastIndex) {
      parts.push({
        text: text.substring(lastIndex, match.index),
        bold: false,
      });
    }
    // Add bold text
    parts.push({
      text: match[1],
      bold: true,
    });
    lastIndex = match.index + match[0].length;
  }
  // Add remaining non-bold text
  if (lastIndex < text.length) {
    parts.push({
      text: text.substring(lastIndex),
      bold: false,
    });
  }
  return parts;
};
