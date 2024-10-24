import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

function SideNav({ chapters, course }) {
  const navigate = useNavigate();

  return (
    <aside
      id="default-sidebar"
      className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          <li
            className="my-2 flex flex-row items-center cursor-pointer"
            onClick={() => navigate("/courses")}
          >
            <FaArrowLeft />
            <span className="flex-1 ms-3 whitespace-nowrap ">Back</span>
          </li>
          <li className="py-4">
            <span className="flex-1 ms-3 whitespace-nowrap font-bold text-lg break-words w-full">
              {course?.title}
            </span>
          </li>
          {chapters.map((chapter, index) => (
            <li
              key={chapter.id}
              className={
                index == 0
                  ? `border-t-2 border-b-2 border-gray-300 py-1`
                  : `border-b-2 border-gray-300 py-1`
              }
            >
              <a
                href={`/course/${course.courseid}/chapter/${chapter.chapter_number}`}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <span className="flex-1 ms-3 whitespace-nowrap">
                  {chapter.title}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

SideNav.propTypes = {
  chapters: PropTypes.arrayOf(PropTypes.object),
  course: PropTypes.object,
};

export default SideNav;
