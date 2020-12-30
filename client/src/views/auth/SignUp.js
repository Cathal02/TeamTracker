import React from 'react';
import axios from 'axios';
export default class Signup extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: null,
            error: ""
        }

        this.fileInput = React.createRef();
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChange(e){
        var name = e.target.name;

        this.setState({[name]: e.target.value})
    }

    onSubmit(e){        
        e.preventDefault();

        var formData = new FormData();

        formData.append("email", this.state.email);
        formData.append("password", this.state.passwod);
		axios
			.post('/api/auth/register', formData, {
				headers: {
					accept: 'application/json',
					'Accept-Language': 'en-US,en;q=0.8',
					'Content-Type': `multipart/form-data; boundary=${formData._boundary}`
				}
			})
			.then((response) => {
                //handle success
                console.log(response)
				if (response.status === 200) {
					this.setState({ error: 'Successfully registered' });
				} else {
					this.setState({ error: 'There as an error in trying to register!' });
				}
			})
			.catch((error) => {
				//handle error
                console.log(error);
					this.setState({ error: 'There as an error in trying to register!' });
                
			});

    }



    render(){
        return(
            <div>
                <p>{this.state.error}</p>
                <h1>Create a team</h1>

                    <form onSubmit={this.onSubmit}>
                        <input type="text" name="email" placeholder="email" autoFocus value={this.state.email} onChange={this.onChange}></input>
                        <input type="text" name="passwod" placeholder="password" autoFocus value={this.state.password} onChange={this.onChange}></input>
                        <button onSubmit={this.onSubmit}>Submit form</button>
                    </form>
            </div>
        );
    }
}


