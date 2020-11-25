import React, { Component } from 'react';
import '../specialStyles/santa.css';

class SecretSanta extends Component {
    
    state = {
        submitted: false
    }

    submit = async (event) => {
        event.preventDefault()

        let formResult = {
            name: '',
            message: '',
            shirtsize: '',
            snack: '',
            color: '',
            address : {
                state: '',
                city: '',
                street: '',
                zip: ''
            }
        }

        formResult['name'] = document.forms["ssForm"]["name"].value;
        formResult['message'] = document.forms["ssForm"]["message"].value;
        formResult['shirtsize'] = document.forms["ssForm"]["shirtsize"].value;
        formResult['snack'] = document.forms["ssForm"]["snack"].value;
        formResult['color'] = document.forms["ssForm"]["color"].value;
        formResult['address']['state'] = document.forms["ssForm"]["state"].value;
        formResult['address']['city'] = document.forms["ssForm"]["city"].value;
        formResult['address']['street'] = document.forms["ssForm"]["street"].value;
        formResult['address']['zip'] = document.forms["ssForm"]["zip"].value;

        console.log(formResult);
        this.setState({submitted: formResult})
    }

    render() {
        return (
            this.state.submitted ? <div>Submitted</div> :
            <div>
                <div className="heading">Secret Santa Sign-up</div>
                <form className="ssForm" name="ssForm">
                    <label>
                        Name:
                    </label>
                    <input type="text" name="name" />
                    <label>
                        Message / Gift Preferences
                    </label>
                    <textarea rows='4' name="message"></textarea>
                    <label>
                        Shirt Size
                    </label>
                    <select name="shirtsize">
                        <option value="" selected disabled hidden>-- Please Choose a Size --</option>
                        <option value="XS">XS - Extra Small</option>
                        <option value="S">S - Small</option>
                        <option value="M">M - Medium</option>
                        <option value="L">L - Large</option>
                        <option value="XL">XL - Extra Large</option>
                        <option value="XXL">XXL - Extra Extra Large</option>
                    </select>
                    
                    <div className="chunk">
                        <label>
                            Favorite Snack
                        </label>
                        <input type="text" name="snack" />
                        <label>
                            Favorite Color
                        </label>
                        <input type="text" name="color" />
                    </div>

                    <label>
                        Address
                    </label>
                    <div className="address">
                        <label>
                            State
                        </label>
                        <select name="state">
                            <option value="AL">Alabama</option>
                            <option value="AK">Alaska</option>
                            <option value="AZ">Arizona</option>
                            <option value="AR">Arkansas</option>
                            <option value="CA">California</option>
                            <option value="CO">Colorado</option>
                            <option value="CT">Connecticut</option>
                            <option value="DE">Delaware</option>
                            <option value="DC">District Of Columbia</option>
                            <option value="FL">Florida</option>
                            <option value="GA">Georgia</option>
                            <option value="HI">Hawaii</option>
                            <option value="ID">Idaho</option>
                            <option value="IL">Illinois</option>
                            <option value="IN">Indiana</option>
                            <option value="IA">Iowa</option>
                            <option value="KS">Kansas</option>
                            <option value="KY">Kentucky</option>
                            <option value="LA">Louisiana</option>
                            <option value="ME">Maine</option>
                            <option value="MD">Maryland</option>
                            <option value="MA">Massachusetts</option>
                            <option value="MI">Michigan</option>
                            <option value="MN">Minnesota</option>
                            <option value="MS">Mississippi</option>
                            <option value="MO">Missouri</option>
                            <option value="MT">Montana</option>
                            <option value="NE">Nebraska</option>
                            <option value="NV">Nevada</option>
                            <option value="NH">New Hampshire</option>
                            <option value="NJ">New Jersey</option>
                            <option value="NM">New Mexico</option>
                            <option value="NY">New York</option>
                            <option value="NC">North Carolina</option>
                            <option value="ND">North Dakota</option>
                            <option value="OH">Ohio</option>
                            <option value="OK">Oklahoma</option>
                            <option value="OR">Oregon</option>
                            <option value="PA">Pennsylvania</option>
                            <option value="RI">Rhode Island</option>
                            <option value="SC">South Carolina</option>
                            <option value="SD">South Dakota</option>
                            <option value="TN">Tennessee</option>
                            <option value="TX" selected>Texas</option>
                            <option value="UT">Utah</option>
                            <option value="VT">Vermont</option>
                            <option value="VA">Virginia</option>
                            <option value="WA">Washington</option>
                            <option value="WV">West Virginia</option>
                            <option value="WI">Wisconsin</option>
                            <option value="WY">Wyoming</option>
                        </select>
                        
                        <div className="chunk">
                            <label>
                                City
                            </label>
                            <input type="text" name="city" />
                            
                            <label>
                                ZIP
                            </label>
                            <input type="text" maxlength="5" name="zip" />    
                        </div>

                        <label>
                            Street
                        </label>
                        <input type="text" name="street" />
                    </div>

                <button className="submit" onClick={this.submit}>
                    Submit
                </button>

                </form>
            </div>
        );
    }
}
 
export default SecretSanta;