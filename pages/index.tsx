import type { NextPage } from "next";
import Head from "next/head";
import Container from "@/design_systems/mainds/components/Container";
import CodeBlock from "@/components/CodeBlock";

const codeString = `import type { NextPage } from "next";
import Head from "next/head";
import Container from "@/design_systems/mainds/components/Container";
import CodeBlock, { defaultCodeString } from "@/components/CodeBlock";
const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="This Next.js app was generated using create-next-app." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Container type="screen-sm">
          <div style={{ margin: "128px auto" }}>
            <CodeBlock code={defaultCodeString} />
          </div>
        </Container>
      </main>
    </div>
  );
};
export default Home;
`;

const CodeBlockHeading = ({ children }: { children: string }) => {
  return (
    <h2
      style={{
        fontSize: "15px",
        fontWeight: "500",
        marginBottom: "8px",
      }}
    >
      {children}
    </h2>
  );
};

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>CodeBlock Component</title>
        <meta name="description" content="CodeBlock Component Mini Project." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Container type="screen-sm">
          <div style={{ margin: "128px auto" }}>
            <div style={{ margin: "80px auto" }}>
              <CodeBlockHeading>Default Code Block</CodeBlockHeading>
              <CodeBlock code={codeString} />
            </div>
            <div style={{ margin: "80px auto" }}>
              <CodeBlockHeading>Hide Line Numbers</CodeBlockHeading>
              <CodeBlock code={codeString} showLineNumbers={false} />
            </div>
            <div style={{ margin: "80px auto" }}>
              <CodeBlockHeading>Wrap Lines</CodeBlockHeading>
              <CodeBlock code={codeString} wrapLines={true} />
            </div>
          </div>
          <div style={{ margin: "80px auto" }}>
            <CodeBlockHeading>Tabs and Files</CodeBlockHeading>
            <CodeBlock
              files={{
                "/App.tsx": {
                  code: codeString,
                },
                "/App2.css": {
                  code: `* {
  box-sizing: border-box;
}`,
                },
              }}
            />
          </div>
        </Container>
      </main>
    </div>
  );
};

export default Home;
