
import os

from crewai import Agent, Task, Crew
from langchain_ibm import WatsonxLLM
from crewai_tools import  SerperDevTool
from pydantic import BaseModel, Field

from .models import Course, Chapter

# Tools
search_tool = SerperDevTool()
image_search_tool = SerperDevTool(search_url="https://google.serper.dev/images", n_results=1)


parameters = {
    "decoding_method": "greedy",
    "max_new_tokens": 2000
}
# LLMs
llm = WatsonxLLM(
    model_id="ibm/granite-13b-instruct-v2", 
    url=os.environ.get('WATSONX_URL'),
    params=parameters,
    project_id=os.environ.get('WATSONX_PROJECTID'),
    apikey=os.environ.get('WATSONX_APIKEY')
)

function_calling_llm = WatsonxLLM(
    model_id="ibm/granite-3-8b-instruct", 
    url=os.environ.get('WATSONX_URL'),
    params=parameters,
    project_id=os.environ.get('WATSONX_PROJECTID'),
    apikey=os.environ.get('WATSONX_APIKEY')
)

# Models
class CourseImage(BaseModel):
    course_image_url: str = Field(name="course_image_url", description="A cover image URL for the course")

class CourseChapters(BaseModel):
    chapters: list[str] = Field(name="chapters", description="List of chapter titles")

class ChapterContent(BaseModel):
    content: str = Field(name="content", description="Details of the chapter")

class ChapterResource(BaseModel):
    resource_url: str = Field(name="resource_url", description="A resource URL from the internet containing further reads")

# Agents
curiculum_image_researcher = Agent(
    llm=llm,
    function_calling_llm=function_calling_llm,
    role="Education Curiculum Image Researcher",
    goal="Find a relevant cover image for a course curriculum on the topic {topic} for a student from the background {background}",
    backstory="You are a veteran business course image researcher targeted for women with a background in rural areas affected by weather changes",
    allow_delegation=False,
    tools=[image_search_tool],
    verbose=True,
)

curiculum_creator = Agent(
    llm=llm,
    role="Education Curiculum Designer",
    goal="Create a course curriculum on the topic {topic} for a student from the background {background}",
    backstory="You are a veteran business course curiculum creator targeted for women with a background in rural areas affected by weather changes",
    allow_delegation=False,
    verbose=True,
)

course_resource_researcher = Agent(
    llm=llm,
    function_calling_llm=function_calling_llm,
    role="Education Course Resource Researcher",
    goal="Get online resources for a chapter titled {chapter} on the topic {topic} for a student from the background {background}",
    backstory="You are a veteran business course researcher targeted for women with a background in rural areas affected by weather changes",
    allow_delegation=False,
    tools=[search_tool],
    verbose=True,
)

chapter_creator = Agent(
    llm=llm,
    role="Education Chapter Writer",
    goal="Write a 1000 word chapter titled {chapter} for the course curriculum on the topic {topic} for a student from the background {background}",
    backstory="You are a veteran business course author targeted for women with a background in rural areas affected by weather changes",
    allow_delegation=False,
    verbose=True,
)

# Tasks
task0 = Task(
    description="Find 1 online image on the topic {topic} for a student from the background {background}",
    expected_output="Get 1 image url for a course on the topic {topic} for a student from the background {background}",
    output_pydantic=CourseImage,
    agent=curiculum_image_researcher,
)

task1 = Task(
    description="Create a 12 chapter course on the topic {topic} for a student from the background {background}. The chapter name should be under 20 characters and shouldn't contain the words chapter or lesson.",
    expected_output="A list of 12 chapter titles on topic {topic} for a student from the background {background}",
    output_pydantic=CourseChapters,
    agent=curiculum_creator,
)

task2 = Task(
    description="Get 1 online resource for the chapter titled {chapter} for the course on the topic {topic} for a student from the background {background}",
    expected_output="Get 1 online resource for the chapter titled {chapter} for the course on the topic {topic} for a student from the background {background}",
    output_pydantic=ChapterResource,
    agent=course_resource_researcher,
)

task3 = Task(
    description="Write a 1000 word chapter titled {chapter} for the course on the topic {topic} for a student from the background {background}",
    expected_output="A chapter titled {chapter} on topic {topic} for a student from the background {background}. It should look like a professional course chapter with no statements referring to you.",
    output_pydantic=ChapterContent,
    agent=chapter_creator,
)

# Crews
crew0 = Crew(
    agents=[curiculum_image_researcher], 
    tasks=[task0], 
    verbose=True
)
crew1 = Crew(
    agents=[curiculum_creator], 
    tasks=[task1], 
    verbose=True
)
crew2 = Crew(
    agents=[course_resource_researcher], 
    tasks=[task2], 
    verbose=True
)
crew3 = Crew(
    agents=[chapter_creator], 
    tasks=[task3], 
    verbose=True
)

def create_course_via_agents(courseid, topic):
    background = "From drought prone region in India, low income, low education, knows rice farming"
    course_image_crew_output = crew0.kickoff(inputs={"topic": topic, "background": background})
    print("course_image_crew_output", course_image_crew_output)
    course_image_url = course_image_crew_output.pydantic.model_dump()["course_image_url"]
    course = Course.objects.get(courseid=courseid)
    course.image_url = course_image_url
    course.save()
    course_crew_output = crew1.kickoff(inputs={"topic": topic, "background": background})
    chapters = course_crew_output.pydantic.model_dump()["chapters"]
    contents = []
    for idx, chapter in enumerate(chapters):
        if idx == 0 or idx == 1:
            chapter_resource_crew_output = crew2.kickoff(inputs={"topic": topic, "background": background, "chapter": chapter})
            resource_url = chapter_resource_crew_output.pydantic.model_dump()["resource_url"]
            chapter_writer_crew_output = crew3.kickoff(inputs={"topic": topic, "background": background, "chapter": chapter})
            content = chapter_writer_crew_output.pydantic.model_dump()["content"]
            Chapter.objects.create(
                chapter_number=idx,
                title=chapter,
                content=content,
                resource_url=resource_url,
                course=course
            )
            contents.append(content)
        else:
            Chapter.objects.create(
                chapter_number=idx,
                title=chapter,
                content="",
                resource_url=resource_url,
                course=course
            )

    return contents