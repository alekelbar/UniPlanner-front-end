import { render, screen } from '@testing-library/react';

import { CareerCard, CourseCard, DeliveryCard, SessionCard, TaskCard } from '../components';
import { store } from '../redux/store';
import { Provider } from 'react-redux';
import { createMockRouter } from './testUtils/MockRouter';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import { DELIVERABLE_TAGS } from '../interfaces/deliveries.interface';


describe('Cards tests', () => {

  it('Career Card should be Rendered', () => {
    render(
      <RouterContext.Provider value={createMockRouter({})}>
        <Provider store={store}>
          <CareerCard career={{
            _id: 'career 1',
            name: 'Career Name'
          }} />
        </Provider>
      </RouterContext.Provider>
    );
    const card = screen.getByTestId('career-card');
    expect(card).toBeInTheDocument();
  });

  it('Task Card should be Rendered', () => {
    render(
      <RouterContext.Provider value={createMockRouter({})}>
        <Provider store={store}>
          <TaskCard task={{
            descripcion: 'Task Name',
            name: 'Task Name',
            status: 'COMPLETE',
            _id: 'TASK-ID',
            delivery: 'DELIVERY_ID'
          }} actualPage={1} onOpenEdit={() => { }} openClock={() => { }} reload={(num) => { }} />
        </Provider>
      </RouterContext.Provider>
    );
    const card = screen.getByTestId('task-card');
    expect(card).toBeInTheDocument();
  });

  it('Course Card should be Rendered', () => {
    render(
      <RouterContext.Provider value={createMockRouter({})}>
        <Provider store={store}>
          <CourseCard course={{
            name: 'Task Name',
            _id: 'TASK-ID',
            career: 'course id',
            courseDescription: 'Course description',
            credits: 2,
            user: 'my user'
          }} actualPage={1} onOpenEdit={() => { }} reload={(num) => { }} />
        </Provider>
      </RouterContext.Provider>
    );
    const card = screen.getByTestId('course-card');
    expect(card).toBeInTheDocument();
  });

  it('Session Card should be Rendered', () => {
    render(
      <RouterContext.Provider value={createMockRouter({})}>
        <Provider store={store}>
          <SessionCard session={{
            name: 'Task Name',
            _id: 'TASK-ID',
            user: 'my user',
            duration: 2,
            type: ''
          }} actualPage={1} reload={(num) => { }} onStartSession={() => { }} />
        </Provider>
      </RouterContext.Provider>
    );
    const card = screen.getByTestId('session-card');
    expect(card).toBeInTheDocument();
  });

  it('Delivery Card should be not Rendered while a selected setting, it\'s not defined ', async () => {
    render(
      <RouterContext.Provider value={createMockRouter({})}>
        <Provider store={store}>
          <DeliveryCard deliverable={{
            name: 'Task Name',
            _id: 'TASK-ID',
            deadline: new Date(),
            description: '',
            importance: DELIVERABLE_TAGS.IMPORTANT,
            note: 80,
            percent: 12,
            status: '',
            urgency: DELIVERABLE_TAGS.URGENT,
            course: '',
            createdAt: new Date()
          }} actualPage={1} onOpenEdit={() => { }} reload={(num) => { }} />
        </Provider>
      </RouterContext.Provider>
    );
    const element = screen.queryByTitle(/Task Name/i);
    expect(element).not.toBeInTheDocument();     
  });
});