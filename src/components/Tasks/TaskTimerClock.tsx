import TimerClock from '../../../src/components/Tasks/TimerClock';
import { useContext } from 'react';
import { taskPageContext } from './context/TaskPageContext';


export const TaskTimerClock = () => {
  const {
    dialogHandler: {
      openClock,
      handleCloseClock
    }
  } = useContext(taskPageContext);
  return (
    <TimerClock
      open={openClock}
      onClose={handleCloseClock} />
  );
};