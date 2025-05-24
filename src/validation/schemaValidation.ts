import * as Yup from "yup";

export const patientSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    age: Yup.number()
        .required("Age is required")
        .min(0, "Age must be greater than 0"),
    gender: Yup.string()
        .oneOf(["Male", "Female", "Other"], "Invalid gender")
        .required("Gender is required"),
    phone: Yup.string()
        .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
        .required("Phone is required"),
        blood_group: Yup.string()
        .oneOf(
            ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
            "Invalid blood group"
        )
        .required("Blood group is required"),
    ongoing_illness: Yup.string()
        .required("Onging Illness is required"),
    problem: Yup.string().required("Reason is required"),
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    country: Yup.string().required("Country is required"),
    pincode: Yup.string()
        .matches(/^[0-9]{6}$/, "Pincode must be 6 digits")
        .required("Pincode is required"),
});
