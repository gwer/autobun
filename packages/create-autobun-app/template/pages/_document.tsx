import { type FunctionComponent } from 'preact';
import { type DocumentFullProps } from 'autobun';

const Document: FunctionComponent<DocumentFullProps> = ({
  title,
  ctx,
  children,
}) => {
  const { styles, hydrationScripts } = ctx;

  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title}</title>
        {styles}
      </head>
      <body>
        {children}
        {hydrationScripts}
      </body>
    </html>
  );
};

export default Document;
