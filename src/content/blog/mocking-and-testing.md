---
categories:
- CI-CD
- Unit Test
createdAt: '2025-11-04'
description: '```python'
tags:
- CI-CD
- Unit Test
title: Mocking and Testing
---

# Mocking and Testing

## Pytest Testing Functions & Mocking Guide

### Core Testing Functions

### `client.get()` / `client.post()`
```python
response = client.get('/healthcheck')
response = client.post('/generate-upload-url')
```

**Purpose:** Simulate HTTP requests to your application without running a real server.

**When to use:**
- Testing API endpoints
- Verifying routes work correctly
- Checking request/response handling

**Common methods:**
- `client.get(url)` - GET requests
- `client.post(url, json=data)` - POST requests
- `client.put(url)` - PUT requests
- `client.delete(url)` - DELETE requests

---

## Mocking Functions

### `@patch()`
```python
@patch('app.storage.Client')
def test_example(mock_client, client):
 # mock_client replaces the real storage.Client
 pass
```

**Purpose:** Replace real objects/functions with mock versions during tests.

**Why use it:**
- ✅ Avoid calling external services (APIs, databases, cloud storage)
- ✅ Control behavior of dependencies
- ✅ Tests run faster (no network calls)
- ✅ Tests are deterministic (no external failures)
- ✅ No cost/quota usage on external services

**Key concepts:**
- Replaces the import path with a mock
- Mock object is injected as a test parameter
- Original object is restored after the test

**Common patterns:**
```python
@patch('module.ClassName') # Mock a class
@patch('module.function_name') # Mock a function
@patch('module.os.getenv') # Mock environment variables
@patch.dict(os.environ, {...}) # Mock environment dict
```

---

### `MagicMock()`
```python
mock_bucket = MagicMock()
mock_blob = MagicMock()
```

**Purpose:** Create a fake object that can pretend to be anything and track how it's used.

**What makes it "magic":**
- Automatically creates attributes when accessed
- Automatically creates methods when called
- Records all interactions (calls, arguments)
- Can be configured to return specific values

**Example behavior:**
```python
mock = MagicMock()

# These all work automatically without setup:
mock.any_method() # Returns another MagicMock
mock.any_attribute # Returns another MagicMock
mock.chain.of.attributes.method() # All return MagicMock

# You can configure return values:
mock.method.return_value = "result"
mock.method() # Returns "result"

# You can check if it was called:
mock.method.assert_called_once()
mock.method.assert_called_with(arg1, arg2)
```

**Common use cases:**

1. **Mocking complex objects:**
```python
mock_bucket = MagicMock()
mock_blob = MagicMock()
mock_blob.generate_signed_url.return_value = "https://signed-url"
mock_bucket.blob.return_value = mock_blob
```

2. **Mocking class instances:**
```python
@patch('app.storage.Client')
def test_example(mock_client_class):
 # mock_client_class() returns a MagicMock instance
 mock_instance = mock_client_class.return_value
 mock_instance.bucket.return_value = MagicMock()
```

3. **Verifying method calls:**
```python
mock_logger = MagicMock()
logger.info("test")
mock_logger.info.assert_called_once()
mock_logger.info.assert_called_with("test")
```

---

### `return_value` vs `side_effect`

**`return_value`** - Set what a mocked method returns:
```python
mock_blob.generate_signed_url.return_value = "https://url"
# Every call returns the same value
```

**`side_effect`** - More advanced control:
```python
# Return different values on successive calls
mock.method.side_effect = [1, 2, 3]

# Raise an exception
mock.method.side_effect = ValueError("error")

# Use a custom function
def custom_behavior(*args):
 return args[0] * 2
mock.method.side_effect = custom_behavior
```

---

## Assertion Methods on Mocks

### Checking if mocks were called:
```python
mock.method.assert_called() # Called at least once
mock.method.assert_called_once() # Called exactly once
mock.method.assert_not_called() # Never called

# Check arguments
mock.method.assert_called_with(arg1, arg2)
mock.method.assert_called_once_with(arg1, arg2)

# Check any call in history
mock.method.assert_any_call(arg1, arg2)

# Get call count
assert mock.method.call_count == 3
```

### Accessing call data:
```python
# Get arguments from the last call
called_args = mock_logger.info.call_args[0] # Positional args
called_kwargs = mock_logger.info.call_args[1] # Keyword args

# Get all calls
for call in mock.method.call_args_list:
 print(call)
```

---

## Response Assertion Methods

### `assert` statements:
```python
assert response.status_code == 200
assert response.json == {"status": "OK"}
assert "upload_url" in response.json
```

**Purpose:** Verify the actual behavior matches expected behavior.

**Common assertions:**
```python
# Status codes
assert response.status_code == 200
assert response.status_code == 404

# JSON responses
assert response.json == {"key": "value"}
assert "key" in response.json
assert response.json["key"] == "value"

# Response data (bytes)
assert b'text' in response.data

# Headers
assert response.headers['Content-Type'] == 'application/json'
```

---

## Complete Example Breakdown

```python
@patch('app.storage.Client')
def test_generate_upload_url_success(mock_client, client, mock_env):
 # 1. Create mock objects
 mock_bucket = MagicMock()
 mock_blob = MagicMock()
 
 # 2. Configure mock behavior
 mock_blob.generate_signed_url.return_value = "https://signed-url"
 mock_bucket.blob.return_value = mock_blob
 mock_client.return_value.bucket.return_value = mock_bucket
 
 # 3. Make request (triggers mocked code path)
 response = client.post('/generate-upload-url')
 
 # 4. Verify results
 assert response.status_code == 200
 assert "upload_url" in response.json
```

**What happens:**
1. `@patch` replaces real `storage.Client` with `mock_client`
2. When app code calls `storage.Client()`, it gets a MagicMock
3. When app calls `.bucket()`, it gets `mock_bucket`
4. When app calls `.blob()`, it gets `mock_blob`
5. When app calls `.generate_signed_url()`, it returns `"https://signed-url"`
6. No real Google Cloud calls are made

---

## When to Use Each Tool

| Tool | Use Case |
|------|----------|
| `@patch()` | Replace imports with mocks |
| `MagicMock()` | Create flexible fake objects |
| `return_value` | Control what mocks return |
| `side_effect` | Simulate errors or complex behavior |
| `assert_called_*()` | Verify mock was used correctly |
| `client.get/post()` | Test HTTP endpoints |
| `assert` | Verify test outcomes |

---

## Best Practices

✅ **Do:**
- Mock external dependencies (APIs, databases, file systems)
- Use descriptive mock names (`mock_bucket`, not `m1`)
- Verify both success and failure cases
- Check that mocks were called with correct arguments

❌ **Don't:**
- Mock everything (test real code when possible)
- Over-configure mocks (only set what's needed)
- Forget to assert mock calls (verify behavior, not just results)
- Mock the code you're testing (only mock dependencies)

---

## Common Pitching: Nested Mocks

When mocking chains of calls:
```python
# App code does:
client = storage.Client()
bucket = client.bucket('my-bucket')
blob = bucket.blob('file.txt')
url = blob.generate_signed_url()

# Test needs:
mock_client = MagicMock()
mock_client.return_value.bucket.return_value.blob.return_value.generate_signed_url.return_value = "url"

# Or more readable:
mock_instance = mock_client.return_value
mock_bucket = mock_instance.bucket.return_value
mock_blob = mock_bucket.blob.return_value
mock_blob.generate_signed_url.return_value = "url"
```

---

## Testing Without External Services

**Why mock?**

Without mocking:
```python
# ❌ Calls real Google Cloud Storage
def test_upload():
 client = storage.Client() # Real API call
 bucket = client.bucket('my-bucket') # Real API call
 # Costs money, needs credentials, can fail if service is down
```

With mocking:
```python
# ✅ No real API calls
@patch('app.storage.Client')
def test_upload(mock_client):
 # Runs instantly, free, always works, no credentials needed
 response = client.post('/upload')
 assert response.status_code == 200
```
```

This guide covers the essential mocking and testing concepts you need to understand pytest tests with external dependencies.