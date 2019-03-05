var React = require('react');

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
        var languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python'];

        return (
            <ul className='languages'>
                {languages.map(function(lang) {
                    return (
                        <li 
                        style={lang === this.state.selectedLanguage ? { color: '#d0021b' } : null}    
                        onClick={this.updateLanguage.bind(null /* already binded line 9 */, lang)}
                            key={lang}>
                            {lang}
                        </li>
                    )
                }, this /* 'this' allows the function to refer 'this' to the Popular component */)}
            </ul>
        )
    }
}

module.exports = Popular;