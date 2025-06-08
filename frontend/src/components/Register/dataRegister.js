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
    placeholder: "Juan",
    name: "name",
    type: "text",
  },
  {
    icono: MdDriveFileRenameOutline,
    label: "Apellido",
    placeholder: "Perez",
    name: "lastName",
    type: "text",
  },
  {
    icono: MdMail,
    label: "Correo electrónico",
    placeholder: "ejemplo@gmail.com",
    name: "email",
    type: "email",
  },
  {
    icono: RiLockPasswordFill,
    label: "Contraseña",
    placeholder: "******",
    name: "password",
    type: "password",
  },
  {
    icono: RiLockPasswordFill,
    label: "Verificar contraseña",
    placeholder: "******",
    name: "verifyPassword",
    type: "password",
  },
  {
    icono: HiIdentification,
    label: "DNI",
    placeholder: "11111111",
    name: "dni",
    type: "text",
  },
  {
    icono: IoCalendar,
    label: "Fecha de nacimiento",
    placeholder: "",
    name: "nacimiento",
    type: "date",
  },
  {
    icono: TbLicense,
    label: "Licencia de conducir",
    placeholder: "LIC0000000",
    name: "licencia",
    type: "text",
  },
  {
    icono: FaPhone,
    label: "Número telefónico",
    placeholder: "153123456",
    name: "numeroTelefonico",
    type: "text",
  },
];
