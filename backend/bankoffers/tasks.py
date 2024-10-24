import os
from celery import shared_task

from langchain.docstore.document import Document
from langchain_community.vectorstores import Chroma
from langchain.text_splitter import CharacterTextSplitter
from langchain_community.document_loaders import OnlinePDFLoader

from langchain_ibm import WatsonxEmbeddings
from ibm_watsonx_ai.foundation_models.utils.enums import EmbeddingTypes
from ibm_watsonx_ai.foundation_models.utils import get_embedding_model_specs

@shared_task
def parse_bank_offer_details(boid, details_url):
    loader = OnlinePDFLoader(details_url)
    documents = loader.load()
    new_documents = []
    for document in documents:
        new_documents.append(Document(page_content=document.page_content, metadata={"boid": boid}))

    text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    texts = text_splitter.split_documents(documents)
    for text in texts:
        text.metadata = {
            "source": text.metadata["source"],
            "boid": boid
        }
        
    get_embedding_model_specs(os.environ.get('WATSONX_URL'))
    embeddings = WatsonxEmbeddings(
        model_id=EmbeddingTypes.IBM_SLATE_30M_ENG.value,
        url=os.environ.get('WATSONX_URL'),
        apikey=os.environ.get('WATSONX_APIKEY'),
        project_id=os.environ.get('WATSONX_PROJECTID')
    )
    vector_store = Chroma(embedding_function=embeddings, persist_directory='bankoffers_db', collection_name="bank_offer_documents")
    vector_store.add_documents(documents=texts)


# parse_bank_offer_details("1", "https://daynrlmbl.aajeevika.gov.in/Circulars/SBI%20Svayam%20Siddha%20Initiative.pdf")