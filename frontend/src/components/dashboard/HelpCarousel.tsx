import {
  Box,
  Button,
  Modal,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import React, { useState } from "react";

const StyledModelContent = styled(Box)`
  cursor: pointer;
  border: none;
  background-color: white;
  max-width: 700px;
  position: relative;
  top: 30%;
  margin: auto;
`;

interface Props {
  open: boolean;
  handleClose: () => void;
}
const steps = [
  "Look at all the topics",
  "Attempt a question",
  "Complete the feedback question",
];

const HelpCarousel = ({ open, handleClose }: Props) => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <StyledModelContent>
        <Box sx={{ width: "100%" }}>
          <Stepper activeStep={activeStep}>
            {steps.map((label) => {
              return (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          <>
            <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "row",
                pt: 2,
              }}
            >
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Button
                disabled={activeStep === steps.length - 1}
                onClick={handleNext}
              >
                Next
              </Button>
            </Box>
          </>
        </Box>
      </StyledModelContent>
    </Modal>
  );
};

export default HelpCarousel;
