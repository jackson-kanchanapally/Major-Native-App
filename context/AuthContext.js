import {useContext,createContext,useState,useEffect} from 'react';
import { signInWithEmailAndPassword,signOut,onAuthStateChanged,signInWithPopup,GoogleAuthProvider } from 'firebase/auth';
import {auth} from '../firebaseConfig.js'

const AuthContext=createContext()
export const AuthContextProvider=({children})=>{

    const [user,setUser]=useState(null)
    const googleSignIn=()=>{
        const provider=new GoogleAuthProvider()
        signInWithPopup(auth,provider)
    }
    const SignInWithEmail=(email,password)=>{
        
        signInWithEmailAndPassword(auth,email,password)
    }
    const logOut=()=>{
        signOut(auth)
    }
    useEffect(()=>{
        const unsubscribe=onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser);
        })
    },[user])
    return(
        <AuthContext.Provider value={{user,logOut,googleSignIn,SignInWithEmail}}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth=()=>{
    return useContext(AuthContext)
}