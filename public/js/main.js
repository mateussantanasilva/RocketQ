import modal from './modal.js'
const elementModal = modal()

/* Botões para interagir com o modal */
const btnRead = document.querySelectorAll('a.btn-verified-read')
const btnDelete = document.querySelectorAll('a.btn-delete-question')

btnRead.forEach(btn => {
    btn.addEventListener('click', event => changeClick(event, true))
})

btnDelete.forEach(btn => {
    btn.addEventListener('click', event => changeClick(event, false))
})

function changeClick(event, btnRead) {
    event.preventDefault() /* Tira a função de link para levar a outra página */
    const text = btnRead ? 'Marcar como lida' : 'Excluir'

    /* Elementos do modal */
    const modalTitle = document.querySelector('.modal h2')
    const modalDescription = document.querySelector('.modal p')
    const modalBtn = document.querySelector('.modal .btn-delete-confirm')
    const modalInput = document.querySelector('.modal input#password')

    modalTitle.innerHTML = `${text} a pergunta`
    modalDescription.innerHTML = `Tem certeza que você deseja ${text.toLocaleLowerCase()} esta pergunta?`
    
    modalBtn.innerHTML = `Sim, ${text.toLocaleLowerCase()}`
    btnRead ? modalBtn.classList.remove('btn-red') : modalBtn.classList.add('btn-red')

    btnRead ? modalInput.classList.remove('input-red') : modalInput.classList.add('input-red')

    elementModal.open()
}