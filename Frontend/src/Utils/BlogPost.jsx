import React, { useEffect, useRef, useState } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-okaidia.css";
import { HiClipboardCheck } from "react-icons/hi";

const BlogPost = ({ content }) => {
  // Function to parse content and separate code blocks
  const parseContent = (content) => {
    const regex = /\*\*title\*\*(.*?)\*\*title\*\*|\*\*heading\*\*(.*?)\*\*heading\*\*|\*\*code\*\*(.*?)\*\*code\*\*/gs;
    const parts = [];
    let match;
    let lastIndex = 0;

    while ((match = regex.exec(content)) !== null) {
      if (match.index > lastIndex) {
        parts.push({ type: "text", content: content.slice(lastIndex, match.index) });
      }
      if (match[1]) {
        parts.push({ type: "title", content: match[1] });
      } else if (match[2]) {
        parts.push({ type: "heading", content: match[2] });
      } else if (match[3]) {
        parts.push({ type: "code", content: match[3] });
      }
      lastIndex = regex.lastIndex;
    }
    if (lastIndex < content.length) {
      parts.push({ type: "text", content: content.slice(lastIndex) });
    }

    return parts;
  };

  const parsedContent = parseContent(content);

  useEffect(() => {
    Prism.highlightAll();
  }, [parsedContent]);

  const CodeBlock = ({ code }) => {
    const codeRef = useRef(null);
    const [copied, setCopied] = useState(false);

    const handleCopyClick = () => {
      const codeElement = codeRef.current;
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(codeElement);
      selection.removeAllRanges();
      selection.addRange(range);
      document.execCommand("copy");
      selection.removeAllRanges();

      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    };

    return (
      <div className="relative">
        <button
          className="absolute top-2 right-2 text-white px-2 py-1 rounded hover:bg-gray-600 flex items-center"
          onClick={handleCopyClick}
        >
          {copied ? <HiClipboardCheck className="mr-1" /> : "Copy"}
        </button>
        <pre ref={codeRef}>
          <code className="language-javascript">{code}</code>
        </pre>
      </div>
    );
  };

  return (
    <div className="blog-post max-w-full mx-auto md:p-4 p-1 text-white">
      {parsedContent.map((part, index) => (
        <React.Fragment key={`part-${index}`}>
          {part.type === "title" && <h1 className="md:text-4xl sm:text-2xl text-xl font-bold mb-4 text-center">{part.content}</h1>}
          {part.type === "heading" && <h2 className="md:text-2xl font-semibold mb-2">{part.content}</h2>}
          {part.type === "text" && <p className="opacity-90 md:text-xl py-[10px]">{part.content}</p>}
          {part.type === "code" && <CodeBlock code={part.content} />}
        </React.Fragment>
      ))}
    </div>
  );
};

export default BlogPost;
