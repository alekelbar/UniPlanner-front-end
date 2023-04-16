import { Delete } from "@mui/icons-material";
import { Button, Card, CardContent, CardHeader } from "@mui/material";
import { Draggable } from "react-beautiful-dnd";
import { KanbanTaskModel } from "../../redux/slices/kanban/models/taskModel";

interface BoardItemProps {
  draggableId: string;
  index: number;
  task: KanbanTaskModel;
  idx: number;
}

export const BoardItem = ({ task: { content, id, title }, idx }: BoardItemProps): JSX.Element => {
  return (
    <Draggable key={id} draggableId={id} index={idx}>
      {(draggableProvided) => (
        <Card
          sx={{
            bgcolor: 'secondary.dark',
            my: 2,
            transition: 'all 0.3s'
          }}
          {...draggableProvided.draggableProps}
          {...draggableProvided.dragHandleProps}
          ref={draggableProvided.innerRef}
          style={draggableProvided.draggableProps.style}
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
