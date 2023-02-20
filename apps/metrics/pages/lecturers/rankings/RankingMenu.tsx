import Link from 'next/link';
import React from 'react';

type RankingMenuProps = {
  page: string;
};

function RankingMenu(props: RankingMenuProps) {
  const { page } = props;
  return (
    <>
      <Link
        href={'/lecturers/rankings'}
        className={`btn w-full my-1 ${
          page === 'school' ? 'bg-[#3560a0]' : 'bg-[#7187a8]'
        }  hover:bg-[#3560a0] border-1 hover:shadow-lg text-white`}
      >
        View School Ranking
      </Link>
      <Link
        href={'/lecturers/rankings/faculty'}
        className={`btn w-full my-1 ${
          page === 'faculty' ? 'bg-[#3560a0]' : 'bg-[#7187a8]'
        }  hover:bg-[#3560a0] border-1 hover:shadow-lg text-white`}
      >
        View Faculty Ranking
      </Link>
      <Link
        href={'/lecturers/rankings/department'}
        className={`btn w-full my-1 ${
          page === 'department' ? 'bg-[#3560a0]' : 'bg-[#7187a8]'
        }  hover:bg-[#3560a0] border-1 hover:shadow-lg text-white`}
      >
        View Depertment Ranking
      </Link>
    </>
  );
}

export default RankingMenu;
