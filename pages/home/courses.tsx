import GoHome from '../../src/components/common/Layout/GoHome';
import { useAppSelector } from '../../src/redux/hooks';
import { useRouter } from 'next/router';

export default function Courses () {
  const { selected } = useAppSelector(st => st.career);
  const router = useRouter();


  console.log(selected);
  return (
    <>
      {
        !selected
          ? (
            <GoHome />
          )
          : (
            null
          )
      }
    </>
  );
}
