import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {

  return (
    <Html lang="en">
      <Head>
        <title>Next film App | Search films, series and actors online</title>
        <meta
          name="description"
          content="Next.js film application. Searching all the nesessary information
          about any film, series and actor."
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
