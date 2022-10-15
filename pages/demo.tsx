import type { NextPage } from "next";
import Head from "next/head";
import CodeBlock from "@/components/CodeBlock";
import { DefaultFCLayout } from "@/design_systems/mainds/layouts/FrameLayout";
import { codeString } from ".";

const PARENT_APP_URL =
  process.env.NEXT_PUBLIC_PARENT_APP_URL ??
  "https://www.ayoakindele.com/mini-projects/codeblock-component";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Demo</title>
        <meta name="description" content="CodeBlock component demo page." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <DefaultFCLayout parentURL={PARENT_APP_URL}>
        {({ childHeight }) => {
          return (
            <CodeBlock
              code={codeString}
              options={{
                pxBorderRadius: 0,
                pxHeight: childHeight,
              }}
            />
          );
        }}
      </DefaultFCLayout>
    </div>
  );
};

export default Home;
