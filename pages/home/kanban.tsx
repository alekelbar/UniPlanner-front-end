import { Box, Container, List, ListItem, ListItemText, Paper, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { FloatButton } from '../../src/components';
import { Add } from '@mui/icons-material';

// model ...
interface TaskModel {
  id: string,
  title: string,
  content: string;
}


interface BoardItemProps {
  draggableId: string;
  index: number;
  task: TaskModel;
  idx: number;
}

const BoardItem = ({ task: { content, id, title }, idx }: BoardItemProps): JSX.Element => {
  return (
    <Draggable key={id} draggableId={id} index={idx}>
      {(draggableProvided) => (
        <ListItem
          sx={{
            bgcolor: 'secondary.dark'
          }}
          {...draggableProvided.draggableProps}
          {...draggableProvided.dragHandleProps}
          ref={draggableProvided.innerRef}
        >
          <ListItemText primaryTypographyProps={{
          }} primary={title} secondary={content} />
        </ListItem>
      )}
    </Draggable>
  );
};


interface BoardListProps {
  droppableId: string;
  listOfItems: TaskModel[];
  header: string;
}

const BoardList = ({ droppableId, listOfItems, header }: BoardListProps): JSX.Element => {
  return (
    <Paper sx={{
      minWidth: '30%',
      minHeight: '70vh',
      p: 2,
    }}>
      <Typography
        bgcolor={'primary.light'}
        borderRadius={'8px'}
        variant='h5'
        lineHeight={'2em'}
        textAlign={'center'}>
        {header}
      </Typography>
      <Droppable droppableId={droppableId}>
        {
          (droppableProvided) => (
            <List
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

type ListsState = {
  TODO: TaskModel[],
  DOING: TaskModel[],
  DONE: TaskModel[],
};

const Kanban = () => {

  const [OpenAdd, setOpenAdd] = useState(false);
  const onOpen = () => {
    setOpenAdd(true);
  };

  const [lists, setLists] = useState<ListsState>({
    TODO: [{
      content: 'hello world',
      id: 'hello world-1',
      title: 'Testing my kanban'
    }],
    DOING: [],
    DONE: []
  });

  const handleOnDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    // out of bounds
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      // Mismo tablero
      const newItems = [...lists[source.droppableId as keyof ListsState]];
      const [removed] = newItems.splice(source.index, 1);
      newItems.splice(destination.index, 0, removed);

      setLists({
        ...lists,
        [source.droppableId]: newItems
      });
    } else {
      // Diferente tablero
      const sourceItems = [...lists[source.droppableId as keyof ListsState]];
      const [removed] = sourceItems.splice(source.index, 1);

      const destItems = [...lists[destination.droppableId as keyof ListsState]];
      destItems.splice(destination.index, 0, removed);

      setLists({
        ...lists,
        [source.droppableId]: sourceItems,
        [destination.droppableId]: destItems
      });
    }
  };


  const [todo, doing, done] = Object.keys(lists);

  return (
    <Container sx={{
      mt: 2
    }}>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Stack overflow={'auto'} direction={'row'} justifyContent={'space-evenly'}>
          <BoardList header={todo} droppableId={todo} listOfItems={lists.TODO} />
          <BoardList header={doing} droppableId={doing} listOfItems={lists.DOING} />
          <BoardList header={done} droppableId={done} listOfItems={lists.DONE} />
        </Stack>
      </DragDropContext>
      <FloatButton
        onAction={onOpen}
        icon={<Add sx={{ fontSize: { md: '2.5em' } }} />}
        sxProps={{ position: 'fixed', bottom: 16, right: 16 }} />
    </Container>
  );
};

export default Kanban;