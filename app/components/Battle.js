var React = require('react');
var PropTypes = require('prop-types');
var Link = require('react-router-dom').Link;
var PlayerPreview = require('./PlayerPreview');

class PlayerInput extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            username: ''
        }

        this.handleChange = this.handleChange.bind(this); /* allows 'this' in handleChange to refer to 'this' component */
        this.handleSubmit = this.handleSubmit.bind(this); /* allows 'this' in handleSubmit to refer to 'this' component */
    }

    handleChange(event) {
        var value = event.target.value;
        
        this.setState(function() {
            return {
                username: value
            }
        })
    }
    handleSubmit(event) {
        event.preventDefault(); /* avoids form to submit to a server */
        this.props.onSubmit(this.props.id, this.state.username); /* call parent's handleSubmit */
    }

    render() {
        return (
            <form className='column' onSubmit={this.handleSubmit /* button is 'submit' type */}>
                <label className='header' htmlFor='username'>
                    {this.props.label}
                </label>
                <input
                    id='username'
                    placeholder='github username'
                    type='text'
                    autoComplete='off' 
                    alue={this.state.username}
                    onChange={this.handleChange} 
                />
                <button
                    className='button'
                    type='submit'
                    disabled={!this.state.username}>
                    Submit
                </button>
            </form>
        )
    }
}
PlayerInput.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired
}

class Battle extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            playerOneName: '',
            playerTwoName: '',
            playerOneImage: null,
            playerTwoImage: null
        }
        this.handleSubmit = this.handleSubmit.bind(this); /* Whenever handleSubmit is called, it will bind to 'this' component */
        this.handleReset = this.handleReset.bind(this); /* Whenever handleReset is called, it will bind to 'this' component */
    }

    handleSubmit(id, username) {
        this.setState(function() {
            var newState = {};
            newState[id + 'Name'] = username;
            newState[id + 'Image'] = 'https://github.com/' + username + '.png?size=200';
            return newState;
        });
    }
    handleReset(id) {
        this.setState(function() {
            var newState = {};
            newState[id + 'Name'] = '';
            newState[id + 'Image'] = null;
            return newState;
        })
    }
    render () {
        var match = this.props.match;
        var playerOneName = this.state.playerOneName;
        var playerTwoName = this.state.playerTwoName;
        var playerOneImage = this.state.playerOneImage;
        var playerTwoImage = this.state.playerTwoImage;
        return (
            <div>
                <div className='row'>
                    {!playerOneName &&
                        <PlayerInput id='playerOne' label='Player One' onSubmit={this.handleSubmit}/>
                    }
                    {playerOneImage !== null &&
                        <PlayerPreview
                            avatar={playerOneImage} 
                            username={playerOneName}>
                            <button
                                className='reset'
                                onClick={this.handleReset.bind(null, 'playerOne')}>
                                Reset
                            </button>
                        </PlayerPreview>
                    }

                    {!playerTwoName &&
                        <PlayerInput id='playerTwo' label='Player Two' onSubmit={this.handleSubmit}/>
                    }
                    {playerTwoImage !== null &&
                        <PlayerPreview
                            avatar={playerTwoImage} 
                            username={playerTwoName}>
                            <button
                                className='reset'
                                onClick={this.handleReset.bind(null, 'playerOne')}>
                                Reset
                            </button>
                        </PlayerPreview>
                    }
                </div>
                {playerOneImage && playerTwoImage &&
                    <Link className='button' to={{
                        pathname: match.url + '/results',
                        search: '?playerOneName=' + playerOneName + '&playerTwoName=' + playerTwoName
                    }}>Battle</Link>
                }
            </div>
        )
    }
}

module.exports = Battle;