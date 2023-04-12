import { Add } from '@mui/icons-material';
import { Container } from '@mui/material';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { DragDropContext } from 'react-beautiful-dnd';
import { FloatButton } from '../../src/components';
import { BoardList } from '../../src/components/Kanban/BoardList';
import { KanbanAddTodo } from '../../src/components/Kanban/KanbanAddTodo';
import { useKanbanBoard } from '../../src/components/Kanban/hooks/useKanbanBoard';
import { isValidToken } from '../../src/helpers/isValidToken';

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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { token } = ctx.req.cookies;
  return !token || !(await isValidToken(JSON.parse(token).token))
    ? {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
    : {
      props: {},
    };
};