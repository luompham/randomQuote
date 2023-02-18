

const primaryColor = [
    '#16a085',
    '#27ae60',
    '#2c3e50',
    '#f39c12',
    '#e74c3c',
    '#9b59b6',
    '#FB6964',
    '#342224',
    '#472E32',
    '#BDBB99',
    '#77B1A9',
    '#73A857'
];

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quote: '',
            author: '',
            color: '',
            visible: false
        }
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.handleClick();

    }

    handleClick() {

        fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json').then(res => res.json())
            .then(quoteArray => {
                // console.log(quoteArray.quotes[0].quote)

                const randomIndex = Math.floor(Math.random() * quoteArray.quotes.length)
                const randomColorIndex = Math.floor(Math.random() * primaryColor.length)

                this.setState({

                    quote: quoteArray.quotes[randomIndex].quote,
                    author: quoteArray.quotes[randomIndex].author,
                    color: primaryColor[randomColorIndex],
                    visible: !this.state.visible
                });

                $('.quote-text')[0].animate({ opacity: 0 }, 500, function () {
                    $(this).animate({ opacity: 1 }, 500);
                    //  $('#text').text(randomQuote.quote);
                });

                $('.app-wrapper')[0].animate({ opacity: 0 }, 500, function () {
                    $(this).animate({ opacity: 1 }, 500);
                    //  $('#text').text(randomQuote.quote);
                });

            })

    }



    render() {
        const visible = this.state.visible ? 'fadeIn' : 'fadeOut'
        return (
            <div style={{ backgroundColor: this.state.color }} className="app-wrapper">
                <div className="wrapper">
                    <div className="header" id="quote-box">

                        <div style={{ color: this.state.color }} className={'quote-text ' + visible} id="text">
                            <i className="quote-icon bi bi-quote"></i>
                            <span>{this.state.quote}</span>
                        </div>

                        <div style={{ color: this.state.color }} className="quote-author" id="author">- {this.state.author}
                        </div>
                        <div className="button" id="new-quote">
                            <div className="button-icons">
                                <a href={"https://twitter.com/intent/tweet?hashtags=quotes&related=luompham&text=" +
                                    encodeURIComponent('"' + this.state.quote + '" ' + this.state.author)}

                                    target="_blank" style={{ backgroundColor: this.state.color }} id="tweet-quote">
                                    <i className="bi bi-twitter"></i>
                                </a>
                                <a href={"https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=" +
                                    encodeURIComponent(this.state.quote)
                                    + '&content=' + encodeURIComponent(this.state.author) +
                                    '&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button'
                                }

                                    target="_blank" style={{ backgroundColor: this.state.color }} id="post-quote">
                                    <i className="fa fa-tumblr"></i>
                                </a>
                            </div>

                            <button style={{ backgroundColor: this.state.color }} type="button" className="new-quote-btn"
                                onClick={this.handleClick}>New quote</button>
                        </div>

                    </div>

                    <div style={{ backgroundColor: this.state.color }} className='footer'>by luompham

                    </div>

                </div>

            </div>
        )
    }
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);