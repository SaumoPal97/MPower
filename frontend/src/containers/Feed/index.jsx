import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  FaRegHeart,
  FaRegComment,
  FaBook,
  FaHand,
  FaCircleQuestion,
} from "react-icons/fa6";

function Feed() {
  const posts = [
    {
      id: 1,
      username: "Nikita Bhowal",
      fallback: "NB",
      date: new Date(),
      description:
        "Just completed the course on how to start a knitting business and sell them online",
      img: "https://upload.wikimedia.org/wikipedia/commons/0/02/Oma_strickt_Str%C3%BCmpfe.jpg",
      likes: 10,
      comments: 2,
    },
    {
      id: 1,
      username: "Nikita Bhowal",
      fallback: "NB",
      date: new Date(),
      description:
        "Just completed the course on how to start a knitting business and sell them online",
      img: "https://upload.wikimedia.org/wikipedia/commons/0/02/Oma_strickt_Str%C3%BCmpfe.jpg",
      likes: 10,
      comments: 2,
    },
    {
      id: 1,
      username: "Nikita Bhowal",
      fallback: "NB",
      date: new Date(),
      description:
        "Just completed the course on how to start a knitting business and sell them online",
      img: "https://upload.wikimedia.org/wikipedia/commons/0/02/Oma_strickt_Str%C3%BCmpfe.jpg",
      likes: 10,
      comments: 2,
    },
    {
      id: 1,
      username: "Nikita Bhowal",
      fallback: "NB",
      date: new Date(),
      description:
        "Just completed the course on how to start a knitting business and sell them online",
      img: "https://upload.wikimedia.org/wikipedia/commons/0/02/Oma_strickt_Str%C3%BCmpfe.jpg",
      likes: 10,
      comments: 2,
    },
    {
      id: 1,
      username: "Nikita Bhowal",
      fallback: "NB",
      date: new Date(),
      description:
        "Just completed the course on how to start a knitting business and sell them online",
      img: "https://upload.wikimedia.org/wikipedia/commons/0/02/Oma_strickt_Str%C3%BCmpfe.jpg",
      likes: 10,
      comments: 2,
    },
    {
      id: 1,
      username: "Nikita Bhowal",
      fallback: "NB",
      date: new Date(),
      description:
        "Just completed the course on how to start a knitting business and sell them online",
      img: "https://upload.wikimedia.org/wikipedia/commons/0/02/Oma_strickt_Str%C3%BCmpfe.jpg",
      likes: 10,
      comments: 2,
    },
  ];
  return (
    <div className="flex flex-col mx-auto w-1/2 justify-between items-center">
      <Card className="w-full">
        <CardHeader className="w-full flex flex-row items-center justify-center">
          <Avatar>
            <AvatarFallback>US</AvatarFallback>
          </Avatar>
          <Input
            type="text"
            className="ml-2"
            placeholder="Start writing with AI..."
          />
        </CardHeader>
        <CardFooter className="flex flex-row justify-between">
          <div className="flex flex-row">
            <FaBook />
            <p className="font-semibold text-xs ml-2">Share learnings</p>
          </div>
          <div className="flex flex-row">
            <FaCircleQuestion />
            <p className="font-semibold text-xs ml-2">Ask doubts</p>
          </div>
          <div className="flex flex-row">
            <FaHand />
            <p className="font-semibold text-xs ml-2">Raise issues</p>
          </div>
        </CardFooter>
      </Card>
      {posts.map((post) => (
        <Card key={post.id} className="my-2 w-full">
          <CardHeader className="flex flex-row">
            <Avatar>
              <AvatarFallback>{post.fallback}</AvatarFallback>
            </Avatar>
            <p className="ml-2 text-md text-center font-bold">
              {post.username}
            </p>
          </CardHeader>
          <CardContent className="w-full h-48">
            <p className="text-sm mb-4">{post.description}</p>
            <img className="h-full w-full object-cover" src={post.img} />
          </CardContent>
          <CardFooter className="w-full flex flex-col mt-5 items-start">
            <div className="flex flex-row mb-4">
              <div className="flex flex-row items-center mx-2">
                <FaRegHeart />
                <p className="ml-2">{post.likes}</p>
              </div>
              <div className="flex flex-row items-center">
                <FaRegComment />
                <p className="ml-2">{post.comments}</p>
              </div>
            </div>
            <div className="flex flex-row w-full">
              <Input type="text" placeholder="Add your comment..." />
              <Button>Post</Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export default Feed;
