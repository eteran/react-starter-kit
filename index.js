// https://www.reddit.com/r/javascript/comments/332v73/is_anyone_using_es6_in_a_large_project_hows_it/cqh2u7i
import hex from 'hex-rgb';

const rgb = (str) => hex(str).map(x => x / 255);

import React from 'react';

// http://www.newmediacampaigns.com/blog/refactoring-react-components-to-es6-classes
// stopgap until ES7 allows property initializers
// https://facebook.github.io/react/blog/2015/01/27/react-v0.13.0-beta-1.html
class BaseComponent extends React.Component {
	_bind(...methods) {
		methods.forEach((method) => this[method] = this[method].bind(this));
	}
}

// https://facebook.github.io/react/docs/two-way-binding-helpers.html
class NoLink extends BaseComponent {
	constructor(props) {
		super(props);
		this.state = {
			message: '#abde13',
			someStyle: {
				color: 'white',
				backgroundColor: 'blue'
			}
		};
		this._bind('handleChange');
	}

	handleChange(event) {
		this.setState({message: event.target.value, someStyle: {color: 'white', backgroundColor: event.target.value}});
	}

	render() {
		var message = this.state.message;
		return (
			<div>
				<input style={this.state.someStyle} type="text" value={message} onChange={this.handleChange}/>
				<input type="text" value={rgb(message)} readOnly/>
			</div>
		)
	}
}

React.render(
	<NoLink txt="some text"/>,
	document.getElementById('app')
);
