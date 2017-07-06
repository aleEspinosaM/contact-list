import React, { Component } from 'react';
import { getUsers } from '../api/RandomUsers'
import ISO from '../api/ISO';
import UserCardList from './UserCardList';
import AddUserForm from './AddUserForm';
import { without } from 'lodash'

class MainComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventName: 'React Event',
      users: [],
      isFormVisible: false,
      selectedGender: '',
      selectedCountry: ''
    };
    this.removeUser = this.removeUser.bind(this);
    this.toggleFormVisibility = this.toggleFormVisibility.bind(this);
    this.changeSelectedGender = this.changeSelectedGender.bind(this);
    this.changeSelectedCountry = this.changeSelectedCountry.bind(this);
  }

  componentDidMount() {
    getUsers(6, users => {
      this.setState({
        users
      });
    })
  }

  removeUser(user) {
    const {email} = user
    const usersState = this.state.users
    const users = usersState.filter(u => email !== u.email)
    // const users = without(this.state.users, user)
    this.setState({users})
  }
  
  toggleFormVisibility() {
    this.setState({
      isFormVisible: !this.state.isFormVisible
    });
  }

  changeSelectedGender(selectedGender) {
    this.setState({
      selectedGender
    });
  }

  changeSelectedCountry(selectedCountry) {
    this.setState({
      selectedCountry
    });
  }
  
  render() {
    const currentUsers = this.state.users;

    return (
      <div>
        <div className="row mb-3">
          <div className="col-lg-12">
            <AddUserForm  
            handleFormVisibility={this.toggleFormVisibility}
            isFormVisible={this.state.isFormVisible}
            selectedGender = { this.state.selectedGender }
            handleSelectedGenderChange = { this.changeSelectedGender }
            selectedCountry = { this.state.selectedCountry }
            handleSelectedCountryChange = { this.changeSelectedCountry }
            />
          </div>
        </div>
        <div>
          <h3>{this.state.users.length} people attending to {this.state.eventName}</h3>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="card-columns">
              <UserCardList users={currentUsers} handleRemoveUser={this.removeUser} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MainComponent;