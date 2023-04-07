import { Box, Button, Card, CardContent, CardHeader, Container, Dialog, DialogContent, DialogTitle, List, ListItem, ListItemText, Paper, Stack, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { FloatButton } from '../../src/components';
import { Add, Delete, Remove } from '@mui/icons-material';
import { useAppDispatch } from '../../src/redux';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { v1 as uuidV1 } from 'uuid';

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
        <Card
          sx={{
            bgcolor: 'secondary.dark',
          }}
          {...draggableProvided.draggableProps}
          {...draggableProvided.dragHandleProps}
          ref={draggableProvided.innerRef}
        >
          <CardHeader titleTypographyProps={{
            textOverflow: 'wrap',
          }} title={title} subheader={content} />
          <CardContent sx={{ display: 'flex', justifyContent: 'end' }}>
            <Button>
              <Delete color='error' />
            </Button>
          </CardContent>
        </Card>
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
      minWidth: '250px',
      maxWidth: '30%',
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

interface KanbanAddProps {
  open: boolean;
  onClose: () => void;
}

const KanbanAddTodo = ({ onClose, open }: KanbanAddProps): JSX.Element => {

  const dispatch = useAppDispatch();
  const router = useRouter();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const width = fullScreen ? '100%' : '50%';


  const formik = useFormik({
    initialValues: {
      title: '',
      content: ''
    },
    onSubmit: async (values) => {
      const { content, title } = values;
      const task: TaskModel = {
        id: uuidV1(),
        content,
        title
      };

      console.log(task);
    },
    validationSchema: Yup.object({
      content: Yup
        .string()
        .required("La descripción de la tarea es requerida")
        .min(10, "Trate de usar al menos 10 caracteres")
        .max(30, "No puede usar más de 20 caracteres"),
      title: Yup
        .string()
        .required("El nombre de la tarea es requerida")
        .min(5, "Trate de usar al menos 5 caracteres")
        .max(30, "No puede usar más de 20 caracteres"),
    }),
  });

  return (
    <Dialog
      sx={{
        '& .MuiDialog-paper': {
          width: width,
          height: 'auto'
        }
      }}
      onClose={onClose}
      open={open}>
      <DialogTitle >
        Nueva Tarea
      </DialogTitle>

      <DialogContent>
        <Stack
          component={'form'}
          onSubmit={formik.handleSubmit}
          direction="column"
          justifyContent={'center'}
          alignItems={'center'}
          spacing={2}>

          <TextField
            fullWidth
            name="title"
            onChange={formik.handleChange}
            value={formik.values.title}
            type={'text'}
            onBlur={formik.handleBlur}
            autoComplete="off"
            rows={2}
            multiline
            placeholder="Nombre"
            helperText="¿Como va a nombrar a esta tarea?" />

          {formik.touched.title && formik.errors.title && (
            <Typography variant='caption' color={'error'}>{formik.errors.title}</Typography>
          )}

          <TextField
            fullWidth
            name="content"
            onChange={formik.handleChange}
            value={formik.values.content}
            type={'text'}
            onBlur={formik.handleBlur}
            autoComplete="off"
            rows={2}
            multiline
            placeholder="descripción"
            helperText="¿Como va a nombrar a esta tarea?" />

          {formik.touched.content && formik.errors.content && (
            <Typography variant='caption' color={'error'}>{formik.errors.content}</Typography>
          )}
          <Button
            fullWidth
            type='submit'
            color='success'
            variant='contained'>
            Crear
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

const Kanban = () => {

  const [OpenAdd, setOpenAdd] = useState(false);
  const onOpen = () => {
    setOpenAdd(true);
  };

  const onClose = () => {
    setOpenAdd(false);
  };

  const [lists, setLists] = useState<ListsState>({
    TODO: [{
      content: 'hello world',
      id: 'hello world-1',
      title: 'Testing my kanban board with a lot of content'
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
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Container component={'div'} sx={{
        mt: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'start',
        width: '90%',
        overflowX: 'auto',

      }}>
        <BoardList header={todo} droppableId={todo} listOfItems={lists.TODO} />
        <BoardList header={doing} droppableId={doing} listOfItems={lists.DOING} />
        <BoardList header={done} droppableId={done} listOfItems={lists.DONE} />
        <FloatButton
          onAction={onOpen}
          icon={<Add sx={{ fontSize: { md: '2.5em' } }} />}
          sxProps={{ position: 'fixed', bottom: 16, right: 16 }} />
        <KanbanAddTodo onClose={onClose} open={OpenAdd} />
      </Container>
    </DragDropContext>
  );
};

export default Kanban;