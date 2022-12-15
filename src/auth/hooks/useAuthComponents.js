import { useState } from "react";
import { formValidations, notifications } from "../../helpers";
import { useAuthStore } from "../../hooks";


export const useAuthComponents = (formState) => {
    /* Importaciones basicas */
    const {
        status,
        registerWithEmailAndPassword,
        loginEmailandPassword,
        signInWithGoogle,
        singInInvitado,
    } = useAuthStore();


    /* General */
    const [show, setShow] = useState(true);

    const handleShowPassword = () => {
        setShow(!show);
    }

    /* Logica del login */

    // Handler del email y password
    const handleLoginSubmit = (event) => {
        event.preventDefault();
        const { email, password } = formState;

        if (email.lenght < 0 || password.lenght <0 ) {
            notifications({ type: 'warning', msg: 'El email y contraseña son obligatorios' });
            return;
        }

        if (!formValidations({ str: email, type: 'email' })) {
            notifications({ type: 'warning', msg: 'El email y contraseña son obligatorios' });
            return;
        }

        loginEmailandPassword(formState);
    }
    // Handler de google
    const handleGoogleSignIn = (event) => {
        event.preventDefault();
        signInWithGoogle();
    }

    // Handler del invitado
    const handleInvitado=(event)=>{
        event.preventDefault();
        singInInvitado();
    }

    /* Logica del Registro */
    const handleRegisterSubmit = (event) => {
        event.preventDefault();
        const { displayName, email, password, password2 } = formState;

        if (!formValidations({ str: displayName, min: 3, type: 'normal' }) || !formValidations({ str: password, min: 6, type: 'normal' })) {

            notifications({ type: 'warning', msg: 'Nombre o constraseña invalidos' });
            return;
        }
        if (!formValidations({ str: email, type: 'email' })) {

            notifications({ type: 'warning', msg: 'Email invalido' });
            return;
        }
        if (password !== password2) {

            notifications({ type: 'warning', msg: 'Laas constraseñas deben ser iguales' });
            return;
        }
        registerWithEmailAndPassword(formState);
    }

    return {
        /* Propiedades */
        show,
        status,
        /* Metodos */
        handleShowPassword,
        handleRegisterSubmit,
        handleLoginSubmit,
        handleGoogleSignIn,
        handleInvitado
    }

}