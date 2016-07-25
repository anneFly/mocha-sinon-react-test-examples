const React = require('react');


class StarterView extends React.Component {
    render () {
        return (
            <div>
                Now serving <span className="dish">{this.props.dish}</span>.
                <span className="icon-yummy"></span>
            </div>
        );
    }
}

const OPTIONS = ['meat', 'fish', 'tofu'];
class MainCourseView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    chooseMeal (event) {
        const choice = event.target.value;
        this.setState({selected: choice});
    }

    renderOptions (opt) {
        return <input type="radio" key={opt} value={opt} onChange={this.chooseMeal.bind(this)} />;
    }

    render () {
        if (this.state.selected) {
            return <div className="selection">You will get {this.state.selected}.</div>;
        } else {
            return <div>{OPTIONS.map(this.renderOptions.bind(this))}</div>;
        }
    }
}


class SushiView extends React.Component {
    constructor (props) {
        super(props);
        this.state = {eatSushi: true};
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.type != this.props.type) {
            this.setState({eatSushi: true});
        } else {
            this.setState({eatSushi: false});
        }
    }

    render () {
        if (this.state.eatSushi) {
            return <p>Om nom nom nom</p>;
        } else {
            return <p>next please</p>;
        }
    }
}


class RollingSushi extends React.Component {
    constructor(props) {
        super(props);
        this.state = {sushiType: 'maki'};
    }

    componentDidMount () {
        this.getSushi();
    }

    getSushi () {
        $.ajax({
            url: 'get/sushi/',
            success: (response) => {
                this.setState({sushiType: response.type});
                window.setTimeout(this.getSushi.bind(this), 5000);
            }
        });
    }

    render () {
        return (
            <div>
                How about {this.state.sushiType}?
                <SushiView type={this.state.sushiType} />
            </div>
        )
    }
}

module.exports = {
    StarterView,
    MainCourseView,
    SushiView,
};
