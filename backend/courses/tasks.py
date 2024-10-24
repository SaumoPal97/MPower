import os
from celery import shared_task

from langchain.docstore.document import Document
from langchain_community.vectorstores import Chroma
from langchain.text_splitter import CharacterTextSplitter

from langchain_ibm import WatsonxEmbeddings
from ibm_watsonx_ai.foundation_models.utils.enums import EmbeddingTypes
from ibm_watsonx_ai.foundation_models.utils import get_embedding_model_specs

from .crew import create_course_via_agents


@shared_task
def create_and_vectorize_course(courseid, topic):
    contents = create_course_via_agents(courseid, topic)
    new_documents = []
    for content in contents:
        new_documents.append(Document(page_content=content, metadata={"courseid": courseid}))
    text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    texts = text_splitter.split_documents(new_documents)

    get_embedding_model_specs(os.environ.get('WATSONX_URL'))
    embeddings = WatsonxEmbeddings(
        model_id=EmbeddingTypes.IBM_SLATE_30M_ENG.value,
        url=os.environ.get('WATSONX_URL'),
        apikey=os.environ.get('WATSONX_APIKEY'),
        project_id=os.environ.get('WATSONX_PROJECTID')
    )

    vector_store = Chroma(embedding_function=embeddings, persist_directory='courses_db', collection_name="course_content")
    vector_store.add_documents(documents=texts)