import { useEffect } from 'react';
import Swal from 'sweetalert2';

const ErrorAlert = ({ message }) => {
    useEffect(() => {
        if (message) {
            Swal.fire({
                icon: 'error',
                title: '에러가 발생했습니다.',
                text: message,
                confirmButtonText: '확인',
            });
        }
    }, [message]);

    return null;
};

export default ErrorAlert;
