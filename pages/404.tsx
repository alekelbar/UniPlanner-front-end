import { GetServerSideProps } from 'next';
import GoHome from '../src/components/Layout/GoHome';
import { UserState } from '../src/interfaces/users.interface';
import { validateToken } from '../src/services/auth/validate-token';

export default function NotFound () {
  return (
    <GoHome />
  );
}
