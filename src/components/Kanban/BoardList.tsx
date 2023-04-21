import { List, Paper, Typography, useMediaQuery, useTheme } from "@mui/material";
import React from 'react';
import { Droppable } from "react-beautiful-dnd";
import { KanbanTaskModel } from "../../redux/slices/kanban/models/taskModel";
import { BoardItem } from "./BoardItem";
import styles from './css/BoardList.module.css';

interface BoardListProps {
  droppableId: string;
  listOfItems: KanbanTaskModel[];
  header: string;
}

export const BoardList = React.memo(({ droppableId, listOfItems, header }: BoardListProps): JSX.Element => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const width = fullScreen ? '100%' : '30%';

  return (
    <Paper sx={{
      p: 2,
      minWidth: width,
      m: 1,
      transition: 'all 0.5s ease-in-out',
      scrollBehavior: 'smooth',
      ...styles
    }}>
      <Typography
        variant='body1'
      >
        {header}
      </Typography>
      <Droppable droppableId={droppableId}>
        {
          (droppableProvided) => (
            <List component={'div'} sx={{
              transition: 'all 0.3s',
            }}
              {...droppableProvided.droppableProps}
              ref={droppableProvided.innerRef}
            >
              {listOfItems.map((item, idx) => (
                <BoardItem
                  task={item}
                  draggableId={item.id}
                  index={idx}
                  key={item.id}
                  idx={idx}
                />
              ))}
              {droppableProvided.placeholder}
            </List>
          )
        }
      </Droppable>
    </Paper>
  );
});
