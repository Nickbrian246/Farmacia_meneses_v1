import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

// type setIsOpenModal = React.Dispatch<React.SetStateAction<boolean>>;
interface Props {
    nextStep:number,
}
const steps = [
'Seleccione la accion',
'rellene los datos',
];


const  HorizontalLabelPositionBelowStepper=(props:Props) => {
    const { nextStep} =props
    const nextValue:number = nextStep

return (
    <Box sx={{ width: '100%' }}>
    <Stepper activeStep={nextValue} alternativeLabel>
        {steps.map((label) => (
        <Step key={label}>
            <StepLabel>{label}</StepLabel>
        </Step>
        ))}
    </Stepper>
    </Box>
);
}
export {HorizontalLabelPositionBelowStepper}