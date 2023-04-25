import * as Yup from "yup";

export const validationSchema = Yup.object({
  id: Yup.string()
    .required("La identificación es requerida")
    .min(8, "Su atributo identificador debe ser de almenos 8 caracteres"),
  name: Yup.string()
    .required("Su nombre es requerido")
    .min(8, "Su nombre debe ser más largo"),
  email: Yup.string()
    .email("Formato incorrecto")
    .required("Su correo electrónico es requerido"),
});
