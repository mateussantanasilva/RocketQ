export default function modal() {
    const contentBody = document.querySelector('.content')
    const btnModalCancel = document.querySelector('.group-btns-modal .btn-cancel')

    btnModalCancel.addEventListener('click', close)

    function open() {
        contentBody.classList.add('modal-active')
    }
    function close() {
        contentBody.classList.remove('modal-active')
    }

    return {open, close}
}