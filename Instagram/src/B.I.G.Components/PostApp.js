import React from "react"
import axios from "axios"


class PostApp extends React.Component {

    render(props) {

        const styles = {
            display: "block",
            border: "1px solid "
        }

        return(
            <div style={ styles }>
                <p>
                    <h3>{this.props.User}</h3>
                    <h4>Title : {this.props.title}</h4>
                    <h4>Body : {this.props.body}</h4>
                </p>
            </div>
        )
    }
}

export default PostApp