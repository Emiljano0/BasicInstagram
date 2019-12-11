import React from "react"
import axios from "axios"


class JSONUserApp extends React.Component {

    render(props) {

        const styles = {
            display: "block",
            border: "1px solid "
        }

        return(
            <div style={ styles }>
                <h3>Name : {this.props.uName}</h3>
            </div>
        )
    }
}

export default JSONUserApp