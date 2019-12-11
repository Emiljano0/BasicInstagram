import React from "react"
import axios from "axios"


class JSONNewPostApp extends React.Component {
	constructor() {
		super()
		this.state = {
           userID: null,
           Title: null,
           Body: null
		}
		this.handleNewPostChange = this.handleNewPostChange.bind(this)
		this.handleSubmitNewPost = this.handleSubmitNewPost.bind(this)
	}

    handleNewPostChange(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmitNewPost(event) {
        event.preventDefault()

        const POST = {
           userId: this.state.userID,
           title: this.state.Title,
           body: this.state.Body
        }

        axios
            .post("https://jsonplaceholder.typicode.com/posts", { POST })
            .then(res => {
                console.log(res)
                console.log(res.data)
            })

        this.setState({ newPostIsClicked: false })
    }

	render() {
		return(
            <form onSubmit={this.handleSubmitNewPost} >
                 <input type="text" name="userID" onChange={this.handleNewPostChange} value={this.state.userID}
                     placeholder="userID"/><br />
                 <input type="text" name="Title" onChange={this.handleNewPostChange} value={this.state.Title}
                     placeholder="Title"/><br />
                 <input type="text" name="Body" onChange={this.handleNewPostChange} value={this.state.Body}
                     placeholder="Body"/> <br />
                 <button type="submit">Submit New Post</button>
             </form>
        )
	}

}


export default JSONNewPostApp