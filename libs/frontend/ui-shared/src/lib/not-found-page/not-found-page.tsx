import './not-found-page.module.scss';
import { Navbar } from '../..';

/* eslint-disable-next-line */
export interface NotFoundPageProps {}

export function NotFoundPage(props: NotFoundPageProps) {
  return (
    <>
      <Navbar />
      <div>
        <h1>404: Page Not Found</h1>
      </div>
    </>
  );
}

export default NotFoundPage;
