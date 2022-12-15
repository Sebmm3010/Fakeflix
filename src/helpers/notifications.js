import Swal from 'sweetalert2';

export const notifications = ({ msg='', type='' }) => {
    switch(type){
        case 'warning':
            const toast= Swal.mixin({
                toast:true,
                position:'top-end',
                showConfirmButton: false,
                timer: 1500,
                iconColor:'yellow',
                showClass:{
                    popup:'animate__animated animate__slideInRight'
                },
                hideClass: {
                    popup: 'animate__animated animate__slideOutRight animate__slow'
                },
                customClass:{
                    popup: 'colored-toast'
                },
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            });
            toast.fire({
                icon: 'warning',
                title: msg
            });
            break;
        case 'error':{
            const toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                iconColor: 'red',
                showClass: {
                    popup: 'animate__animated animate__slideInRight'
                },
                hideClass: {
                    popup: 'animate__animated animate__slideOutRight animate__slow'
                },
                customClass: {
                    popup: 'colored-toast'
                },
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            });
            toast.fire({
                icon: 'error',
                title: msg
            });
        }
    }
}