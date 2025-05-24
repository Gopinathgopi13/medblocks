import { useFormik } from "formik";
import TextInputBox from "../textInputBox";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import Select from "../select";
import type { OptionsListProps } from "../../@types/general";
import Loader from "../loader";
import { broadcastChange } from "../../db/sync";
import { patientSchema } from "../../validation/schemaValidation";
import {
  bloodGroupOptionsList,
  genderOptionsList,
  ongoingIllnessOptionsList,
} from "../../utils/constant";
import { toast } from "react-toastify";

const CreatePatient = forwardRef(({ db, data, onClose }: any, ref) => {
  const [isLoading, setisLoading] = useState<boolean>(false);
  const {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    setFieldValue,
    setValues,
  } = useFormik({
    initialValues: {
      name: "",
      age: "",
      gender: "",
      phone: "",
      blood_group: "",
      ongoing_illness: "",
      problem: "",
      address: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
    },
    validationSchema: patientSchema,
    onSubmit: (values) => {
      if (data) {
        handleUpdatePatient(values);
      } else {
        handleSavePatient(values);
      }
    },
  });

  useEffect(() => {
    if (data) {
      setValues({
        name: data.name ?? "",
        age: data.age ?? "",
        gender: data.gender ?? "",
        phone: data.phone ?? "",
        blood_group: data.blood_group ?? "",
        problem: data.problem ?? "",
        ongoing_illness: data.ongoing_illness ?? "",
        address: data.address ?? "",
        city: data.city ?? "",
        state: data.state ?? "",
        country: data.country ?? "",
        pincode: data.pincode ?? "",
      });
    }
  }, []);

  const handleSavePatient = async (value: any) => {
    try {
      setisLoading(true);
      await db.query(
        `INSERT INTO patients (name, age, gender, phone, blood_group, ongoing_illness, 
        problem, address, city, state, country, pincode) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
        [
          value.name,
          Number(value.age),
          value.gender,
          value.phone,
          value.blood_group,
          value.ongoing_illness,
          value.problem,
          value.address,
          value.city,
          value.state,
          value.country,
          value.pincode,
        ]
      );
      broadcastChange();
      toast.success("Patient details stored successfully");
      onClose();
    } catch (error) {
      toast.error("Failed to create toast");
      console.error(error);
    } finally {
      setisLoading(false);
    }
  };

  const handleUpdatePatient = async (value: any) => {
    try {
      setisLoading(true);
      await db.query(
        `UPDATE patients 
         SET name = $1, age = $2, gender = $3, phone = $4, blood_group = $5, ongoing_illness = $6,
         problem = $7, address = $8, city = $9, state = $10, country = $11, pincode = $12, updated_at = CURRENT_TIMESTAMP
         WHERE id = $13`,
        [
          value.name,
          Number(value.age),
          value.gender,
          value.phone,
          value.blood_group,
          value.ongoing_illness,
          value.problem,
          value.address,
          value.city,
          value.state,
          value.country,
          value.pincode,
          data.id,
        ]
      );

      broadcastChange();
      toast.success("Patient details updated successfully");
      onClose();
    } catch (error) {
      toast.error("Failed to update patient details");
      console.error(error);
    } finally {
      setisLoading(false);
    }
  };

  useImperativeHandle(ref, () => ({
    submitForm: () => {
      handleSubmit();
    },
  }));
  return (
    <>
      <div>
        <h3>General Information</h3>
        <div className="grid grid-cols-2 gap-x-4">
          <TextInputBox
            value={values.name}
            title="Name"
            isRequired
            onChangeText={handleChange("name")}
            errorText={errors.name && touched.name ? errors.name : ""}
            maxLength={50}
          />
          <TextInputBox
            value={values.age}
            title="Age"
            isRequired
            onChangeText={handleChange("age")}
            errorText={errors.age && touched.age ? errors.age : ""}
            maxLength={3}
            onKeyDown={(e) => {
              if (!/[0-9]/.test(e.key) || values.age.length >= 3) {
                e.preventDefault();
              }

              if (e.key === "Backspace") {
                handleChange("age")(values.age.slice(0, -1));
              }
            }}
          />
          <Select
            options={genderOptionsList}
            value={[...genderOptionsList].find(
              (item) => item.name === values.gender
            )}
            //@ts-ignore
            onChange={(value: OptionsListProps | null) => {
              setFieldValue("gender", value?.name);
            }}
            getOptionLabel={(item: OptionsListProps) => item.name}
            getOptionValue={(item: OptionsListProps) => item.name}
            isSearchable
            isClearable
            isRequired
            placeholder="Select Gender"
            title="Gender"
            errorText={errors.gender && touched.gender ? errors.gender : ""}
          />

          <TextInputBox
            value={values.phone}
            title="Phone"
            isRequired
            onChangeText={handleChange("phone")}
            errorText={errors.phone && touched.phone ? errors.phone : ""}
            maxLength={10}
            onKeyDown={(e) => {
              if (
                !/[0-9]/.test(e.key) &&
                ![
                  "Backspace",
                  "Delete",
                  "ArrowLeft",
                  "ArrowRight",
                  "Tab",
                ].includes(e.key)
              ) {
                e.preventDefault();
                return;
              }

              if (
                values.phone.length >= 10 &&
                ![
                  "Backspace",
                  "Delete",
                  "ArrowLeft",
                  "ArrowRight",
                  "Tab",
                ].includes(e.key)
              ) {
                e.preventDefault();
              }
            }}
          />
          <Select
            options={bloodGroupOptionsList}
            value={[...bloodGroupOptionsList].find(
              (item) => item.name === values.blood_group
            )}
            //@ts-ignore
            onChange={(value: OptionsListProps | null) => {
              setFieldValue("blood_group", value?.name);
            }}
            getOptionLabel={(item: OptionsListProps) => item.name}
            getOptionValue={(item: OptionsListProps) => item.name}
            isSearchable
            isClearable
            isRequired
            placeholder="Blood group"
            title="Blood Group"
            errorText={
              errors.blood_group && touched.blood_group
                ? errors.blood_group
                : ""
            }
          />
          <Select
            options={ongoingIllnessOptionsList}
            value={[...ongoingIllnessOptionsList].find(
              (item) => item.name === values.ongoing_illness
            )}
            //@ts-ignore
            onChange={(value: OptionsListProps | null) => {
              setFieldValue("ongoing_illness", value?.name);
            }}
            getOptionLabel={(item: OptionsListProps) => item.name}
            getOptionValue={(item: OptionsListProps) => item.name}
            isSearchable
            isClearable
            isRequired
            placeholder="Ongoing Illness"
            title="Ongoing Illness"
            errorText={
              errors.blood_group && touched.blood_group
                ? errors.blood_group
                : ""
            }
          />

          <TextInputBox
            value={values.problem}
            title="Problem"
            className="col-span-2"
            isRequired
            onChangeText={handleChange("problem")}
            errorText={errors.problem && touched.problem ? errors.problem : ""}
            maxLength={50}
          />
        </div>
      </div>

      <div>
        <h3>Contact Information</h3>
        <div className="grid grid-cols-2 gap-x-4">
          <TextInputBox
            value={values.address}
            title="Address"
            isRequired
            onChangeText={handleChange("address")}
            errorText={errors.address && touched.address ? errors.address : ""}
            maxLength={50}
            className="col-span-2"
          />
          <TextInputBox
            value={values.city}
            title="City"
            isRequired
            onChangeText={handleChange("city")}
            errorText={errors.city && touched.city ? errors.city : ""}
            maxLength={50}
          />
          <TextInputBox
            value={values.state}
            title="State"
            isRequired
            onChangeText={handleChange("state")}
            errorText={errors.state && touched.state ? errors.state : ""}
            maxLength={50}
          />
          <TextInputBox
            value={values.country}
            title="Country"
            isRequired
            onChangeText={handleChange("country")}
            errorText={errors.country && touched.country ? errors.country : ""}
            maxLength={50}
          />
          <TextInputBox
            value={values.pincode}
            title="Pincode"
            isRequired
            onChangeText={handleChange("pincode")}
            onKeyDown={(e) => {
              if (
                !/[0-9]/.test(e.key) &&
                ![
                  "Backspace",
                  "Delete",
                  "ArrowLeft",
                  "ArrowRight",
                  "Tab",
                ].includes(e.key)
              ) {
                e.preventDefault();
                return;
              }
              if (
                values.pincode.length >= 6 &&
                ![
                  "Backspace",
                  "Delete",
                  "ArrowLeft",
                  "ArrowRight",
                  "Tab",
                ].includes(e.key)
              ) {
                e.preventDefault();
              }
            }}
            errorText={errors.pincode && touched.pincode ? errors.pincode : ""}
            maxLength={50}
          />
        </div>
      </div>
      <Loader isVisible={isLoading} />
    </>
  );
});
export default CreatePatient;
