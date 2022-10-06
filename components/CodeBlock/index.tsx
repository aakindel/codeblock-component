import Highlight, { defaultProps, Language } from "prism-react-renderer";
import CodeBlockStyles from "./CodeBlock.module.scss";
import theme from "prism-react-renderer/themes/vsDark";

type CodeBlockProps = {
  code?: string;
  language?: Language;
};

const CodeBlock = ({ code = "", language = "jsx" }: CodeBlockProps) => {
  return (
    <Highlight {...defaultProps} code={code} language={language} theme={theme}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <div className={`${CodeBlockStyles["codeblock-container"]}`}>
          <pre
            className={`${className} ${CodeBlockStyles["pre"]}`}
            style={{ ...style }}
          >
            <code className={`${CodeBlockStyles["code"]}`}>
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
            </code>
          </pre>
        </div>
      )}
    </Highlight>
  );
};

export default CodeBlock;
