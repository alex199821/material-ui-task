import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, TextField } from "@mui/material";

type FormValues = {
  firstName: string;
  lastName: string;
  age: number;
};

const UserForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        {...register("firstName", { required: true })}
        label="First Name"
        variant="outlined"
        error={!!errors.firstName}
        helperText={errors.firstName && "This field is required"}
      />

      <TextField
        {...register("lastName", { required: true })}
        label="Last Name"
        variant="outlined"
        error={!!errors.lastName}
        helperText={errors.lastName && "This field is required"}
      />

      <TextField
        {...register("age", { required: true })}
        label="Age"
        variant="outlined"
        type="number"
        error={!!errors.age}
        helperText={errors.age && "This field is required"}
      />

      <Button variant="contained" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default UserForm;
