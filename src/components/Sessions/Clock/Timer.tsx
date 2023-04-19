import { Button, ButtonGroup, Stack, SxProps, Theme } from "@mui/material";


import React from 'react';


interface IClockControlsButton {
  title: string;
  styles?: SxProps<Theme>;
}

export const ControlsButton: React.FC<IClockControlsButton> = ({ title, styles }): JSX.Element => {
  return (
    <ButtonGroup>
      <Stack>
        <Button sx={{ ...styles }}>{title}</Button>
      </Stack>
    </ButtonGroup>
  );
};

export const TimerControls = () => {

  return (
    <ButtonGroup>
      <Stack sx={{ display: 'flex', placeItems: 'center' }}>
        <ControlsButton title="Terminar" />
        <ControlsButton title="Pausar" />
      </Stack>
    </ButtonGroup>
  );
};


