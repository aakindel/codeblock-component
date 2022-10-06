import Highlight, { defaultProps, Language } from "prism-react-renderer";
import CodeBlockStyles from "./CodeBlock.module.scss";
import theme from "prism-react-renderer/themes/vsDark";
import { useEffect, useRef, useState } from "react";

type ColorOptions = {
  lineNumberColor?: string;
};

type LocalColorOptions = Required<ColorOptions>;

type CodeBlockOptions = {
  pxBorderRadius?: number;
  pxHeight?: number;
  pxCodeFontSize?: number;
  pxLineHeight?: number;
  pxCodePaddingTop?: number;
  pxCodePaddingBottom?: number;
  pxCodePaddingLeft?: number;
  pxCodePaddingRight?: number;
  pxLineNumberPaddingLeft?: number;
  pxLineNumberPaddingRight?: number;
};

type LocalCodeBlockOptions = Required<CodeBlockOptions>;

type CodeBlockProps = {
  code?: string;
  language?: Language;
  showLineNumbers?: boolean;
  wrapLines?: boolean;
  options?: CodeBlockOptions;
  colorOptions?: ColorOptions;
};

const getStringLineCount = (userString: string): number => {
  return userString.split(/\r\n|\r|\n/).length;
};

const CodeBlock = ({
  code = "",
  language = "jsx",
  showLineNumbers = true,
  wrapLines = false,
  options,
  colorOptions,
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
    pxLineNumberPaddingLeft: 16,
    pxLineNumberPaddingRight: 8,
    ...options,
  };

  const localColorOptions: LocalColorOptions = {
    lineNumberColor: "#FFF",
    ...colorOptions,
  };

  const isCodeEmpty = code === "";
  const lastLineIndex = getStringLineCount(code) - 1;

  const [wrappedLineHeights, setWrappedLineHeights] = useState<number[]>([]);

  const linesRef = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    setWrappedLineHeights(
      linesRef.current.map((line, lineIndex) =>
        line && lineIndex === lastLineIndex
          ? line?.offsetHeight - localOptions.pxCodePaddingBottom
          : line?.offsetHeight
      ) as number[]
    );
  }, [linesRef, lastLineIndex, localOptions.pxCodePaddingBottom]);

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
            style={{
              ...style,
              fontSize: `${localOptions.pxCodeFontSize}px`,
              lineHeight: `${localOptions.pxLineHeight}px`,
              paddingTop: `${localOptions.pxCodePaddingTop}px`,
              overflowY: "scroll",
              overflowX: wrapLines ? "hidden" : "scroll",
            }}
          >
            <div
              className={`${CodeBlockStyles["block-line-numbers-list"]}`}
              style={{
                display: `${showLineNumbers ? "block" : "none"}`,
              }}
            >
              <div
                className={`${CodeBlockStyles["block-line-number-container"]}`}
                style={{
                  backgroundColor: style.backgroundColor as string,
                  paddingLeft: `${localOptions.pxLineNumberPaddingLeft}px`,
                  paddingRight: `${localOptions.pxLineNumberPaddingRight}px`,
                  lineHeight: `${localOptions.pxLineHeight}px`,
                }}
              >
                {tokens.map((line, lineIndex) => {
                  return isCodeEmpty ? null : (
                    <span
                      className={`${CodeBlockStyles["block-line-number"]}`}
                      style={{
                        color: localColorOptions.lineNumberColor,
                        visibility:
                          // hide line number while wrappedLineHeights loads
                          !wrapLines || wrappedLineHeights[lineIndex]
                            ? "visible"
                            : "hidden",
                        height: wrapLines
                          ? `${wrappedLineHeights[lineIndex]}px`
                          : `${localOptions.pxLineHeight}px`,
                      }}
                      key={lineIndex + 1}
                    >
                      {lineIndex + 1}
                    </span>
                  );
                })}
              </div>
            </div>
            <code
              className={`${CodeBlockStyles["code"]}`}
              style={{
                paddingLeft: `${
                  showLineNumbers
                    ? localOptions.pxCodePaddingLeft -
                      localOptions.pxLineNumberPaddingRight
                    : localOptions.pxCodePaddingLeft
                }px`,
                paddingRight: `${localOptions.pxCodePaddingRight}px`,
              }}
            >
              {tokens.map((line, lineIndex) => (
                <div
                  ref={(el) =>
                    linesRef.current ? (linesRef.current[lineIndex] = el) : null
                  }
                  key={lineIndex}
                  {...getLineProps({ line, key: lineIndex })}
                >
                  <span
                    style={{
                      display: "block",
                      whiteSpace: wrapLines ? "pre-wrap" : "pre",
                      paddingBottom:
                        lineIndex === lastLineIndex
                          ? `${localOptions.pxCodePaddingBottom}px`
                          : "0px",
                    }}
                  >
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token, key })} />
                    ))}
                  </span>
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
