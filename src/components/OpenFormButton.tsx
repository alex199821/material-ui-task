import React from "react";
import MuiButton from "@mui/material/Button";
import { Theme } from "@mui/material/styles";

import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { SvgIconComponent } from "@mui/icons-material";
interface ButtonProps {
  //Icon needs type assignment
  icon: any;
  onClick: () => void;
}

const styles = {
  editBtn: (theme: Theme) => ({
    padding: "8px",
    color: theme.palette.secondary.main,
    borderRadius: "50px",
    ":hover": {
      color: theme.palette.primary.main,
    },
  }),
};

const OpenFormButton: React.FC<ButtonProps> = ({ onClick, icon }) => {
  return (
    <MuiButton onClick={onClick} sx={styles.editBtn}>
      {icon}
    </MuiButton>
  );
};

export default OpenFormButton;
