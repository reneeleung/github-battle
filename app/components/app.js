import React from 'react';
import Popular from './Popular';
import Results from './Results';
import Battle from './Battle';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; /* named import */
import Nav from './Nav';

class App extends React.Component {
    render() {
        return (
            <Router>
                <div className='container'>
                    <Nav/>
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route exact path='/battle' component={Battle} />
                        <Route path='/battle/results' component={Results} />
                        <Route path='/popular' component={Popular} />
                        <Route render={() => <p>Not Found</p>} />
                    </Switch>
                </div>  
            </Router>
        )
    }
}

export default App;