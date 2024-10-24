import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { API_URL } from "@/lib/utils";

function Dashboard() {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  useEffect(() => {
    setName(localStorage.getItem("user_name"));
  }, []);

  const [courses, setCourses] = useState([]);
  useEffect(() => {
    const getCourses = async () => {
      const response = await fetch(`${API_URL}/v1/api/courses/`);
      const res = await response.json();
      setCourses(res);
    };
    getCourses();
  }, []);

  const [bankOffers, setBankOffers] = useState([]);
  useEffect(() => {
    const getBankOffers = async () => {
      const response = await fetch(`${API_URL}/v1/api/bank_offers/`);
      const res = await response.json();
      setBankOffers(res);
    };
    getBankOffers();
  }, []);

  return (
    <div className="grid grid-cols-5 gap-3">
      <div className="flex flex-col col-span-4">
        <p className="font-semibold text-4xl mb-14">{`Welcome ${name}`}</p>
        <div className="flex flex-row items-end mb-5">
          <p className="font-bold text-2xl leading-none">Your Courses</p>
          <a
            href="/courses"
            className="font-bold text-sm ml-3 text-blue-700 leading-none"
          >
            See more
          </a>
        </div>
        <Card className="px-10 py-4">
          <CardContent>
            <Carousel>
              <CarouselContent>
                {courses.map((course) => {
                  return (
                    <CarouselItem key={course.id} className="basis-1/3">
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
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <CarouselNext />
              <CarouselPrevious />
            </Carousel>
          </CardContent>
        </Card>

        <div className="flex flex-row items-end mb-5 mt-10">
          <p className="font-bold text-2xl leading-none">Bank Offers</p>
          <a
            href="/bank-offers"
            className="font-bold text-sm ml-3 text-blue-700 leading-none"
          >
            See more
          </a>
        </div>

        <Card className="px-10 py-4 mb-5">
          <CardContent>
            <Carousel>
              <CarouselContent>
                {bankOffers.map((offer) => {
                  return (
                    <CarouselItem key={offer.id} className="basis-1/3">
                      <Card key={offer.boid}>
                        <CardContent className="w-full h-48">
                          <p className="font-semibold text-md pt-4">
                            {offer.bank_name}
                          </p>
                          <img
                            src={offer.bank_image}
                            className="h-full w-full mt-2"
                          />
                        </CardContent>
                        <CardFooter className="flex flex-row justify-between mt-10">
                          <p className="font-bold text-md">
                            {offer.offer_details}
                          </p>
                          <a href={offer.offer_url} target="_blank">
                            <Button className="mt-2">See More</Button>
                          </a>
                        </CardFooter>
                      </Card>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <CarouselNext />
              <CarouselPrevious />
            </Carousel>
          </CardContent>
        </Card>
      </div>
      <div className="ml-5 mt-10">
        <Card>
          <CardHeader className="flex flex-col">
            <img
              src="https://uds-assets.udacity.com/glyphs/v2/rocket-smoke-two.svg"
              className="h-10 w-10"
            />
            <p className="font-bold text-xl">Weekly Progress</p>
            <span className="text-xs">Oct 14 - Oct 20</span>
          </CardHeader>
          <CardContent>
            <p className="font-semibold text-lg">Courses Done - 3/5</p>
          </CardContent>
          <CardFooter>
            <p className="text-xs">Current Streak - 3 Weeks</p>
          </CardFooter>
        </Card>
        <Card className="mt-5">
          <CardHeader className="flex flex-row justify-between">
            <div className="flex flex-row items-center">
              <img
                src="https://uds-assets.udacity.com/glyphs/v2/book-three.svg"
                className="w-10 mr-2"
              />
              <p>Lessons viewed</p>
            </div>
            <p>3</p>
          </CardHeader>
        </Card>
        <Card className="mt-5">
          <CardHeader className="flex flex-row justify-between">
            <div className="flex flex-row items-center">
              <img
                src="https://uds-assets.udacity.com/glyphs/v2/paper-curled-three.svg"
                className="w-10 mr-2"
              />
              <p>Bank Offers added</p>
            </div>
            <p>15</p>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;
