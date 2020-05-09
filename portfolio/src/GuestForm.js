import React, {Component} from 'react';
import './GuestBook.css'

type GuestFormProps = {
    callBack: EventListener
}

type GuestFormState = {
}

class GuestForm extends Component<GuestFormProps, GuestFormState>
{
    constructor(props)
    {
        super(props);
        // this.state = {callBack: this.props.callBack}
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (event) => {

    }

    render()
    {
        return (
            <form className="guest-form" onSubmit={this.props.callBack}>
                <label key="name">
                    Name:
                    <input type="text" value={""} onChange={this.handleChange}/>
                </label>
                <label key="bio">
                    Bio:
                    <input type="text" value={""} onChange={this.handleChange}/>
                </label>
                <label key="message">
                    Message:
                    <input type="text" value={""} onChange={this.handleChange}/>
                </label>
                <label key="anon">
                    Anonymous:
                    <input type="text" value={""} onChange={this.handleChange}/>
                </label>
                <label key="email">
                    Email:
                    <input type="text" value={""} onChange={this.handleChange}/>
                </label>
                <input type="submit" value="Submit"/>
            </form>
        )
    }

}
export default GuestForm;
