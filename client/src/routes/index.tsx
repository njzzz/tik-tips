import React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import Tips from '../container/tipsContainer';
import Menus from '../components/menus/index';
import HeaderOperate from '../components/headerOperate';
import Demo from '../container/counterContainer';
import Welcome from '../pages/welcome';
import './index.scss';
const routes = (
    <section>
        <header className="main_header">
            <HeaderOperate/>
        </header>
        <section className="main_body">
            <aside className="main_body__left_sider_bar">
                <Menus className="main_body__menu"/>
            </aside>
            <main className="main_body__main">
                <section className="main_body__main__content">
                    <Switch>
                        <Route exact path="/" component={Welcome}/>
                        <Route path="/tips" component={Tips}/>
                        <Route path="/times" component={Demo}/>
                        <Route path="/userCenter" component={Tips}/>
                        <Redirect to="/" />
                    </Switch>
                </section>
            </main>
        </section>
    </section>
);
  
  export default routes