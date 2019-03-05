var React = require('react');
var PropTypes = require('prop-types')

class SelectLanguage extends React.Component {
    render() {
        var languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python'];

        return (
            <ul className='languages'>
                {languages.map(function(lang) {
                    return (
                        <li 
                        style={lang === this.props.selectedLanguage ? { color: '#d0021b' } : null}    
                        onClick={this.props.onSelect.bind(null /* already binded line 9 */, lang)}
                            key={lang}>
                            {lang}
                        </li>
                    )
                }, this /* 'this' allows the function to refer 'this' to the Popular component */)}
            </ul>
        )
    }
}

SelectLanguage.propTypes = {
    selectedLanguage: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired
}

class Popular extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            selectedLanguage: 'All'
        };
        this.updateLanguage = this.updateLanguage.bind(this); /* Always have updateLanguage called in the correct component*/
    }
    updateLanguage(lang) {
        this.setState(function() {
            return {
                selectedLanguage: lang
            }
        });
    }
    render() {

        return (
            <div>
                <SelectLanguage
                    selectedLanguage={this.state.selectedLanguage}
                    onSelect={this.updateLanguage}
                />
            </div>
        )
    }
}

module.exports = Popular;