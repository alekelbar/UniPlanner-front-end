import { Add } from '@mui/icons-material';
import { Container } from '@mui/material';
import { GetServerSideProps } from 'next';
import { DragDropContext } from 'react-beautiful-dnd';
import { FloatButton } from '../../src/components';
import { BoardList } from '../../src/components/Kanban/BoardList';
import { KanbanBoard } from '../../src/components/Kanban/KanbanForm';
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
      <Container sx={{
        mt: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'start',
        overflow: 'auto',
        maxHeight: '70vh',
      }}>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <BoardList header={todo + ' 📝'} droppableId={todo} listOfItems={lists.TODO} />
          <BoardList header={doing + ' ✏️'} droppableId={doing} listOfItems={lists.DOING} />
          <BoardList header={done + ' ✔️'} droppableId={done} listOfItems={lists.DONE} />
          <FloatButton
            onAction={onOpen}
            icon={<Add sx={{ fontSize: { md: '2.5em' } }} />}
            sxProps={{ position: 'fixed', bottom: 16, right: 16 }} />
        </DragDropContext>
      </Container>
      <KanbanBoard onClose={onClose} open={OpenAdd} />
    </>
  );
};

export default Kanban;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { token } = ctx.req.cookies;
  return !token || !(await isValidToken(JSON.parse(token).token))
    ? {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    }
    : {
      props: {},
    };
};