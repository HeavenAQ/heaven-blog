---
categories:
- CI-CD
- Unit Test
createdAt: '2025-11-04'
description: '**Fixtures** are reusable setup functions that provide data, objects,
 or state to your tests. They help you avoid code duplication and ensure consiste...'
tags:
- CI-CD
- Unit Test
title: Pytest 101
---

# Pytest 101

## Pytest Testing Guide

### What are Fixtures?

**Fixtures** are reusable setup functions that provide data, objects, or state to your tests. They help you avoid code duplication and ensure consistent test environments.

Think of fixtures as "ingredients" that pytest prepares before running your tests.

## The Three Fixtures Explained

### 1. `@pytest.fixture` - `app()`

```python
@pytest.fixture
def app():
 app = create_app()
 app.config['TESTING'] = True
 return app
```

**What it does:**

- Creates a Flask application instance
- Sets `TESTING = True` (enables better error messages, disables error catching)
- Returns the app so tests can use it

**Usage:** Any test that needs access to the Flask app can request this fixture.

---

### 2. `@pytest.fixture` - `client(app)`

```python
@pytest.fixture
def client(app):
 return app.test_client()
```

**What it does:**

- Takes the `app` fixture as input (dependency injection)
- Creates a test client that can make HTTP requests to your Flask app
- Returns the client for making test requests (GET, POST, etc.)

**Usage:** Tests use this to simulate HTTP requests without running a real server.

---

### 3. `@pytest.fixture` - `mock_env()`

```python
@pytest.fixture
def mock_env():
 with patch.dict(os.environ, {"GCP_BUCKET": "test-bucket"}):
 yield
```

**What it does:**

- Temporarily mocks environment variables
- Sets `GCP_BUCKET` to "test-bucket" for the duration of the test
- Uses `yield` instead of `return` (setup → yield → teardown pattern)
- After test completes, original environment is restored

**Usage:** Tests that need specific environment variables without modifying the actual system.

---

## General Pytest Workflow

### 1. **Test Discovery**

```bash
pytest # Runs all tests
pytest test_app.py # Runs specific file
pytest -k "test_login" # Runs tests matching pattern
```

Pytest automatically finds:

- Files named `test_*.py` or `*_test.py`
- Functions named `test_*`
- Classes named `Test*`

---

### 2. **Test Structure**

```python
def test_example(fixture_name):
 # Arrange - setup test data
 data = {"key": "value"}

 # Act - perform the action
 result = function_to_test(data)

 # Assert - verify the result
 assert result == expected_value
```

---

### 3. **Using Fixtures in Tests**

**Simple usage:**

```python
def test_homepage(client):
 response = client.get('/')
 assert response.status_code == 200
```

**Multiple fixtures:**

```python
def test_with_env(client, mock_env):
 response = client.get('/bucket-info')
 assert response.status_code == 200
```

---

### 4. **Fixture Scopes**

Fixtures can have different lifetimes:

```python
@pytest.fixture(scope="function") # Default - runs for each test
def per_test_fixture():
 pass

@pytest.fixture(scope="module") # Runs once per test file
def per_module_fixture():
 pass

@pytest.fixture(scope="session") # Runs once for entire test session
def per_session_fixture():
 pass
```

---

### 5. **Setup and Teardown Pattern**

```python
@pytest.fixture
def database_connection():
 # Setup - runs before test
 db = connect_to_database()

 yield db # Provide to test

 # Teardown - runs after test
 db.close()
```

---

### 6. **Running Tests**

```bash
# Basic run
pytest

# Verbose output
pytest -v

# Show print statements
pytest -s

# Stop on first failure
pytest -x

# Run specific test
pytest test_app.py::test_homepage

# Generate coverage report
pytest --cov=app --cov-report=html
```

---

## Common Pytest Assertions

```python
assert value == expected # Equality
assert value!= expected # Inequality
assert value is True # Identity
assert value in collection # Membership
assert "text" in string # Substring

# Exceptions
with pytest.raises(ValueError):
 function_that_raises()

# Approximate equality (floats)
assert value == pytest.approx(3.14, rel=0.01)
```

---

## Example Test Using All Three Fixtures

```python
def test_bucket_endpoint(client, app, mock_env):
 """
 client - makes HTTP requests
 app - access to Flask app config
 mock_env - mocked GCP_BUCKET environment variable
 """
 # Check the environment is mocked
 assert os.environ['GCP_BUCKET'] == 'test-bucket'

 # Check app is in testing mode
 assert app.config['TESTING'] is True

 # Make a request using the test client
 response = client.get('/api/bucket')

 # Assert the response
 assert response.status_code == 200
 assert b'test-bucket' in response.data
```

---

## Key Benefits of Fixtures

✅ **Reusability** - Write setup code once, use in many tests 
✅ **Dependency Injection** - Fixtures can depend on other fixtures 
✅ **Automatic Cleanup** - Teardown happens automatically 
✅ **Modularity** - Keep tests clean and focused 
✅ **Scope Control** - Control how often fixtures run
