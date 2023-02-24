import { useAppSelector } from '../../src/redux/hooks';
import { useRouter } from 'next/router';
import GoHome from '../../src/components/common/Layout/GoHome';
import { useEffect, useState } from 'react';
import Career from './careers';
import { GetServerSideProps } from 'next';

interface CoursesProps {
  parseToken?: string;
}

export default function Courses ({ parseToken }: CoursesProps) {

  const { selected } = useAppSelector(st => st.career);
  const router = useRouter();

  const [courses, setCourses] = useState<Career[]>([]);


  useEffect(() => {
    // TODO: Realizar el dispatch que carga los cursos correspondientes a la carrera
  }, [selected]);


  if (!selected) return <GoHome />;

  return (
    <>
      Bienvenido a los cursos!
    </>
  );
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { token } = ctx.req.cookies;
  if (!token) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }

  return {
    props: {
    }
  };
};
