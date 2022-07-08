import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { IOptions, Node } from './logic/Node';

interface ButtonOptionProps {
  text: string;
  onClick: () => void;
}

export const ButtonOption: React.FC<ButtonOptionProps> = (props) => {
  return (
    <Button
      onClick={() => props.onClick()}
      variant="outlined"
      sx={{ width: '80%' }}
    >
      {props.text}
    </Button>
  );
};

interface DateOptionProps {
  setCurrentNode: (n: Node) => void;
  options: IOptions;
}

export const DateOption: React.FC<DateOptionProps> = (props) => {
  const [date, setDate] = useState<Date>(new Date());
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Date of dismissal"
        value={date}
        onChange={(newValue) => {
          setDate(newValue!);
          const now = new Date();
          const diff = Math.abs(now.getTime() - newValue!.getTime());
          const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
          console.log(diffDays);
          if (diffDays > 21) {
            props.setCurrentNode(props.options['>21']);
          } else {
            props.setCurrentNode(props.options['<21']);
          }
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
};
