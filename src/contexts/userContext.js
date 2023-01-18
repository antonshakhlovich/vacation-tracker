import React from 'react';

export const GuestUser = {
  firstName: 'Guest',
  lastName: '',
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  },
  googleProfile: null,
};

export const User = {
  user: GuestUser,
  setUser: (user) => {
    Object.assign(User.user, user);
  },
};

export const UserContext = React.createContext(User);
