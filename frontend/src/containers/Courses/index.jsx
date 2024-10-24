import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { API_URL } from "@/lib/utils";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet";

function Courses() {
  const navigate = useNavigate();

  const [courseTitle, setCourseTitle] = useState("");
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const getCourses = async () => {
      const response = await fetch(`${API_URL}/v1/api/courses/`);
      const res = await response.json();
      setCourses(res);
    };
    getCourses();
  }, []);

  const createCourse = async () => {
    try {
      await fetch(`${API_URL}/v1/api/courses/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: courseTitle,
        }),
      });
      toast.info("Course Creation in Progress...Check in sometime!");
      setCourseTitle("");
    } catch {
      toast.error("Course Creation Failed");
    }
  };

  return (
    <>
      <Helmet>
        <script>
          {`
            window.watsonAssistantChatOptions = {
              integrationID: "9e58fddc-a495-46e7-b1a6-2dbf90bb0182", // The ID of this integration.
              region: "us-south", // The region your integration is hosted in.
              serviceInstanceID: "c1975ea6-9e83-41c0-974d-f80a7949d77e", // The ID of your service instance.
              onLoad: async (instance) => { await instance.render(); }
            };
            setTimeout(function(){
              const t=document.createElement('script');
              t.src="https://web-chat.global.assistant.watson.appdomain.cloud/versions/" + (window.watsonAssistantChatOptions.clientVersion || 'latest') + "/WatsonAssistantChatEntry.js";
              document.head.appendChild(t);
            });
        `}
        </script>
      </Helmet>
      <ToastContainer />
      <div className="h-full grid grid-cols-6 gap-3">
        <div className="flex flex-col col-span-4">
          <p className="font-bold text-2xl leading-none mb-5">Your Courses</p>
          <div className="grid grid-cols-3 grid-flow-rows gap-4">
            {courses.map((course) => {
              return (
                <Card key={course.id}>
                  <CardContent className="w-full h-48">
                    <img
                      className="h-full w-full object-cover"
                      src={course.image_url}
                    />
                  </CardContent>
                  <CardFooter className="flex flex-row justify-between">
                    <p className="text-lg">{course.title}</p>
                    <Button
                      onClick={() =>
                        navigate(`/course/${course.courseid}/chapter/0`)
                      }
                    >
                      Start
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col col-span-2">
          <p className="font-bold text-2xl leading-none mb-5 text-center">
            ✨ Create Course with AI✨
          </p>
          <div className="flex flex-row my-1 overflow-y-none">
            <Input
              type="text"
              placeholder="What do you want to learn today?"
              value={courseTitle}
              className="mr-1"
              onChange={(e) => setCourseTitle(e.target.value)}
            />
            <Button onClick={createCourse}>Create</Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Courses;
