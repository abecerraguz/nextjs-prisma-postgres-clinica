"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import ModalEditEspecialist from '@/components/ModalEditEspecialist';
import { useState } from "react";

const handleAlertModal = (e) => {
    e.preventDefault();
    const id = e.target.dataset.info
    const modal = document.getElementById('my_modal_2')
    const buttonDeleteRegister = document.getElementById('deleteRegistro')
    buttonDeleteRegister.setAttribute('data-info', id)
    modal.showModal()
}


function Especialist({ especialist }) {

    const { pk_idEspecialista, nombre, apellido, sexo, fechaNacimiento, especialidad } = especialist



    const nuevaFecha = new Date(fechaNacimiento).toLocaleDateString()





    return (

        <>
           


      


        </>

    )
}

export default Especialist
