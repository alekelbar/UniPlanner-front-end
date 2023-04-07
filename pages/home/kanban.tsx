import { Box, Button, Card, CardContent, CardHeader, Container, Dialog, DialogContent, DialogTitle, Grid, List, ListItem, ListItemText, Paper, Stack, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { FloatButton } from '../../src/components';
import { Add, Delete, Remove } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../src/redux';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { v1 as uuidV1 } from 'uuid';
import { KanbanTaskModel } from '../../src/redux/slices/kanban/models/taskModel';
import { addTask, setStatus } from '../../src/redux/slices/kanban/kanban-slice';
import { BoardItem } from '../../src/components/Kanban/BoardItem';
import { BoardList } from '../../src/components/Kanban/BoardList';
import { KanbanAddTodo } from '../../src/components/Kanban/KanbanAddTodo';
import { useKanbanBoard } from '../../src/components/Kanban/hooks/useKanbanBoard';

// model ...

const Kanban = () => {

  const {
    data: {
      OpenAdd,
      lists,
      loading
    },
    handlers: {
      handleOnDragEnd,
      onClose,
      onOpen
    },
    headers: {
      todo,
      doing,
      done
    }
  } = useKanbanBoard();

  if (loading) return <div>Cargando</div>;

  return (
    <>
      <DragDropContext onBeforeCapture={() => {
        console.log("¿Before?");
      }} onDragEnd={handleOnDragEnd}>
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
        </Container>
      </DragDropContext>
      <KanbanAddTodo onClose={onClose} open={OpenAdd} />
    </>
  );
};

export default Kanban;