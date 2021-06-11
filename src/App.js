import React from 'react';
import './css/App.css';
import {Link, Redirect, Route, Switch} from "react-router-dom";
import Home from "./routes/Home";
import {Nav, Navbar} from 'react-bootstrap';
import Fake from "./routes/Fake";

//при возникновении надоедливых ошибок про лицензию
//закоментировать в файле node_modules/@material-ui/x-license/dist/esm/index.js строку
// console.error(["********************

const NavBar = () => (
    <div>
        <Navbar bg="dark" variant="dark" className="mb-4">
            <Nav className="mr-auto">
                <li><Link className="navbar-brand" to='/'>Линия производства выпечки</Link></li>
                {/*<li><Link className="nav-link" to='/fake'>Эмулятор оборудования</Link></li>*/}
            </Nav>
        </Navbar>
    </div>
)

const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/fake' component={Fake}/>
            <Redirect to="/"/>
        </Switch>
    </main>
)

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <NavBar/>
                <Main/>
            </div>
        );
    }
}

export default App;