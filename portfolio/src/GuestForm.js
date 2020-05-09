import React, {Component} from 'react';
import './GuestBook.css'

type GuestFormProps = {
    callBack: EventListener
}

type GuestFormState = {
    name: string;
    bio: string;
    message: string;
    anon: bool;
    email: string;
}

class GuestForm extends Component<GuestFormProps, GuestFormState>
{
    constructor(props)
    {
        super(props);
        this.state = {name: "", bio: "", message: "", anon: false, email: ""};
        this.handleChange = this.handleChange.bind(this);
    }

    _refresh()
    {

    }

    handleChange = (event) => {
        const field = event.target.id;
        var val = field === "anon" ? !event.target.checked : event.target.value;

        var stateObject = function() {
          var returnObj = {};
          console.log(field + " = " + val);
          returnObj[field] = val;
             return returnObj;
        }.bind(event)();

        this.setState( stateObject);
    }

    componentDidUpdate()
    {
        console.log(this.state);
    }

    render()
    {
        return (
            <form className="guest-form" onSubmit={this.props.callBack}>
                <label key="name">
                    Name:
                    <input id="name" type="text" value={this.state.name} onChange={this.handleChange}/>
                </label>
                <label key="bio">
                    Bio:
                    <input id="bio" type="text" value={this.state.bio} onChange={this.handleChange}/>
                </label>
                <label key="message">
                    Message:
                    <input id="message" type="text" value={this.state.message} onChange={this.handleChange}/>
                </label>
                <label key="anon" id="anon">
                    Anonymous:
                    <input id = "anon" type="checkbox" value={this.state.anon} onChange={this.handleChange}/>
                </label>
                <label key="email">
                    Email:
                    <input id="email" type="text" value={this.state.email} onChange={this.handleChange}/>
                </label>
                <input type="submit" value="Submit"/>
            </form>
        )
    }

}
export default GuestForm;
