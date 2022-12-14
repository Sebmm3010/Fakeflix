import { useDispatch, useSelector } from "react-redux"
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile,  } from "firebase/auth";
import { FirebaseAuth } from "../firebase/config";
import { onChecking, onLogin, onLogout } from "../store/auth/authSlice";


const googleProvider= new GoogleAuthProvider()
export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector(state=> state.auth);

    const dispatch= useDispatch();
    // Google
    const signInWithGoogle=async()=>{
        dispatch(onChecking());
        try {
            const { user } = await signInWithPopup(FirebaseAuth, googleProvider);
            const { displayName, email, uid }= user;
            dispatch(onLogin({uid, displayName, email}));
        } catch (error) {
            const errorMsg = error.message;
            dispatch(onLogout({errorMsg}));
        }
    }


    // Regitrarse
    const registerWithEmailAndPassword= async({email, password, displayName})=>{
        dispatch(onChecking());
        try {
            const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
            const {uid}=resp.user;
            await updateProfile(FirebaseAuth.currentUser, {displayName});
            dispatch(onLogin({uid, displayName, email}));

        } catch (error) {
            const errorMsg = error.message;
            dispatch(onLogout({ errorMsg }));
        }
    }

    return {
        /* Propiedades */
        status,
        user,
        errorMessage,

        /* Metodos */
        signInWithGoogle,
        registerWithEmailAndPassword
    }

}