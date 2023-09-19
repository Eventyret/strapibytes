import Link from 'next/link';


const CoursesPage = async () => {
  return (
    <div className='p-6'>
      <Link href="/teacher/create">
        New Course
      </Link>
    </div>
  );
}
export default CoursesPage;