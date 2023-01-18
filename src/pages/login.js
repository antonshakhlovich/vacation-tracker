import React from 'react';
import { UserContext, GuestUser } from '../contexts/userContext';

export default function Login() {
  return (
    <UserContext.Consumer>
      {({ user, setUser }) =>
        user.googleProfile ? (
          <div>
            <button onClick={setUser(GuestUser)}>{user.fullName}, Logout</button>
          </div>
        ) : (
          <div>
            <button
              onClick={() =>
                setUser({
                  firstName: 'Anton',
                  lastName: 'Shakhlovich',
                  googleProfile: {
                    email: 'anton.shakhlovich@siliconmint.com',
                    id: 'e12312345',
                  },
                })
              }
            >
              Login
            </button>
          </div>
        )
      }
    </UserContext.Consumer>
  );
}
