var React = require('react');
var NodeStore = require('../stores/NodeStore');
var NodeActions = require('../actions/NodeActions');
var Node = require('./Node.jsx');

var Nodes = React.createClass({
    getInitialState() {
        return NodeStore.getState();
    },

    componentDidMount() {
        NodeStore.listen(this.onChange);
        NodeActions.fetchNodes();
    },

    componentWillUnmount() {
        NodeStore.unlisten(this.onChange);
    },

    onChange(state) {
        this.setState(state);
    },

    render() {
        if (!this.state.nodes.length) {
            return (
                <div className="pure-g nodes">
                    <div className="pure-u-1-1 loading">
                        <h2>Loading...</h2>
                    </div>
                </div>
            );
        }

        this.state.nodes.sort(function(a, b) {
            return a.node_id - b.node_id;
        })

        return (
            <div className="pure-g nodes">
                {this.state.nodes.map((node) => {
                    return (<Node node={node} />);
                })}
            </div>
        );
    },
});

module.exports = Nodes;
