import { Html, Head, Main, NextScript } from 'next/document'

export default function Document () {
  return (
    <Html lang='en'>
      <Head>
        <title>Learn From Index Zero</title>
      </Head>
      <body className='antialiased'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
