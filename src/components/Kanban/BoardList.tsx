import { List, Paper, Typography } from "@mui/material";
import React from 'react';
import { Droppable } from "react-beautiful-dnd";
import { KanbanTaskModel } from "../../redux/slices/kanban/models/taskModel";
import { BoardItem } from "./BoardItem";

interface BoardListProps {
  droppableId: string;
  listOfItems: KanbanTaskModel[];
  header: string;
}

export const BoardList = React.memo(({ droppableId, listOfItems, header }: BoardListProps): JSX.Element => {
  return (
    <Paper sx={{
      p: 2,
      minWidth: '250px',
      m: 1
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