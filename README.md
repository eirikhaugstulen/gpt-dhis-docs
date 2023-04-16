# DHIS2-GPT-DOCS

DHIS2-GPT-DOCS is an application that provides users with an intuitive conversational interface with knowledge of the DHIS2 documentation. It is built on top of advanced natural language processing techniques that enable users to ask questions and receive relevant information from the DHIS2 documentation without the need for extensive technical knowledge.


## ⚠️ Experimental

This repository is only a side-project of mine to play around with the possibilities of combining DHIS2 with LLM's and ChatGPT.
<br />
It is not built by or related to the DHIS2 core team.

## 🌧️ Limitations

💾 The application has no memory. This means that follow up questions without any context is not going to be answered correctly.
<br />
<br />
📑 Only small parts of the documentation has been vectorized as part of this MVP. Check `./src/documents` to see which data has been imported.

## How it's Built

This application uses the following techniques to provide users with meaningful answers:

1. DHIS2-GPT-DOCS leverages vectorization techniques to break down the DHIS2 documentation into smaller parts that can be easily indexed and searched.
2. The vectorized documentation is stored in a Supabase backend for ease of use.
3. The application uses Top-K Cosine similarity search to match user queries with relevant parts of the DHIS2 documentation.
4. The user query and the related context is then wrapped in a pre-formatted prompt and sent to ChatGPT to answer in a user-centric way.

## Installation

Installing DHIS2-GPT-DOCS is easy. Follow the steps below to get started:

1. Clone this repository to your local machine.
2. Install the required dependencies using `yarn install`
3. Add the required `.env` variables for the app to run. (OpenAI and Supabase)
4. Run the application using `yarn dev`

## Usage

Using DHIS2-GPT-DOCS is simple. Type your question into the chat interface, and the application will retrieve the relevant information from the DHIS2 documentation and provide it to you in a conversational format.

## Contribution
If you would like to contribute, please feel free to submit a pull request.



