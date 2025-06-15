type WithServerPropsProps = {
  appName: string;
};

export default function WithServerProps({ appName }: WithServerPropsProps) {
  return <div>This page has server props. App name: {appName}</div>;
}
