import { useDispatch, useSelector } from "react-redux"
import { GoogleAuthProvider, signInWithPopup,  } from "firebase/auth";
import { FirebaseAuth } from "../firebase/config";
import { onChecking, onLogin, onLogout } from "../store/auth/authSlice";


const googleProvider= new GoogleAuthProvider()
export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector(state=> state.auth);

    const dispatch= useDispatch();

    const signInWithGoogle=async()=>{
        dispatch(onChecking());
        try {
            const result = await signInWithPopup(FirebaseAuth, googleProvider);
            const { user:usuario }= result;
            dispatch(onLogin({displayName:usuario.displayName, email: usuario.email}));
        } catch (error) {
            const errorMsg = error.message;
            console.log(error.code);
            dispatch(onLogout({errorMsg}));
        }
    }

    return {
        /* Propiedades */
        status,
        user,
        errorMessage,

        /* Metodos */
        signInWithGoogle
    }

}