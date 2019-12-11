import React from "react"
import axios from "axios"
import NewPostApp from "./NewPostApp"
import ProfileApp from "./ProfileApp"
import UserApp from "./UserApp"
import PostApp from "./PostApp"


class BIGMainApp extends React.Component {

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
           userName: null,
           password: null,
           email: null,
           phone: null,
           firstName: null,
           lastName: null,
           selectedFile: null,
           logInUserName: null,
           logInPassword: null,
           search: "",
           isSearched: false,
           newPostIsClicked: false,
           profileIsClicked: false,
           isRegistered: false,
		   isLoggedIn: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleNewPost = this.handleNewPost.bind(this)
        this.handleProfile = this.handleProfile.bind(this)
        this.handleLogIn = this.handleLogIn.bind(this)
        this.handleRegisterChange = this.handleRegisterChange.bind(this)
		this.handleLogInChange = this.handleLogInChange.bind(this)
		this.handleSelectedFile = this.handleSelectedFile.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleLogOut = this.handleLogOut.bind(this)
		this.handleBoolean = this.handleBoolean.bind(this)
    }



    componentDidMount() {
        axios.get("http://213.136.94.37:2000/posts")
            .then(res => {this.setState({ allPostsData: res.data }) })
        axios.get("http://213.136.94.37:2000/users")
            .then(response => {this.setState({ allUsersData: response.data }) })
    }


//Search
    handleChange(event) {
        this.setState({search: event.target.value})
        event.target.value.length > 0 ? this.setState({ isSearched: true }) : this.setState({ isSearched: false })

        }

//Register & LogIn
    handleRegisterChange(event) {
		this.setState({ [event.target.name]: event.target.value })
	}

	handleLogInChange(event) {
		this.setState({ [event.target.name]: event.target.value })
	}

	handleSelectedFile(event) {
		this.setState({ selectedFile: event.target.files[0] })
	}

    handleSubmit(event) {
		event.preventDefault()
		const fd = new FormData()
		fd.append("username", this.state.userName, this.state.userName.name)
		fd.append("password", this.state.password, this.state.password.name)
		fd.append("email", this.state.email, this.state.email.name)
		fd.append("phone", this.state.phone, this.state.phone.name)
		fd.append("first name", this.state.firstname, this.state.firstname.name)
		fd.append("last name", this.state.lastname, this.state.lastname.name)
		fd.append("picture", this.state.selectedFile, this.state.selectedFile.name)
		axios.post("https://jsonplaceholder.typicode.com/users", fd)
			.then(res => {console.log(res)})
		this.setState({ isRegistered: true })
	}

	handleLogIn() {
//		this.state.allUsers.map(a => a.username === this.state.logInUserName
//			&& a.password === this.state.logInPassword ?
//			this.setState({ isLoggedIn: true })
//			: null)

        this.setState({ isLoggedIn: true })
	}


    handleNewPost(event) {
        this.setState({ newPostIsClicked: true })
    }

    handleProfile() {
        this.setState({ profileIsClicked: true })
    }

    deletePost = (id) => {
	    axios
	        .delete("http://213.136.94.37:2000/posts/${id}")
	        .then(res => {
	            console.log(res)
	            console.log(res.data)
	            })
	}

   	handleLogOut() {
	    this.setState({ isLoggedIn: false })
	}


    handleBoolean() {
        this.setState({ isSearched: false,
                        newPostIsClicked: false,
                        profileIsClicked: false, })
    }


    render() {

        const styles = {
            display: "inline"
        }
        let wordDisplay = this.state.isLoggedIn ? "LogOut" : "LogIn"
        let renderedContent
        let filteredUsers = this.state.allUsersData.allUsers.filter(a => a.username.indexOf(this.state.search) !== -1 )



		if (this.state.isRegistered) {
			if(this.state.isLoggedIn) {
                if (this.state.isSearched) {
                    renderedContent = filteredUsers.map(u => <UserApp uName={u.name} />)
                } else if (this.state.newPostIsClicked) {
                    renderedContent = ( <NewPostApp /> )
                } else if (this.state.profileIsClicked) {
                    renderedContent = ( <ProfileApp
                        registeredUser = {this.state.allUsersData.allUsers.username}
                        postDelete = {this.deletePost}/> )
                } else {
                    renderedContent = this.state.allPostsData.allPosts.map(p =>
                        <PostApp title={p.title} body={p.body} />)
                }
			} else {
                renderedContent = (
                    <form onSubmit={this.handleLogIn}>
                        <input type="text" name="username" value={this.state.logInUserName}
                            onChange={this.handleLogInChange} />
                        <input type="text" name="password" value={this.state.logInPassword}
                            onChange={this.handleLogInChange}/>
                        <button type="submit">LogIn</button>
                    </form>
                )
			}
		} else {
			renderedContent = (
				<form onSubmit={this.handleSubmit}>
					<input type="text" name="username" value={this.state.allUsersData.allUsers.username}
						placeholder="userName" onChange={this.handleRegisterChange} /><br />
					<input type="text" name="password" value={this.state.allUsersData.allUsers.password}
						placeholder="password" onChange={this.handleRegisterChange}/><br />
					<input type="text" name="email" value={this.state.allUsersData.allUsers.email}
						placeholder="email" onChange={this.handleRegisterChange} /><br />
					<input type="text" name="phone" value={this.state.allUsersData.allUsers.tel}
						placeholder="phone" onChange={this.handleRegisterChange} /><br />
					<input type="text" name="first name" value={this.state.allUsersData.allUsers.firstName}
						placeholder="firstName" onChange={this.handleRegisterChange} /><br />
					<input type="text" name="last name" value={this.state.allUsersData.allUsers.lastName}
						placeholder="lastName" onChange={this.handleRegisterChange} /><br />
					<input type="file" value={this.state.allUsersData.allUsers.picture}
						onChange={this.handleSelectedFile} /><br />
					<button type="submit" onClick={this.handleRegister}>Register</button>
				</form>
			)
		}






        return(
            <div>
                <ul >
                    <li style={styles}><button onClick={this.handleBoolean}>Menu</button></li>&nbsp;
                    <li style={styles}>
                        <input
                            type="text"
                            placeholder="search people"
                            name="search"
                            value={this.state.search}
                            onChange={this.handleChange}
                        />
                    </li>
                    <li style={styles}><button onClick={this.handleNewPost}>New Post</button></li>
                    <li style={styles}><button onClick={this.handleProfile}>Profile</button></li>
                    <li style={styles}><button onClick={this.handleLogOut}>{wordDisplay}</button></li>
                </ul>
                <div>
                    {renderedContent}
                </div>
            </div>
        )
    }
}

export default BIGMainApp