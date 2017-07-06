import React, { Component } from 'react';
import Select from 'react-select';
import CountryCodes from '../api/data/CountryCodes'
import {getRandomPicture} from '../api/RandomUsers';

class AddUserForm extends Component {
  onToggleFormVisibility() {
    this.props.handleFormVisibility()
  }

  getGenderOptions() {
    return [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' }
      ];
  }

  onSelectedGenderChange(val){
    // console.log(val);
    const gender = val ? val.value : '';
    this.props.handleSelectedGenderChange(gender)
  }

  getCountryOptions(){
    const options = [];
    for(const country in CountryCodes) {
      options.push({
        value: country,
        label: country
      })
    }
    return options;
  }

onSelectedCountryChange(val) {
  const country = val ? val.value : '';
  this.props.handleSelectedCountryChange(country);
}

onSubmitForm(e){
  e.preventDefault()
  // console.log(this.refs);
  const name = this.refs.name.value.trim();
  const email = this.refs.email.value.trim();
  const age = this.refs.age.value.trim();
  const region = this.props.selectedCountry.trim();
  const gender = this.props.selectedGender.trim();

  const photo = getRandomPicture(gender);

  if(age && email && region && name && photo && gender) {
    const user = { age , email , region , name , photo , gender }

    this.props.handleAddUser(user)
  } else {
    console.log('please fill all inputs')
  }
}

  render() {

    const isFormVisible = this.props.isFormVisible;
    const formStyle = {
      display: isFormVisible ? 'block' : 'none'
    };
    const formIcon = isFormVisible ? 'fa fa-minus fa-2x' : 'fa fa-plus fa-2x'
    const userText = isFormVisible ? 'Hide' : 'Add User'

    return (
      <div>

      <i className={formIcon} onClick={this.onToggleFormVisibility = this.onToggleFormVisibility.bind(this)} ></i> {userText}

        <div style={formStyle} className="col-lg-12 addUserSection">
          <form onSubmit={this.onSubmitForm = this.onSubmitForm.bind(this)} >
            <div className="form-group row">
              <label htmlFor="gender" className="col-sm-2 col-form-label">Gender</label>
              <div className="col-sm-10">
                <Select
                  name="form-field-gender"
                  value={this.props.selectedGender}
                  options={this.getGenderOptions()}
                  onChange={this.onSelectedGenderChange = this.onSelectedGenderChange.bind(this)}
                />
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
              <div className="col-sm-10">
                <input type="text" className="form-control" id="name" placeholder="Name" autoComplete="off" ref="name"/>
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
              <div className="col-sm-10">
                <input type="text" className="form-control" id="email" placeholder="Email" autoComplete="off" ref="email"/>
              </div>
            </div>
       
            <div className="form-group row">
              <label htmlFor="age" className="col-sm-2 col-form-label">Age</label>
              <div className="col-sm-10">
                <input type="text" className="form-control" id="age" placeholder="Age" autoComplete="off" ref="age" />
              </div>
            </div>
         
            <div className="form-group row">
              <label htmlFor="region" className="col-sm-2 col-form-label">Region</label>
              <div className="col-sm-10">
                <Select 
                  name="form-field-country"
                  value={this.props.selectedCountry}
                  options={this.getCountryOptions()}
                  onChange={this.onSelectedCountryChange = this.onSelectedCountryChange.bind(this)}
                />
              </div>
            </div>

            <input className="btn btn-secondary mr-3" type="submit" value="Submit"/>

            <button className="btn btn-secondary" >Clear Fields</button>

          </form>
        </div>
      </div>
    );
  }
}

export default AddUserForm;