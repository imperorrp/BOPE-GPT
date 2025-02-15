# Use a lightweight Python image
FROM python:3.11.9-slim

# Set the working directory inside the container
WORKDIR /fastapi_backend

# Install Poetry for dependency management
RUN pip install --no-cache-dir poetry

# Copy dependency files
COPY src/pyproject.toml src/poetry.lock ./

# Install dependencies using Poetry
RUN poetry install --no-root --no-interaction --no-ansi

# Copy your application code
COPY src/* ./

# Expose the port FastAPI runs on
EXPOSE 8000

# Default command to run the FastAPI app with Uvicorn
CMD ["poetry", "run", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
