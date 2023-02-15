//Components from Libraries
import { useState, useEffect, useMemo } from "react";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
  FormHelperText,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import Box from "@mui/material/Box";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../Store";
import { useNavigate, useLocation } from "react-router-dom";
//Reducers
import { addNewRow, editRow } from "../features/usersDataSlice";
//Styles
import { Theme } from "@mui/material/styles";
//Utils
import { Gender, User } from "../utils/mockData";
import {
  dateToTimestamp,
  timestampToDate,
  isPastDate,
  generateRandomId,
  isAtLeastElevenCharacters,
  checkOriginalIdNumber,
  findUserById,
} from "../utils/helperFunctions";

//Srtles for User Form
const styles = {
  formHeaderLabel: () => ({
    fontSize: "20px",
  }),
  inputContainer: () => ({
    width: "100%",
  }),
  formContainer: () => ({
    display: "flex",
    flexDirection: "column",
    rowGap: "20px",
    padding: "20px",
  }),
  submitButton: (theme: Theme) => ({
    width: "fit-content",
    padding: "8px 20px",
    backgroundColor: theme.palette.primary.main,
  }),
  errorLabel: () => ({
    marginLeft: "0px",
  }),
};

const UserForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { usersData } = useSelector((state: RootState) => state.usersData);

  //Default data for form
  const [formDefaultData, setFormDefaultData] = useState<User | undefined>({
    personalId: "",
    name: "",
    surname: "",
    gender: "",
    birthDate: undefined,
    birthPlace: "",
    phoneNumber: "",
    address: "",
  });

  //Functions to set user and fill in inputs with default data if row is being edited
  const [editingRowId, setEditingRowId] = useState<number | null>(null);

  const { state } = useLocation();

  useEffect(() => {
    if (state) {
      setEditingRowId(state.id);
    } else {
      setEditingRowId(null);
    }
  }, [state]);

  useEffect(() => {
    const userForEditing =
      editingRowId && findUserById(usersData, editingRowId);
    if (userForEditing && typeof userForEditing.birthDate === "number") {
      setFormDefaultData({
        ...userForEditing,
        birthDate: timestampToDate(userForEditing.birthDate),
      });
    }
  }, [editingRowId]);

  useEffect(() => {
    reset(formDefaultData);
  }, [formDefaultData]);

  //React Form utilies

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<User>({
    defaultValues: useMemo(() => {
      return formDefaultData;
    }, [formDefaultData]),
  });

  const onSubmit: SubmitHandler<User> = (data: User) => {
    if (data.birthDate instanceof Date && !editingRowId) {
      dispatch(
        addNewRow({
          ...data,
          id: generateRandomId(),
          birthDate: dateToTimestamp(data.birthDate),
        })
      );
      navigate("/");
    } else if (data.birthDate instanceof Date && editingRowId) {
      dispatch(
        editRow({
          ...data,
          birthDate: dateToTimestamp(data.birthDate),
        })
      );
      navigate("/");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={styles.formContainer}>
        <Typography sx={styles.formHeaderLabel}>
          {editingRowId ? "ველის რედაქტირება" : "ველის დამატება"}
        </Typography>

        <Controller
          control={control}
          name="personalId"
          rules={{
            required: "Personal Id is required",
            validate: {
              isAtLeastElevenCharacters: (personalIdNumber) =>
                isAtLeastElevenCharacters(personalIdNumber) ||
                "Personal Id number should be at least 11 characters long",
              checkOriginalIdNumber: (personalIdNumber) =>
                checkOriginalIdNumber(
                  usersData,
                  personalIdNumber,
                  editingRowId
                ) || "User with such Personal Id Number already exists",
            },
          }}
          render={({ field }) => (
            <Box>
              <TextField
                {...field}
                fullWidth
                variant="outlined"
                label="Personal Id"
                type="number"
                error={!!errors.personalId}
              />
              {errors.personalId && (
                <FormHelperText error sx={styles.errorLabel}>
                  {errors.personalId.message}
                </FormHelperText>
              )}
            </Box>
          )}
        />

        <Controller
          control={control}
          name="name"
          rules={{
            required: "Name is required",
          }}
          render={({ field }) => (
            <Box>
              <TextField
                {...field}
                fullWidth
                variant="outlined"
                label="Name"
                error={!!errors.name}
              />
              {errors.name && (
                <FormHelperText error sx={styles.errorLabel}>
                  {errors.name.message}
                </FormHelperText>
              )}
            </Box>
          )}
        />

        <Controller
          control={control}
          name="surname"
          rules={{
            required: "Surname is required",
          }}
          render={({ field }) => (
            <Box>
              <TextField
                {...field}
                fullWidth
                variant="outlined"
                label="Surname"
                error={!!errors.surname}
              />
              {errors.surname && (
                <FormHelperText error sx={styles.errorLabel}>
                  {errors.surname.message}
                </FormHelperText>
              )}
            </Box>
          )}
        />

        <FormControl fullWidth variant="outlined">
          <Controller
            name="gender"
            control={control}
            rules={{ required: "Gender is required" }}
            render={({ field }) => (
              <Box>
                <InputLabel id="gender-label">Gender</InputLabel>
                <Select
                  labelId="gender-label"
                  {...field}
                  fullWidth={true}
                  label="Gender"
                  error={!!errors.gender}
                >
                  <MenuItem value={Gender.Male}>Male</MenuItem>
                  <MenuItem value={Gender.Female}>Female</MenuItem>
                </Select>
                {errors.gender && (
                  <FormHelperText error sx={styles.errorLabel}>
                    {errors.gender.message}
                  </FormHelperText>
                )}
              </Box>
            )}
          />
        </FormControl>

        <Controller
          control={control}
          name="birthDate"
          rules={{
            validate: {
              isPastDate: (date) =>
                (date instanceof Date && isPastDate(date)) ||
                "Please, enter a past date",
            },
            required: "Birth Date is required",
          }}
          render={({ field, fieldState }) => (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                {...field}
                label="Date"
                inputFormat="dd/MM/yyyy"
                renderInput={(field) => (
                  <Box>
                    <TextField
                      sx={styles.inputContainer}
                      {...field}
                      error={!!errors.birthDate}
                    />
                    <FormHelperText error sx={styles.errorLabel}>
                      {fieldState.error?.message}
                    </FormHelperText>
                  </Box>
                )}
              />
            </LocalizationProvider>
          )}
        />

        <Controller
          control={control}
          name="birthPlace"
          rules={{
            required: "Birth place is required",
          }}
          render={({ field }) => (
            <Box>
              <TextField
                {...field}
                fullWidth
                variant="outlined"
                label="Birth Place"
                error={!!errors.birthPlace}
              />
              {errors.birthPlace && (
                <FormHelperText error sx={styles.errorLabel}>
                  {errors.birthPlace.message}
                </FormHelperText>
              )}
            </Box>
          )}
        />

        <Controller
          control={control}
          name="phoneNumber"
          rules={{
            required: "Phone Number is required",
          }}
          render={({ field }) => (
            <Box>
              <TextField
                {...field}
                fullWidth
                type="number"
                variant="outlined"
                label="Phone Number"
                error={!!errors.phoneNumber}
              />
              {errors.phoneNumber && (
                <FormHelperText error sx={styles.errorLabel}>
                  {errors.phoneNumber.message}
                </FormHelperText>
              )}
            </Box>
          )}
        />

        <Controller
          control={control}
          name="address"
          rules={{
            required: "Address Number is required",
          }}
          render={({ field }) => (
            <Box>
              <TextField
                {...field}
                fullWidth
                variant="outlined"
                label="Address"
                error={!!errors.address}
              />
              {errors.address && (
                <FormHelperText error sx={styles.errorLabel}>
                  {errors.address.message}
                </FormHelperText>
              )}
            </Box>
          )}
        />

        <Button
          variant="contained"
          type="submit"
          fullWidth={false}
          sx={styles.submitButton}
        >
          შენახვა
        </Button>
      </Box>
    </form>
  );
};

export default UserForm;
