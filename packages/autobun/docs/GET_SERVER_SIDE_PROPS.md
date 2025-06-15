# getServerSideProps

Each page in your application can export a getServerSideProps-like function. This function runs on the server and allows you to fetch data to pass as props to your pages or app.

## Page

To get server-side props for a page, create a file with the same name as the page but with `.props.ts` extension.

For example, for `pages/test/[id].ts`:

```tsx:pages/test/[id].props.ts
export default async function getServerSideProps({ route }) {
  const title = 'Test ' + route.params.id;
  return { title };
}
```

Alternatively, if props are static, you can export them directly from the page file:

```tsx:pages/mypage.tsx
export const props = {
  title: 'My Page'
};
```

## App

To get server-side props at the application level, use the `pages/_app.props.ts` file:

```tsx:pages/_app.props.ts
export default async function getServerSideProps(ctx, pageProps) {
  return {
    pageProps,
    appProps: {},
    documentProps: {
      title: pageProps.title || 'Default title',
    },
  };
}
```

The function accepts context and page props and returns an object containing data for the page, app, and document.

This allows you to explicitly enrich more common data (like data for the document) with page-specific data.
