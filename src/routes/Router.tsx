import { BrowserRouter, Switch, Route, HashRouter } from "react-router-dom";
import Coin from "./Coin";
import Coins from "./Coins";

interface IRouterProps {
  toggleDark: () => void;
  isDark: boolean;
}

function Router({ toggleDark, isDark }: IRouterProps) {
  return (
    <HashRouter>
      <Switch>
        <Route path="/:coinId">
          <Coin isDark={isDark} />
        </Route>
        <Route path="/">
          <Coins isDark={isDark} toggleDark={toggleDark} />
        </Route>
      </Switch>
    </HashRouter>
  );
}
export default Router;
