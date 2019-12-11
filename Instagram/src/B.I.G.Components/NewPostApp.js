import React from "react"
import axios from "axios"


class NewPostApp extends React.Component {
	constructor() {
		super()
		this.state = {
            selectedFile: null,
            descriptionText: ""
		}
		this.fileSelectedHandler = this.fileSelectedHandler.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	fileSelectedHandler(event) {
		this.setState({ selectedFile: event.target.files[0] })
	}

	handleSubmit() {
		const fd = new FormData()
		fd.append("image", this.state.selectedFile, this.state.selectedFile.name)
		fd.append("description", this.state.descriptionText,this.state.descriptionText.name)
		axios
            .post("http://213.136.94.37:2000/posts", fd)
            .then(res => {
                console.log(res)
                console.log(res.data)
            })
	}

	render() {
		return(
			<form onSubmit={this.handleSubmit}>
				<input type="file" onChange="fileSelectedHandler"/>
				<textarea></textarea>
				<button type="submit">Submit</button>
			</form>
		)
	}

}


export default NewPostApp