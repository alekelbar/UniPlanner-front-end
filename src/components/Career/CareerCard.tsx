import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import React from 'react';

interface CareerCardProps {
  title: string;
}

export const CareerCard: React.FC<CareerCardProps> = ({ title }) => {
  return (
    <Card>
      <CardContent>
        <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
          {title}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={() => console.log('ver cursos')}
        > Ver cursos </Button>
      </CardActions>
    </Card>
  );
};
