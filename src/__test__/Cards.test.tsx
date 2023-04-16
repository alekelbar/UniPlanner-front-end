import { screen } from '@testing-library/react';

import { RouterContext } from 'next/dist/shared/lib/router-context';
import { CareerCard, CourseCard, DeliveryCard, SessionCard, TaskCard } from '../components';
import { DELIVERABLE_TAGS } from '../interfaces/deliveries.interface';
import { createMockRouter } from './testUtils/MockRouter';
import { renderWithProviders } from './testUtils/test-utils';


describe('Cards tests', () => {

  it('Career Card should be Rendered', () => {
    renderWithProviders(
      <RouterContext.Provider value={createMockRouter({})}>

        <CareerCard career={{
          _id: 'career 1',
          name: 'Career Name'
        }} />

      </RouterContext.Provider>
    );
    const card = screen.getByTestId('career-card');
    expect(card).toBeInTheDocument();
  });

  it('Task Card should be Rendered', () => {
    renderWithProviders(
      <RouterContext.Provider value={createMockRouter({})}>

        <TaskCard task={{
          descripcion: 'Task Name',
          name: 'Task Name',
          status: 'COMPLETE',
          _id: 'TASK-ID',
          delivery: 'DELIVERY_ID'
        }} actualPage={1} onOpenEdit={() => { }} openClock={() => { }} reload={(num) => { }} />

      </RouterContext.Provider>
    );
    const card = screen.getByTestId('task-card');
    expect(card).toBeInTheDocument();
  });

  it('Course Card should be Rendered', () => {
    renderWithProviders(
      <RouterContext.Provider value={createMockRouter({})}>

        <CourseCard course={{
          name: 'Task Name',
          _id: 'TASK-ID',
          career: 'course id',
          courseDescription: 'Course description',
          credits: 2,
          user: 'my user'
        }} actualPage={1} onOpenEdit={() => { }} reload={(num) => { }} />

      </RouterContext.Provider>
    );
    const card = screen.getByTestId('course-card');
    expect(card).toBeInTheDocument();
  });

  it('Session Card should be Rendered', () => {
    renderWithProviders(
      <RouterContext.Provider value={createMockRouter({})}>

        <SessionCard session={{
          name: 'Task Name',
          _id: 'TASK-ID',
          user: 'my user',
          duration: 2,
          type: ''
        }} actualPage={1} reload={(num) => { }} onStartSession={() => { }} />

      </RouterContext.Provider>
    );
    const card = screen.getByTestId('session-card');
    expect(card).toBeInTheDocument();
  });

  it('Delivery Card should be not Rendered while a selected setting, it\'s not defined ', async () => {
    renderWithProviders(
      <RouterContext.Provider value={createMockRouter({})}>

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
          createdAt: new Date('2023-02-28'),
        }} actualPage={1} onOpenEdit={() => { }} reload={(num) => { }} />

      </RouterContext.Provider>);

    const element = screen.queryByTitle(/Task Name/i);
    expect(element).not.toBeInTheDocument();
  });
});