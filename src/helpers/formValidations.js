export const formValidations = ({str = '', min, type = ''}) => {
    switch (type) {
        case 'normal':
            if (!/\s/g.test(str)) {
                if (str.length >= min) {
                    return true;
                }
                return false;
            }
            return false;
        case 'email':
            const isEmail = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
            if (!/\s/g.test(str)) {
                if (isEmail.test(str)) {
                    return true;
                }
                return false;
            }
            return false;
        default:
            return;
    }
}