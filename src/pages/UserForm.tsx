//Components from Libraries
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
import { useNavigate } from "react-router-dom";
//Reducers
import { addNewRow } from "../features/usersDataSlice";
//Styles
import { Theme } from "@mui/material/styles";
//Utils
import { Gender, users, User } from "../utils/mockData";

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

type FormValues = {
  personalId: string;
  name: string;
  surname: string;
  gender: Gender | string;
  birthDate: Date;
  birthPlace: string;
  phoneNumber: number | string;
  address: string;
};

const UserForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { usersData } = useSelector((state: RootState) => state.usersData);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    defaultValues: {
      personalId: "",
      name: "",
      surname: "",
      gender: "",
      birthDate: undefined,
      birthPlace: "",
      phoneNumber: "",
      address: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
    const newRow = { id: generateRandomId(), ...data };
    dispatch(addNewRow(newRow));
    navigate("/");
  };

  const generateRandomId = (): number => {
    const min = 10000000;
    const max = 99999999;
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const isPastDate = (date: Date): boolean => {
    const now = new Date();
    return date < now;
  };

  const checkOriginalIdNumber = (
    users: User[],
    personalId: string
  ): boolean => {
    let personalIdsArray = [];
    for (const element of users) {
      personalIdsArray.push(element.personalId);
    }
    return personalIdsArray.includes(personalId);
  };

  const isAtLeastElevenCharacters = (personalId: string): boolean =>
    personalId.length >= 11;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={styles.formContainer}>
        <Typography sx={styles.formHeaderLabel}>ველის დამატება</Typography>

        <Controller
          control={control}
          name="personalId"
          // defaultValue=""
          rules={{
            required: "Personal Id is required",
            validate: {
              isAtLeastElevenCharacters: (personalIdNumber) =>
                isAtLeastElevenCharacters(personalIdNumber) ||
                "Personal Id number should be at least 11 characters long",
              checkOriginalIdNumber: (personalIdNumber) =>
                !checkOriginalIdNumber(usersData, personalIdNumber) ||
                "User with such Personal Id Number already exists",
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
          // defaultValue=""
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
          // defaultValue=""
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
            // defaultValue=""
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
                isPastDate(date) || "Please, enter a past date",
            },
            required: "Birth Date is required",
          }}
          render={({ field, fieldState }) => (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                {...field}
                label="Date"
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
          // defaultValue=""
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
          // defaultValue={undefined}
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
          // defaultValue=""
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
