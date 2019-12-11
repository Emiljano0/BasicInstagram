import React from "react"
import axios from "axios"


class JSONProfileApp extends React.Component {

	constructor() {
		super()
		this.state = {
			allUsers: [],
			allPosts: [],
			contentArray: [],
			searchValue: ""
		}
		this.handleChange = this.handleChange.bind(this)
	}


	 componentDidMount() {
        axios
            .get("https://jsonplaceholder.typicode.com/posts")
            .then(res => {this.setState({ allPosts: res.data }) })
        axios
            .get("https://jsonplaceholder.typicode.com/users")
            .then(response => {this.setState({ allUsers: response.data }) })
    }


	handleChange(event) {
		this.setState({[event.target.name]: event.target.value})
		this.setState({ contentArray: this.state.allUsers.map(a => this.state.allPosts.map
			(b => b.userId === a.id && a.name === event.target.value ?
				<ul style={{ border: "1px solid" }}>
                    <li>{b.title}</li>
                    <li>{b.body}</li>
                    {/* This Should Work
                    <li style={{display: a.name === this.props.registeredUser ? null : "none"}}>
                        <button>Delete Post</button>
                    </li>
                    */}
                    <li style={{display: a.name === this.props.registeredUser ? "none" : null}}>
                        <button type="submit" onClick={() => {this.props.postDelete(b.id)}}> Delete Post </button>
                    </li>
				</ul> : null ) ) })
	}



	render(props) {
	    const renderedContent = this.state.contentArray

		return(
            <div>
                <input
                    type="text"
                    placeholder="Search people"
                    name="searchValue"
                    value={this.state.searchValue}
                    onChange={this.handleChange}
                />
                {renderedContent}
            </div>
		)

	}

}


export default JSONProfileApp