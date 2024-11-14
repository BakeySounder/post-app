import React, { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {Index} from './pages/index';
import { SignIn } from './pages/signIn';
import { store } from './store';
import { userServices } from './reducers/userSilce';
import { Post } from './pages/post';

const getStoreLocal = (item: string) => {
  if (typeof localStorage !== 'undefined') {
      return localStorage.getItem(item);
  }
  return null;
}
const setStoreLocal = (item: string, value: string) => {
  if (typeof localStorage !== 'undefined') {
      localStorage.setItem(item, value);
  }
}
export function saveToLocalStorage(store: any) {
    try {
        const serializedStore = JSON.stringify(store.userReducer.currentUser);
        setStoreLocal('currentUser', serializedStore);
    } catch(e) {
        console.log(e);
    }
}

export function loadFromLocalStorage() {
    try {
        const serializedStore = getStoreLocal('currentUser');        
        if(serializedStore === null) return undefined;
        return JSON.parse(serializedStore);
    } catch(e) {
        console.log(e);
        return undefined;
    }
}
const App: React.FC = () => {
  store.subscribe(() => {
    saveToLocalStorage(store.getState())
  });
  
  useEffect(()=>{
    const persistedState = loadFromLocalStorage();    
    if(!persistedState) return;
    store.dispatch(userServices.actions.SetCurrentUser(persistedState))
  },[])

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Index/>,
    },
    {
      path: "/signIn",
      element: <SignIn/>,
    },
    {
      path: "/post",
      element: <Post/>,
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App