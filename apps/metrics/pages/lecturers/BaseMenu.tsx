import Link from 'next/link';
import React from 'react';

type RankingMenuProps = {
  page: string;
};

function BasegMenu(props: RankingMenuProps) {
  const { page } = props;
  return (
    <>
      <Link
        href={'/lecturers'}
        className={`btn w-full my-1 ${
          page === 'dashboard' ? 'bg-[#3560a0]' : 'bg-[#7187a8]'
        }  hover:bg-[#3560a0] border-1 hover:shadow-lg text-white`}
      >
        University Updates (0)
      </Link>
      <Link
        href={'/lecturers'}
        className={`btn w-full my-1 ${
          page === 'dashboard' ? 'bg-[#3560a0]' : 'bg-[#7187a8]'
        }  hover:bg-[#3560a0] border-1 hover:shadow-lg text-white active:bg-[#355f9c]`}
      >
        Faculty Updates (0)
      </Link>
      <Link
        href={'/lecturers'}
        className={`btn w-full my-1 ${
          page === 'dashboard' ? 'bg-[#3560a0]' : 'bg-[#7187a8]'
        }  hover:bg-[#3560a0] border-1 hover:shadow-lg text-white`}
      >
        Depertment Updates (0)
      </Link>
    </>
  );
}

export default BasegMenu;
