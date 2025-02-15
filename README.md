# BOPE-GPT

BOPE-GPT is a full stack web app dashboard to conduct the BOPE process (Bayesian Optimization with Preference Exploration) on custom datasets via the use of an LLM as the pairwise comparison function. Built with Next.js, FastAPI, MongoDB, Pytorch ML library functions, Plotly, and Cohere's LLM API. 

Check it out at: [https://bope-gpt.vercel.app/](https://bope-gpt.vercel.app/)

Originating from work at the [AC-BO hackathon 2024](https://github.com/AC-BO-Hackathon/BOPE-GPT).

## Contents
- [Premise](#premise)
- [Frontend](#frontend)
- [Backend](#backend)
- [Screenshots](#screenshots)
- [Interactive GP Visualization and Pareto Plots](#interactive-gp-visualization-and-pareto-plots)
- [Deployment](#deployment)
    - [Frontend](#frontend-1)
    - [Backend](#backend-1)
- [FAQs](#faqs)
    - [What is the BOPE process?](#what-is-the-bope-process)
    - [Who's this web app for?](#whos-this-web-app-for)
    - [How does BOPE-GPT work?](#how-does-bope-gpt-work)
    - [How can I try this out?](#how-can-i-try-this-out-example-bope-gpt-initialization-panel-values)


## Premise

BOPE (Bayesian Optimization with Preference Exploration) is an machine learning based optimization technique to find optimal input parameters for 'expensive' (hard to evaluate or gather data), multi-objective functions/experiments/tasks. It was introduced by Meta and Cornell researchers [in 2022](https://arxiv.org/abs/2203.11382).

This app, BOPE-GPT, is based on an extended implementation of the BOPE process via an LLM as a proxy for a human preference selector. 

The app facilitates performing the BOPE process with a UI interface, rich visualizations, and stringing together and orchestrating all the steps involved so custom scripts and Jupyter Notebooks don't have to be spun up and edited to use the process for a particular purpose. 

Upload the Fischer-Tropsch dataset (see more on the site) and set the suggested input parameters in the "About BOPE-GPT" tab on the site to try it out!

Read more about using this with the Fischer Tropsch dataset on the [AC-BO hackathon 2024 README and repository](https://github.com/AC-BO-Hackathon/BOPE-GPT).

## Frontend 

The Next.js framework was used for the frontend of this app, with an instance deployed on Vercel.  

To run locally, clone the `frontend/` code and make sure you have Node.js installed for a Typescript runtime to build the frontend locally. Then install the dependencies listed in `package.json` with `npm install` and run with `npm run dev` or `npm run build` to build and deploy the frontend to a local port. 

## Backend

The current backend computing and serving requests made from the BOPE-GPT app frontend is a FastAPI app deployed on a personal local VPS at `bopegpt.ratishpanda.me`. Requests are routed through an Nginx proxy via a local Unix socket and passed to a running Gunicorn server with 2 Uvicorn workers. This isn't a powerful VPS, so compute and processing may be slow! As an alterative, for faster processing on more powerful local machines, you can clone this repo locally and build the frontend and backend locally and run it on your data that way. You will have to procure a personal MongoDB Atlas URI key and Cohere API Key for local use. 

For more info on the structure of the backend app and running locally, navigate to `backend/fastapi_backend/readme.md` in this repository where this is detailed further!

## Screenshots 

![alt text](image.png)

![alt text](image-1.png)

![alt text](image-2.png)

![alt text](image-3.png)

NOTE: Loading can take upto a few minutes, lots of compute required + the VPS used for the free live backend is a personal one and not so powerful! Keep the tab open while waiting for a response. Run locally for faster loading times if you have a powerful system.  

![alt text](image-4.png)

![alt text](image-5.png)

![alt text](image-6.png)

![alt text](image-7.png)

![alt text](image-8.png)

## Interactive GP Visualization and Pareto Plots

![alt text](screen-capture.gif)

## Deployment

### Frontend

#### Local Setup 

- Git clone or download files 
- `npm install` required modules 
- `npm run dev` to build and run on localhost:3000
- `npm run build` to build for production

#### Deployment to Vercel

1. Push your code to a GitHub repository
2. Visit [Vercel](https://vercel.com)
3. Connect your GitHub account
4. Import your repository
5. Configure your project:
   - Framework Preset: Next.js
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `.next`
6. Deploy 
7. New pushed commits to your repository should automatically trigger Vercel deployments

### Backend

- Rename `.mockenv` to `.env` and enter a MongoDB Atlas URI and Cohere API Key
- Install dependencies with `poetry install` or `pip install -r requirements.txt`.
- Start the FastAPI server with `fastapi dev main.py`  (Development mode) 
- Or start a production grade Uvicorn server with `python main.py` or `fastapi main.py`. For better performance with multiple users, Nginx + a Supervisor script starting a Gunicorn process with Uvicorn workers approach is taken in the live deployed instance of the BOPE-GPT backend though and this can be done locally as well. 

## FAQs


### What is the BOPE process?

BOPE, or Bayesian Optimization via Preference Exploration, is [a machine learning technique](https://botorch.org/docs/tutorials/bope/) for finding potential optimums of an experiment/system (or in more abstract terms, any complex or unknown function that maps some inputs to some outputs) using pairwise comparisons of data points sampled from the distribution of potential inputs to guide this optimization process.

Typically, bayesian optimization of a function requires numerically defining what optimum output should be strived towards finding. However, in multi-objective problems, it is often the case that specific priorities - the optimization goals - cannot be defined well numerically.

Using pairwise comparisons between outputs is useful for such situations. In these scenarios, a human (or human-like) evaluator/decision-maker can express a "preference" between two outputs and this preference can be used to guide the optimization process instead.

This "preference" can also be picked through an LLM (the human-like evaluator) if correctly prompted - which is what BOPE-GPT does.

After each iteration, the list of explored data points expands - Pareto plot and preference visualizations of the pairwiseGP model representing these can then be used to locate optimal points in the distribution by a user.


### Who's this web app for?

This is for people who want to optimize a multi-objective system they're trying to model and already have a distribution of input-output data in a dataset, but don't have a good way to define the optimization goals numerically - although they can in natural language.

In the future, support will be added for using this with live experiments, requiring new data points to be entered once prompted after the model makes a pair of suggestions in the course of each iteration.

The BOPE-GPT process is a useful interface for this kind of optimization, with built-in visualizations to help see the latent utility defined in natural language and select potential optimums.

With an LLM and the interpolation abilities of a sufficiently trained neural network, this app also automates some of the time consuming requirements of the BOPE process -along with potential human biases a human preference selector may unconsciously introduce- especially for repetitive but similar runs. Anything such task where the objectives can be defined in natural language (to be prompted to the LLM) is also useful to perform with BOPE-GPT.

Potential use cases include:

- Chemical processes with tradeoffs in outputs (e.g., Fischer-Tropsch synthesis process)
- A/B tests (as mentioned in the BOPE paper)
- Simulation-based design (as mentioned in the BOPE paper)
- Tuning hyperparameters of other ML models
- Optimization tasks where objectives cannot be defined easily numerically but can be explained in natural language
- Any multi-objective task where pairwise preferences are a good way of making comparisons between outputs


### How does BOPE-GPT work?

1. BOPE-GPT first awaits an upload of an initial CSV dataset - tabular, with columns representing features and rows representing individual data points
2. To initialize the BOPE Process, the Initialization Panel must be filled out:
    - An LLM prompt
    - Number of dataset columns to use as inputs (outputs defined by elimination)
    - Number of initial data points to sample from the dataset distribution
    - Number of initial pairwise comparisons to make
3. A neural network is created to internally represent the distribution of the uploaded dataset, mapping inputs to outputs
4. The BOPE process begins, iteratively sampling new data points from the distribution and comparing them using a PairwiseGP model
5. An LLM is used to automate the pairwise comparisons between data points
6. Visualizations of the current state of the BOPE process are updated as it runs:
    - PairwiseGP model
    - Pareto Fronts of explored data points
7. Overviews, visualizations, data, and comparisons can be viewed via dashboard tabs after each iteration
8. Each iteration improves the PairwiseGP model and increases the likelihood of finding more optimal data points
9. To identify desired optimization solutions, the visualizations and current model data tabs can be examined after a sufficient number of model iterations have been run


### How can I try this out? (Example BOPE-GPT Initialization Panel Values)

*Sample dataset:*
Download [this Fischer-Tropsch dataset](https://github.com/AC-BO-Hackathon/BOPE-GPT/blob/main/data/fischer_data_processed.csv) and upload it onto this app to enable the initialization panel

*LLM Prompt:*
"Suppose you're managing a Fischer-Tropsch synthesis process. The four outputs are equally important, and we want to maximize all of them"

*Number of Input Features:*
4 (the first four columns of the uploaded dataset)

*Number of Initial Data Points:*
4 (4 random data points to be sampled from the dataset distribution)

*Number of Initial Comparisons:*
6 (6 pairwise comparisons to be made between the initial data points)
