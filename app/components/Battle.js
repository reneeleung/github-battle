const React = require('react');
const PropTypes = require('prop-types');
const Link = require('react-router-dom').Link;
const PlayerPreview = require('./PlayerPreview');

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
        const value = event.target.value;
        
        this.setState(() => ({ username: value }))
    }
    handleSubmit(event) {
        event.preventDefault(); /* avoids form to submit to a server */
        this.props.onSubmit(this.props.id, this.state.username); /* call parent's handleSubmit */
    }

    render() {
        const { username } = this.state; /* destructuring */
        const { label } = this.props;
        return (
            <form className='column' onSubmit={this.handleSubmit /* button is 'submit' type */}>
                <label className='header' htmlFor='username'>
                    {label}
                </label>
                <input
                    id='username'
                    placeholder='github username'
                    type='text'
                    autoComplete='off' 
                    alue={username}
                    onChange={this.handleChange} 
                />
                <button
                    className='button'
                    type='submit'
                    disabled={!username}>
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
        this.setState(() => ({
            /* ES6 computed property names */
            [id + 'Name']: username,
            [id + 'Image']: `https://github.com/${username}.png?size=200`
        }))
    }
    handleReset(id) {
        this.setState(() => ({
            [id + 'Name']: '',
            [id + 'Image']: null
        }))
    }
    render () {
        const { match } = this.props;
        const { playerOneName, playerTwoName, playerOneImage, playerTwoImage } = this.state;
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
                            onClick={() => this.handleReset('playerOne')}>
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
                                onClick={() => this.handleReset('playerOne')}>
                                Reset
                            </button>
                        </PlayerPreview>
                    }
                </div>
                {playerOneImage && playerTwoImage &&
                    <Link className='button' to={{
                        pathname: match.url + '/results',
                        search: `?playerOneName=${playerOneName}&playerTwoName=${playerTwoName}`
                    }}>Battle</Link>
                }
            </div>
        )
    }
}

module.exports = Battle;