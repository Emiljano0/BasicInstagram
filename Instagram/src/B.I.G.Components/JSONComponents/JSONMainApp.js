import React from "react"
import axios from "axios"
import JSONNewPostApp from "./JSONNewPostApp"
import JSONProfileApp from "./JSONProfileApp"
import JSONPostApp from "./JSONPostApp"
import JSONUserApp from "./JSONUserApp"


class JSONMainApp extends React.Component {

    constructor() {
        super()
        this.state = {
           allUsers: [],
           allPosts: [],
           registerDataName: null,
           logInUserName: null,
           logInArray: [],

           search: "",
           isSearched: false,
           newPostIsClicked: false,
           profileIsClicked: false,
		   isLoggedIn: false
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleNewPost = this.handleNewPost.bind(this)
        this.handleProfile = this.handleProfile.bind(this)
        this.handleLogIn = this.handleLogIn.bind(this)
        this.handleRegisterChange = this.handleRegisterChange.bind(this)
		this.handleLogInChange = this.handleLogInChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleLogOut = this.handleLogOut.bind(this)
		this.handleBoolean = this.handleBoolean.bind(this)
    }



    componentDidMount() {
        axios.get("https://jsonplaceholder.typicode.com/posts")
            .then(res => {this.setState({ allPosts: res.data }) })
        axios.get("https://jsonplaceholder.typicode.com/users")
            .then(response => {this.setState({ allUsers: response.data }) })
    }


//Search
    handleChange(event) {
        this.setState({search: event.target.value})
        event.target.value.length > 0 ? this.setState({ isSearched: true }) : this.setState({ isSearched: false })

        }

//Register & LogIn
    handleRegisterChange(event) {
		this.setState({ registerDataName: event.target.value })
	}

	handleLogInChange(event) {
		this.setState({ logInUserName: event.target.value })
	}

    handleSubmit(event) {
		event.preventDefault()
        const USER = {
           name: this.state.registerDataName
        }
        axios
            .post("https://jsonplaceholder.typicode.com/users", { USER })
            .then(res => {
                console.log(res)
                console.log(res.data)
            })
        this.setState({ isRegistered: true })
	}

	handleLogIn(event) {
	    event.preventDefault()
//????????
//	    console.log(this.state.isLoggedIn)
//	    this.state.jada = this.state.allUsers.map(a => a.name === this.state.logInUserName ?
//	        <div>{a.name}</div> : <div></div> )
//        this.state.jada.length > 0 ? this.setState(prevState => { return {isLoggedIn: !prevState.isLoggedIn} }) :
//            this.setState({ isLoggedIn:false })
//	    console.log("YOu are logged IN", this.state.isLoggedIn)

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
	        .delete("https://jsonplaceholder.typicode.com/posts/${id}")
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
        let filteredUsers = this.state.allUsers.filter(a => a.name.indexOf(this.state.search) !== -1 )

		if (this.state.isRegistered) {
			if(this.state.isLoggedIn) {
                if (this.state.isSearched) {
                    renderedContent = filteredUsers.map(u => <JSONUserApp uName={u.name} />)
                } else if (this.state.newPostIsClicked) {
                    renderedContent = ( <JSONNewPostApp /> )
                } else if (this.state.profileIsClicked) {
                    renderedContent = ( <JSONProfileApp
                        registeredUser = {this.state.registerDataName}
                        postDelete = {this.deletePost}/> )
                } else {
                    renderedContent = this.state.allUsers.map(u => this.state.allPosts.map(p =>
                        <div style={{display: u.id === p.userId ? null : "none" }}>
                            <JSONPostApp title={p.title} body={p.body} User={u.id === p.userId ? u.name : null}/>
                        </div>
                           )
                        )
                }
			} else {
                renderedContent = (
                    <form onSubmit={this.handleLogIn}>
                        <input type="text" name="logInUserName" placeholder="Put Name"
                        value={this.state.logInUserName} onChange={this.handleLogInChange} />
                        <button type="submit" >LogIn</button>
                    </form>
                )
			}
		} else {
			renderedContent = (
	            <form onSubmit={this.handleSubmit}>
                    <input type="text" name="registerDataName" placeholder="Name"
                    value={this.state.registerDataName} onChange={this.handleRegisterChange} /><br />
                    <button type="submit">Register</button>
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

export default JSONMainApp