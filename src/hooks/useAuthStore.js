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
import { onChecking, onLogin, onLogout } from "../store";
import { notifications } from "../helpers";

const googleProvider = new GoogleAuthProvider();

const errors = {
    noUser: "Firebase: Error (auth/user-not-found).",
    // TODO: Error para la para cuando un usuario esta ya en uso
}

export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector(state => state.auth);

    const dispatch = useDispatch();

    // !Procesos relacionados al iniciar sesíon

    //? Iniciar sesion email y password.
    const loginEmailandPassword = async ({ email, password }) => {
        dispatch(onChecking());
        try {
            const { user } = await signInWithEmailAndPassword(FirebaseAuth, email, password);
            const { displayName, uid } = user;
            dispatch(onLogin({ uid, displayName, email }));
        } catch (error) {
            const errorMsg = error.message;

            if (errorMsg === errors.noUser) {
                notifications({ type: 'error', msg: 'No se encontro usuario con ese email' });
            } else {
                notifications({ type: 'error', msg: '404: No se validaron los datos' });
            }

            dispatch(onLogout({ errorMsg }));
        }

    }


    //? Iniciar sesion con Google
    const signInWithGoogle = async () => {
        dispatch(onChecking());
        try {
            const { user } = await signInWithPopup(FirebaseAuth, googleProvider);
            const { displayName, email, uid } = user;
            dispatch(onLogin({ uid, displayName, email }));
        } catch (error) {
            const errorMsg = error.message;
            notifications({ type: 'error', msg: '500: No se pudo iniciar sesión' });
            dispatch(onLogout({ errorMsg }));
        }
    }


    //? Iniciar sesion como invitado
    const singInInvitado = () => {
        dispatch(onChecking());
        dispatch(onLogin({ uid: '001guess', displayName: 'Invitado', email: '' }));
    }

    //? Regitrarse
    const registerWithEmailAndPassword = async ({ email, password, displayName }) => {
        dispatch(onChecking());
        try {
            const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
            const { uid } = resp.user;
            await updateProfile(FirebaseAuth.currentUser, { displayName });
            dispatch(onLogin({ uid, displayName, email }));

        } catch (error) {
            const errorMsg = error.message;
            notifications({ type: 'error', msg: '400: no se puso registrar al usuario' });
            dispatch(onLogout({ errorMsg }));
        }
    }


    //? Checkear el estado y mantenerlo
    const checkingAuth = () => {
        useEffect(() => {
            if(localStorage.getItem('invitado')) return;
            onAuthStateChanged(FirebaseAuth, async (user) => {
                if (!user) return dispatch(onLogout());

                const { displayName, email, uid } = user;
                dispatch(onLogin({ displayName, uid, email }));
            });
        }, []);

    }

    //? Logout firestore 
    const logoutFirestore = async () => {
        try {
            await FirebaseAuth.signOut();
            dispatch(onLogout());
        } catch (error) {
            console.log(error);
        }
    }

    //? Logout de invitado
    const logoutInvitado = () => {
        localStorage.removeItem('invitado');
        dispatch(onLogout());
    }

    return {
        //* Propiedades
        status,
        user,
        errorMessage,

        //* Metodos
        loginEmailandPassword,
        signInWithGoogle,
        singInInvitado,
        registerWithEmailAndPassword,
        checkingAuth,
        logoutFirestore,
        logoutInvitado
    }

}