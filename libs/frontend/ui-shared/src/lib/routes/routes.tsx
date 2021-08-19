import './routes.module.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Loginpage, NotFoundPage, Register } from '../..';
import Projectboard from '../projectboard/projectboard';
import Projectboardslist from '../projectboardslist/projectboardslist';

/* eslint-disable-next-line */
export interface RoutesProps {}

export function Routes(props: RoutesProps) {
  return (
    <Router>
      <div className="App">
        <div id="page-body">
          <Switch>
            <Route path="/" component={Loginpage} exact />
            <Route path="/login-page" component={Loginpage} exact />
            <Route path="/projectBoard/:name" component={Projectboard} exact />
            <Route
              path="/Project-Boards-List"
              component={Projectboardslist}
              exact
            />
            <Route path="/register" component={Register} exact />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default Routes;
