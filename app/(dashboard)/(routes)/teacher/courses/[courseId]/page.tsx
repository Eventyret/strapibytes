import React from 'react';

interface SingleCourseProps {
  params: {
    courseId: string;
  }
}

const SingleCourse: React.FC<SingleCourseProps> = async ({ params }) => {
  return (
    <div>
      { params.courseId }
    </div>
  );
}
export default SingleCourse;