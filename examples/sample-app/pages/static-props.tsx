type WithStaticPropsProps = {
  title: string;
  myGreatProp: string;
};

export default function WithStaticProps({ myGreatProp }: WithStaticPropsProps) {
  return <div>This page has static props. And it says: {myGreatProp}!</div>;
}

export const props: WithStaticPropsProps = {
  title: 'With Static Props',
  myGreatProp: 'Hello World',
};
