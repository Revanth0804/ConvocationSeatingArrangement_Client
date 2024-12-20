// // import React, {createContext, useContext, useReducer} from 'react';
// // import AuthReducer from '../reducer/AuthReducer';

// // export const AuthContext = createContext();

// // export const AuthProvider = ({children}) =>{
// //     const initialState = {isAuthenticated:false, user: null};

// //     const [state, dispatch] = useReducer(AuthReducer,initialState);

// //     const login = (user) => dispatch({type: "LOGIN", payLoad:user});
// //     const logout = () => dispatch({type:"LOGOUT"});

// //     return (
// //         <AuthContext.Provider value= {{state, login,logout}}>
// //             {children}
// //         </AuthContext.Provider>
// //     )
// // }

// // export const useAuth= () => useContext(AuthContext);


// import React, { createContext, useContext, useReducer, useEffect } from 'react';
// import AuthReducer from './AuthReducer';

// // Create the AuthContext
// export const AuthContext = createContext();

// // Create the AuthProvider component
// export const AuthProvider = ({ children }) => {
//   // Initialize state from localStorage if it exists, otherwise use the default
//   const storedUser = localStorage.getItem('user');
//   const storedAuthState = localStorage.getItem('isAuthenticated');

//   const initialState = {
//     isAuthenticated: storedAuthState === 'true' ? true : false,
//     user: storedUser ? JSON.parse(storedUser) : null,
//   };

//   // Create a reducer and state for auth
//   const [state, dispatch] = useReducer(AuthReducer, initialState);

//   // Handle login and store user data in localStorage
//   const login = (user) => {
//     localStorage.setItem('isAuthenticated', 'true');
//     localStorage.setItem('user', JSON.stringify(user));
//     dispatch({ type: 'LOGIN', payLoad: user });
//   };

//   // Handle logout and remove user data from localStorage
//   const logout = () => {
//     localStorage.removeItem('isAuthenticated');
//     localStorage.removeItem('user');
//     dispatch({ type: 'LOGOUT' });
//   };

//   // Optionally, you can sync state with localStorage on every change
//   useEffect(() => {
//     if (state.isAuthenticated) {
//       localStorage.setItem('isAuthenticated', 'true');
//       localStorage.setItem('user', JSON.stringify(state.user));
//     } else {
//       localStorage.removeItem('isAuthenticated');
//       localStorage.removeItem('user');
//     }
//   }, [state.isAuthenticated, state.user]);

//   return (
//     <AuthContext.Provider value={{ state, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Custom hook to use Auth context
// export const useAuth = () => useContext(AuthContext);
