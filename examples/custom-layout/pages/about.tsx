import { type ComponentChildren } from 'preact';
import SidebarLayout from '../components/SidebarLayout';

const AboutPage = () => {
  return <div>About Page</div>;
};

AboutPage.getLayout = (page: ComponentChildren) => {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default AboutPage;
