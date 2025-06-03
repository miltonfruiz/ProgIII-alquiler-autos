import { useState } from "react";
import { MdDriveFileRenameOutline } from "react-icons/md"; // nombre
import { MdMail } from "react-icons/md"; // mail
import { RiLockPasswordFill } from "react-icons/ri"; // contraseña
import { IoCalendar } from "react-icons/io5"; // fecha nacimiento
import { HiIdentification } from "react-icons/hi2"; // dni
import { TbLicense } from "react-icons/tb"; // licencia
import { FaPhone } from "react-icons/fa6";

export const dataForm = [
  {
    icono: MdDriveFileRenameOutline,
    label: "Nombre",
    placeholder: "Tu nombre",
    name: "name",
    type: "text",
  },
  {
    icono: MdDriveFileRenameOutline,
    label: "Apellido",
    placeholder: "Tu apellido",
    name: "lastName",
    type: "text",
  },
  {
    icono: MdMail,
    label: "Correo electrónico",
    placeholder: "Tunombre@gmail.com",
    name: "email",
    type: "email",
  },
  {
    icono: RiLockPasswordFill,
    label: "Contraseña",
    placeholder: "Tu contraseña",
    name: "password",
    type: "password",
  },
  {
    icono: RiLockPasswordFill,
    label: "Verificar contraseña",
    placeholder: "Verifica tu contraseña",
    name: "verifyPassword",
    type: "password",
  },
  {
    icono: HiIdentification,
    label: "DNI",
    placeholder: "Tu DNI",
    name: "dni",
    type: "text",
  },
  {
    icono: IoCalendar,
    label: "Fecha de nacimiento",
    placeholder: "Tu fecha de nacimiento",
    name: "nacimiento",
    type: "date",
  },
  {
    icono: TbLicense,
    label: "Licencia de conducir",
    placeholder: "Tu licencia de conducir",
    name: "licencia",
    type: "text",
  },
  {
    icono: FaPhone,
    label: "Número telefónico",
    placeholder: "Tu número telefónico",
    name: "numeroTelefonico",
    type: "text",
  },
];
