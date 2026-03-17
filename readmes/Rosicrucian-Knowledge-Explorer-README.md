# <p align="center">🌌</p>
<h1 align="center">Rosicrucian Knowledge Explorer</h1>

<p align="center">
  <a href="https://github.com/noeticactivity/Rosicrucian-Knowledge-Explorer/actions/workflows/ci.yml"><img src="https://img.shields.io/github/actions/workflow/status/noeticactivity/Rosicrucian-Knowledge-Explorer/ci.yml?branch=main&style=for-the-badge" alt="Build Status"></a>
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge" alt="License"></a>
  <a href="#"><img src="https://img.shields.io/badge/Python-3.11-blue?style=for-the-badge&logo=python" alt="Python"></a>
  <a href="#"><img src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js" alt="Next.js"></a>
  <a href="#"><img src="https://img.shields.io/badge/Pinecone-Vector_DB-c59f1a?style=for-the-badge&logo=pinecone" alt="Pinecone"></a>
  <a href="#"><img src="https://img.shields.io/badge/OpenAI-Embeddings-412991?style=for-the-badge&logo=openai" alt="OpenAI"></a>
</p>

## Overview

The Rosicrucian Knowledge Explorer is a sophisticated, RAG-powered semantic search engine designed for deep, contextual exploration of complex philosophical and esoteric texts. This tool transcends traditional keyword-based search by leveraging the power of Retrieval-Augmented Generation (RAG) to understand and retrieve information based on semantic meaning and conceptual relevance. It provides users with a powerful interface to navigate the intricate world of Rosicrucian teachings, complete with source citations to ensure academic and intellectual rigor. The project aims to bridge the gap between ancient wisdom and modern technology, making profound and often inaccessible knowledge available to a wider audience of researchers, students, and enthusiasts.

> This project represents a significant leap forward in the study of esoteric texts, moving beyond simple text matching to a true understanding of the underlying concepts and their interconnections. It is a testament to the power of combining advanced AI with deep domain knowledge to unlock new frontiers of understanding.

## Key Features

*   **Advanced Semantic Search:** Utilizes state-of-the-art OpenAI embedding models to understand the nuance and context of user queries, delivering highly relevant search results. This allows for a more intuitive and human-like interaction with the knowledge base, where the system understands the user's intent rather than just matching keywords.

*   **Retrieval-Augmented Generation (RAG):** Enhances the search experience by generating coherent and contextually-aware answers based on the retrieved information, providing a more natural and intuitive way to explore the knowledge base. This feature allows users to ask complex questions and receive narrative-style answers that synthesize information from multiple sources.

*   **Pinecone Vector Database Integration:** Employs a high-performance Pinecone vector database for efficient storage and retrieval of text embeddings, ensuring fast and scalable search performance. This is crucial for handling the large volume of text data and providing a real-time search experience.

*   **Citation Tracking:** Each piece of information is meticulously tracked back to its original source, allowing for verification and further study. This feature is essential for maintaining academic integrity and providing users with the tools to conduct their own research.

*   **Next.js Frontend:** A modern, responsive, and user-friendly interface built with Next.js provides a seamless and engaging user experience. The frontend is designed to be intuitive and easy to use, even for those who are not familiar with the underlying technology.

## Architecture and How It Works

The Rosicrucian Knowledge Explorer is built upon a robust and scalable architecture that combines the power of several cutting-edge technologies. The process begins with the ingestion of Rosicrucian texts, which are then chunked and converted into vector embeddings using OpenAI's powerful language models. These embeddings are stored in a Pinecone vector database, which is optimized for high-speed similarity searches.

When a user enters a query, the same OpenAI model converts the query into a vector embedding. This query vector is then used to perform a similarity search against the vectors stored in the Pinecone database. The most relevant text chunks are retrieved and passed to a large language model, which generates a comprehensive and contextually accurate answer. The Next.js frontend then presents this information to the user in a clear and intuitive interface, complete with citations. The entire process is designed to be fast, efficient, and highly scalable, allowing for the exploration of vast amounts of text data.

## Tech Stack

| Category          | Technology                                                                                             | Description                                                                                                                                 |
| ----------------- | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **Backend**       | Python, FastAPI                                                                                        | The core of the application, handling the logic for semantic search, RAG, and interaction with the vector database.                         |
| **Frontend**      | Next.js, React, Tailwind CSS                                                                           | A modern, responsive, and user-friendly interface for interacting with the search engine.                                                 |
| **AI/ML**         | OpenAI (Embeddings, LLMs), RAG                                                                         | The heart of the semantic search and answer generation capabilities.                                                                        |
| **Database**      | Pinecone (Vector DB)                                                                                   | A high-performance vector database used for storing and retrieving text embeddings.                                                         |
| **Deployment**    | Vercel                                                                                                 | The platform used for deploying the Next.js frontend, providing a seamless and scalable hosting solution.                                   |

## Getting Started

To get started with the Rosicrucian Knowledge Explorer, you will need to have Python 3.11 and Node.js installed on your system. You will also need to have access to the OpenAI API and a Pinecone account.

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/noeticactivity/Rosicrucian-Knowledge-Explorer.git
    cd Rosicrucian-Knowledge-Explorer
    ```

2.  **Install the dependencies:**

    ```bash
    pip install -r requirements.txt
    cd frontend && npm install
    ```

3.  **Set up your environment variables:**

    Create a `.env` file in the root directory and add your OpenAI and Pinecone API keys:

    ```
    OPENAI_API_KEY=your_openai_api_key
    PINECONE_API_KEY=your_pinecone_api_key
    PINECONE_ENVIRONMENT=your_pinecone_environment
    ```

4.  **Run the application:**

    ```bash
    uvicorn main:app --reload
    cd frontend && npm run dev
    ```

## Demo/Screenshots

*A live demo of the application is available at: [rosicrucian-knowledge-explorer.vercel.app](https://rosicrucian-knowledge-explorer.vercel.app)*

(Placeholder for screenshots of the application in action)

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue to discuss any changes. We are always looking for ways to improve the project and make it more accessible to a wider audience. We welcome contributions of all kinds, from bug fixes to new features.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

<p align="center">Built by <a href="https://guriboycodes.com">@GuriboyCodes</a></p>
<p align="center"><a href="https://github.com/Ripnrip">GitHub</a> | <a href="https://guriboycodes.com">Portfolio</a></p>


## The Philosophical Context: Rosicrucianism

Rosicrucianism is a philosophical and esoteric tradition that first emerged in Europe in the early 17th century. It is characterized by its focus on mystical truths of the ancient past, which are said to be concealed from the average person, and provides a path to universal enlightenment. The texts are often allegorical and symbolic, making them difficult to penetrate with traditional search methods. This is why a semantic search engine is so valuable for this domain, as it can help to uncover the deeper meanings and connections within the texts.

### Why Semantic Search for Esoteric Texts?

Traditional keyword search engines are often inadequate for exploring complex philosophical and esoteric texts. They can struggle with:

*   **Synonymy:** The same concept may be expressed using different words.
*   **Polysemy:** The same word may have different meanings depending on the context.
*   **Complex Queries:** Users may want to ask complex questions that cannot be answered with a simple keyword search.

Semantic search, on the other hand, is able to overcome these challenges by understanding the meaning of the text. This allows for a much richer and more rewarding exploration of the material.

## A Deeper Dive into the Architecture

The architecture of the Rosicrucian Knowledge Explorer is designed to be both powerful and flexible. Here is a more detailed breakdown of the data flow:

1.  **Data Ingestion and Preprocessing:** The process begins with the ingestion of Rosicrucian texts. These texts are then preprocessed to remove any irrelevant information, such as headers, footers, and page numbers. The preprocessed text is then chunked into smaller, more manageable pieces.

2.  **Embedding Generation:** Each chunk of text is then converted into a vector embedding using OpenAI's `text-embedding-ada-002` model. This model has been trained on a massive dataset of text and code, and is able to capture the semantic meaning of the text in a high-dimensional vector space.

3.  **Vector Storage:** The generated embeddings are then stored in a Pinecone vector database. Pinecone is a fully managed vector database that is optimized for high-speed similarity searches. It allows for the efficient storage and retrieval of billions of embeddings.

4.  **Query Processing:** When a user enters a query, the same OpenAI model is used to convert the query into a vector embedding. This query vector is then used to perform a similarity search against the vectors stored in the Pinecone database. The most relevant text chunks are retrieved and passed to the next stage.

5.  **Answer Generation:** The retrieved text chunks are then passed to a large language model, such as GPT-4, along with the original query. The language model then generates a comprehensive and contextually accurate answer, based on the retrieved information. The answer is then streamed back to the user in real-time.

## Future Development

This project is under active development, with several exciting features planned for the future:

*   **Knowledge Graph Integration:** We plan to integrate a knowledge graph to represent the relationships between different concepts and entities in the texts. This will allow for even more powerful and intuitive exploration of the material.
*   **Multi-language Support:** We plan to add support for multiple languages, allowing users to explore the texts in their native language.
*   **Personalized Recommendations:** We plan to add a recommendation engine that will suggest new texts and topics to explore, based on the user's search history.

We are always open to new ideas and suggestions, so please feel free to open an issue to discuss any new features you would like to see.
