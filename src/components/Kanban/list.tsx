import { Container } from '@mui/material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


// interface BoardItemProps {
//   draggableId: string;
//   index: number;
// }

// const BoardItem = ({ draggableId, index }: BoardItemProps): JSX.Element => {
//   return (
//     <Draggable draggableId={draggableId} index={index}>
//       {(draggableProvidad) => (
//         <li
//           {...draggableProvidad.draggableProps}
//           ref={draggableProvidad.innerRef}
//           {...draggableProvidad.dragHandleProps}
//         >Hola mundo!
//         </li>
//       )}
//     </Draggable>
//   );
// };

// interface BoardListProps {
//   droppableId: string;
// }

// const BoardList = ({ droppableId }: BoardListProps): JSX.Element => {
//   return (
//     <Droppable droppableId={droppableId}>
//       {
//         (droppableProvided) => (
//           <ul {...droppableProvided.droppableProps} ref={droppableProvided.innerRef}>
//             <Draggable draggableId={'a1212'} index={0}>
//               {(draggableProvided) => (
//                 <li
//                   {...draggableProvided.draggableProps}
//                   ref={draggableProvided.innerRef}
//                   {...draggableProvided.dragHandleProps}
//                 >Hola mundo!
//                 </li>
//               )}
//             </Draggable>
//             <Draggable draggableId={'2asdfasd'} index={1}>
//               {(draggableProvided) => (
//                 <li
//                   {...draggableProvided.draggableProps}
//                   ref={draggableProvided.innerRef}
//                   {...draggableProvided.dragHandleProps}
//                 >Hola mundo!
//                 </li>
//               )}
//             </Draggable>
//             {droppableProvided.placeholder}
//           </ul>
//         )
//       }
//     </Droppable>
//   );
// };

const droppableId = "board";

const Kanban = () => {
  return (
    <DragDropContext onDragEnd={res => console.log(res)}>
      <Container>
        <Droppable droppableId={droppableId}>
          {
            (droppableProvided) => (
              <ul
                {...droppableProvided.droppableProps}
                ref={droppableProvided.innerRef}>

                <Draggable draggableId={'task-01'} index={0}>
                  {(draggableProvided) => (
                    <li
                      {...draggableProvided.draggableProps}
                      {...draggableProvided.dragHandleProps}
                      ref={draggableProvided.innerRef}
                    >Hola mundo!
                    </li>
                  )}
                </Draggable>
                <Draggable draggableId={'task-02'} index={1}>
                  {(draggableProvided) => (
                    <li
                      {...draggableProvided.draggableProps}
                      {...draggableProvided.dragHandleProps}
                      ref={draggableProvided.innerRef}
                    >Hola mundo!
                    </li>
                  )}
                </Draggable>
                {droppableProvided.placeholder}
              </ul>
            )
          }
        </Droppable>
      </Container>
    </DragDropContext>
  );
};

export default Kanban;