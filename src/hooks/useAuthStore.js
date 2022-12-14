import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    updateProfile,
    signInWithEmailAndPassword,
    onAuthStateChanged
} from "firebase/auth";
import { FirebaseAuth } from "../firebase/config";
import { onChecking, onLogin, onLogout } from "../store/auth/authSlice";


const googleProvider = new GoogleAuthProvider()
export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector(state => state.auth);

    const dispatch = useDispatch();

    // Iniciar sesion normal.
    const loginEmailandPassword = async ({ email, password }) => {
        dispatch(onChecking());
        try {
            const { user } = await signInWithEmailAndPassword(FirebaseAuth, email, password);
            const { displayName, uid } = user;
            dispatch(onLogin({ uid, displayName, email }));
        } catch (error) {
            const errorMsg = error.message;
            dispatch(onLogout({ errorMsg }));
        }

    }


    // Iniciar sesion con Google
    const signInWithGoogle = async () => {
        dispatch(onChecking());
        try {
            const { user } = await signInWithPopup(FirebaseAuth, googleProvider);
            const { displayName, email, uid } = user;
            dispatch(onLogin({ uid, displayName, email }));
        } catch (error) {
            const errorMsg = error.message;
            dispatch(onLogout({ errorMsg }));
        }
    }


    // Regitrarse
    const registerWithEmailAndPassword = async ({ email, password, displayName }) => {
        dispatch(onChecking());
        try {
            const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
            const { uid } = resp.user;
            await updateProfile(FirebaseAuth.currentUser, { displayName });
            dispatch(onLogin({ uid, displayName, email }));

        } catch (error) {
            const errorMsg = error.message;
            dispatch(onLogout({ errorMsg }));
        }
    }


    // Checkear el estado y mantenerlo
    const checkingAuth = () => {
        useEffect(() => {
            onAuthStateChanged(FirebaseAuth, async (user) => {
                if (!user) return dispatch(onLogout());

                const { displayName, email, uid } = user;
                dispatch(onLogin({ displayName, uid, email }));
            })
        }, []);

    }

    const logoutFirestore = async () => {
        try {
            await FirebaseAuth.signOut();
            dispatch(onLogout());
        } catch (error) {
            console.log(error);
        }
    }
    return {
        /* Propiedades */
        status,
        user,
        errorMessage,

        /* Metodos */
        loginEmailandPassword,
        signInWithGoogle,
        registerWithEmailAndPassword,
        checkingAuth,
        logoutFirestore
    }

}