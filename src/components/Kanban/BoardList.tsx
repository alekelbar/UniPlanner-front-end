import { List, Paper, Typography } from "@mui/material";
import { KanbanTaskModel } from "../../redux/slices/kanban/models/taskModel";
import { Droppable } from "react-beautiful-dnd";
import { BoardItem } from "./BoardItem";


interface BoardListProps {
  droppableId: string;
  listOfItems: KanbanTaskModel[];
  header: string;
}

export const BoardList = ({ droppableId, listOfItems, header }: BoardListProps): JSX.Element => {
  return (
    <Paper sx={{
      minWidth: '250px',
      maxWidth: '30%',
      minHeight: '70vh',
      border: '2px solid',
      p: 2,
    }}>
      <Typography
        variant='caption'
        fontSize={'1em'}
        textAlign={'center'}>
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
};