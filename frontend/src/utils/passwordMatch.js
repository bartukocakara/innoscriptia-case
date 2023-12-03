import Swal from "sweetalert2";

export const checkPasswordMatch = (password, confirm) => {
    if(password !== confirm)
    {
        Swal.fire(
            'Başarısız deneme!',
            'Şifreler eşleşmiyor!',
            'danger'
          )
        return false;
    }
    return true;
}