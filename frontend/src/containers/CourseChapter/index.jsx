import { useEffect, useState, useRef } from "react";

import LoadingScreen from "@/components/LoadingScreen";
import BotChat from "@/components/BotChat";
import { useParams } from "react-router-dom";
import { API_URL } from "@/lib/utils";

import SideNav from "./SideNav";
import TopBar from "@/components/TopBar";

function CourseChapter() {
  const [height, setHeight] = useState(0);
  const ref = useRef(null);
  let { courseid, chapterid } = useParams();

  useEffect(() => {
    setHeight(
      window.innerHeight - ref.current.getBoundingClientRect().top - 60
    );
  }, [setHeight]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const [chapters, setChapters] = useState([]);
  const [course, setCourse] = useState(null);
  const [currentChapter, setCurrentChapter] = useState(null);

  useEffect(() => {
    const getChapter = async () => {
      const response = await fetch(`${API_URL}/v1/api/courses/${courseid}/`);
      const res = await response.json();
      setCourse(res.course);
      setChapters(res.chapters);
      const currChapter = res.chapters.filter(
        (ch) => ch.chapter_number == chapterid
      );
      setCurrentChapter(currChapter[0]);
    };

    if (courseid) {
      getChapter();
    }
  }, [chapterid, courseid]);

  return (
    <LoadingScreen isLoading={isLoading}>
      <>
        <SideNav chapters={chapters} course={course} />
        <div className="h-screen py-4 sm:ml-64">
          <TopBar />
          <div className="px-4">
            <div className="grid grid-cols-6 gap-3 h-full pb-24">
              {currentChapter ? (
                <div className="flex flex-col col-span-4">
                  <img
                    src={course.image_url}
                    className="h-full w-full p-10"
                  ></img>
                  <p className="font-bold text-2xl leading-none mb-5">
                    {currentChapter?.title}
                  </p>
                  <p className="text-md leading-none mb-5 mx-2">
                    {currentChapter?.content}
                  </p>
                  <p className="font-bold text-2xl leading-none mb-5">
                    Resources:
                  </p>
                  <a
                    href={currentChapter?.resource_url}
                    className="text-md leading-none mb-5 mx-2 text-blue-400"
                  >
                    {currentChapter?.resource_url}
                  </a>
                </div>
              ) : null}
              <div className="flex flex-col col-span-2">
                <p
                  ref={ref}
                  className="font-bold text-2xl text-center leading-none mb-5"
                >
                  Ask MPower Chat
                </p>
                <BotChat
                  style={{ height }}
                  chatEndpoint={`/v1/api/courses/chat/${courseid}/`}
                />
              </div>
            </div>
          </div>
        </div>
      </>
    </LoadingScreen>
  );
}

export default CourseChapter;
