import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";

function isCodeBlock(str) {
  if (
    str.includes("=") ||
    str.includes(";") ||
    str.includes("[") ||
    str.includes("]") ||
    str.includes("{") ||
    str.includes("}") ||
    str.includes("#") ||
    str.includes("//")
  ) {
    return true;
  }
  return false;
}

function extractCodeFromString(message) {
  if (message.includes("```")) {
    const blocks = message.split("```");
    return blocks;
  }
}

const ChatItem = ({ content, role }) => {
  const messageBlocks = extractCodeFromString(content);
  return role === "assistant" ? (
    <div className="user-chat-item">
      {!messageBlocks && <p>{content}</p>}
      {messageBlocks &&
        messageBlocks.length &&
        messageBlocks.map((block) =>
          isCodeBlock(block) ? (
            <SyntaxHighlighter style={coldarkDark} language="javascript">
              {block}
            </SyntaxHighlighter>
          ) : (
            <p>{block}</p>
          )
        )}
    </div>
  ) : (
    <div className="assistant-chat-item">
      {!messageBlocks && <p>{content}</p>}
      {messageBlocks &&
        messageBlocks.length &&
        messageBlocks.map((block) =>
          isCodeBlock(block) ? (
            <SyntaxHighlighter style={coldarkDark} language="javascript">
              {block}
            </SyntaxHighlighter>
          ) : (
            <p>{block}</p>
          )
        )}
    </div>
  );
};

export default ChatItem;
