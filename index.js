

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
            color: ''
        }
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.handleClick();

        console.log(document.querySelectorAll('.app-wrapper')[0])
        console.log($('.quote-text')[0])

        // $('.quote-text')[0].animate({ opacity: 0 }, 500, function () {
        //     $(this).animate({ opacity: 1 }, 500);
        //     //  $('#text').text(randomQuote.quote);
        // });

        //  document.querySelectorAll('.app-wrapper')[0].classList.add('my-animate')

    }

    handleClick() {

        fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json').then(res => res.json())
            .then(quoteArray => {
                console.log(quoteArray.quotes[0].quote)

                const randomIndex = Math.floor(Math.random() * quoteArray.quotes.length)
                const randomColorIndex = Math.floor(Math.random() * primaryColor.length)
                this.setState({

                    quote: quoteArray.quotes[randomIndex].quote,
                    author: quoteArray.quotes[randomIndex].author,
                    color: primaryColor[randomColorIndex]
                });

                $('.quote-text')[0].animate({ opacity: 0 }, 700, function () {
                    $(this).animate({ opacity: 1 }, 700);
                    //  $('#text').text(randomQuote.quote);
                });

            })


        // this.setState(() => {
        //     const randomIndex = Math.floor(Math.random() * randomQuote.length)
        //     return {
        //         quote: randomQuote[randomIndex].quote,
        //         author: randomQuote[randomIndex].author,
        //         color: primaryColor.color
        //     }
        // })
    }



    render() {

        return (
            <div style={{ backgroundColor: this.state.color }} className="app-wrapper">
                <div className="wrapper">
                    <div className="header">

                        <div style={{ color: this.state.color }} className="quote-text" id="text-box">
                            <i className="quote-icon bi bi-quote"></i>
                            <span>{this.state.quote}</span>
                        </div>

                        <div style={{ color: this.state.color }} className="quote-author" id="author">- {this.state.author}
                        </div>
                        <div className="button">
                            <div className="button-icons">
                                <a style={{ backgroundColor: this.state.color }} id="tweet-quote">
                                    <i className="bi bi-twitter"></i>
                                </a>
                                <a style={{ backgroundColor: this.state.color }} id="post-quote">
                                    <i className="fa fa-tumblr"></i>
                                </a>
                            </div>

                            <button style={{ backgroundColor: this.state.color }} type="button" className="new-quote-btn"
                                onClick={this.handleClick} id="new-quote">New quote</button>
                        </div>

                    </div>

                    <div className='footer'>

                    </div>

                </div>

            </div>
        )
    }
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);