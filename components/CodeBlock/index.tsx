import Highlight, { defaultProps, Language } from "prism-react-renderer";
import CodeBlockStyles from "./CodeBlock.module.scss";
import theme from "prism-react-renderer/themes/vsDark";

type CodeBlockOptions = {
  pxBorderRadius?: number;
  pxHeight?: number;
  pxCodeFontSize?: number;
  pxLineHeight?: number;
  pxCodePaddingTop?: number;
  pxCodePaddingBottom?: number;
  pxCodePaddingLeft?: number;
  pxCodePaddingRight?: number;
};

type LocalCodeBlockOptions = Required<CodeBlockOptions>;

type CodeBlockProps = {
  code?: string;
  language?: Language;
  options?: CodeBlockOptions;
};

const CodeBlock = ({
  code = "",
  language = "jsx",
  options,
}: CodeBlockProps) => {
  const localOptions: LocalCodeBlockOptions = {
    pxBorderRadius: 5,
    pxHeight: 500,
    pxCodeFontSize: 13,
    pxLineHeight: 20,
    pxCodePaddingTop: 24,
    pxCodePaddingBottom: 24,
    pxCodePaddingLeft: 24,
    pxCodePaddingRight: 24,
    ...options,
  };

  return (
    <Highlight {...defaultProps} code={code} language={language} theme={theme}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <div
          className={`${CodeBlockStyles["codeblock-container"]}`}
          style={{
            borderRadius: `${localOptions.pxBorderRadius}px`,
            height: `${localOptions.pxHeight}px`,
          }}
        >
          <pre
            className={`${className} ${CodeBlockStyles["pre"]}`}
            style={{ ...style }}
          >
            <code
              className={`${CodeBlockStyles["code"]}`}
              style={{
                fontSize: `${localOptions.pxCodeFontSize}px`,
                lineHeight: `${localOptions.pxLineHeight}px`,
                paddingTop: `${localOptions.pxCodePaddingTop}px`,
                paddingBottom: `${localOptions.pxCodePaddingBottom}px`,
                paddingLeft: `${localOptions.pxCodePaddingLeft}px`,
                paddingRight: `${localOptions.pxCodePaddingRight}px`,
              }}
            >
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
