import React from "react"
import axios from "axios"


class ProfileApp extends React.Component {

	constructor() {
		super()
		this.state = {
           allPostsData: {
               message: null,
               statusCode: null,
               allPosts: []
           },
           allUsersData: {
               allUsers :[],
               statusCode:null
           },
			postsArray: [],
			searchValue: ""
		}
		this.handleChange = this.handleChange.bind(this)
	}


	 componentDidMount() {
        axios
            .get("http://213.136.94.37:2000/posts")
            .then(res => {this.setState({ allPostsData: res.data }) })
        axios
            .get("http://213.136.94.37:2000/users")
            .then(response => {this.setState({ allUsersData: response.data }) })
    }


	handleChange(event) {
		this.setState({[event.target.name]: event.target.value})
		this.setState({ postsArray: this.state.allUsersData.allUsers.map(a => this.state.allPostsData.allPosts.map
			(b => b.userId === a.id && a.name === event.target.value ?
				<ul style={{ border: "1px solid" }}>
				    <li>{b.title}</li>
				    <li>{b.body}</li>
				    {/* This Should Work
                    <li style={{display: a.username === this.props.registeredUser ? null : "none"}}>
                        <button>Delete Post</button>
                    </li>
                    */}
                    <li style={{display: a.username === this.props.registeredUser ? "none" : null}}>
                        <button type="submit" onClick={() => {this.props.postDelete(b._id)}}> Delete Post </button>
                    </li>
				</ul> : null ) ) })
	}

	render() {
	    const renderedContent = this.state.postsArray
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


export default ProfileApp