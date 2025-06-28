import { describe, test, expect } from '@playwright/test';

describe('API Routes Tests', () => {
  test('should respond from /api/test endpoint', async ({ request }) => {
    const response = await request.get('/api/test');
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toBe(
      'application/json;charset=utf-8'
    );
    const json = await response.json();
    expect(json).toEqual({ message: 'Hello, world!' });
  });

  test('should respond from /api/[name] endpoint with query parameter', async ({
    request,
  }) => {
    const response = await request.get('/api/john?foo=bar');
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toBe('text/plain');
    const text = await response.text();
    expect(text).toBe('Hello, john! bar');
  });

  test('should handle special characters in name parameter', async ({
    request,
  }) => {
    const response = await request.get('/api/test-user?foo=test%20value');
    expect(response.status()).toBe(200);
    const text = await response.text();
    expect(text).toBe('Hello, test-user! test value');
  });

  test('should handle empty foo parameter', async ({ request }) => {
    const response = await request.get('/api/alice?foo=');
    expect(response.status()).toBe(200);
    const text = await response.text();
    expect(text).toBe('Hello, alice!');
  });

  test('should handle no query parameters', async ({ request }) => {
    const response = await request.get('/api/bob');
    expect(response.status()).toBe(200);
    const text = await response.text();
    expect(text).toBe('Hello, bob!');
  });

  describe('POST-only endpoint tests', () => {
    test('should respond to POST request with JSON body', async ({
      request,
    }) => {
      const response = await request.post('/api/post-only', {
        data: { name: 'John', message: 'Hello from test' },
      });
      expect(response.status()).toBe(200);
      expect(response.headers()['content-type']).toBe(
        'application/json;charset=utf-8'
      );
      const json = await response.json();
      expect(json).toHaveProperty('received');
      expect(json.received.name).toBe('John');
      expect(json.received.message).toBe('Hello from test');
    });

    test('should respond to POST request with complex JSON body', async ({
      request,
    }) => {
      const response = await request.post('/api/post-only', {
        data: {
          user: { id: 123, email: 'test@example.com' },
          items: ['item1', 'item2'],
        },
      });
      expect(response.status()).toBe(200);
      const json = await response.json();
      expect(json).toHaveProperty('received');
      expect(json.received.user.id).toBe(123);
      expect(json.received.user.email).toBe('test@example.com');
      expect(json.received.items).toEqual(['item1', 'item2']);
    });

    test('should respond to POST request with empty body', async ({
      request,
    }) => {
      const response = await request.post('/api/post-only');
      expect(response.status()).toBe(200);
      const json = await response.json();
      expect(json).toHaveProperty('received');
      expect(json.received).toBeNull();
    });

    test('should return 405 for GET request', async ({ request }) => {
      const response = await request.get('/api/post-only');
      expect(response.status()).toBe(405);
      expect(response.headers()['allow']).toBe('POST');
    });

    test('should return 405 for PUT request', async ({ request }) => {
      const response = await request.put('/api/post-only', {
        data: { test: 'data' },
      });
      expect(response.status()).toBe(405);
      expect(response.headers()['allow']).toBe('POST');
    });

    test('should return 405 for DELETE request', async ({ request }) => {
      const response = await request.delete('/api/post-only');
      expect(response.status()).toBe(405);
      expect(response.headers()['allow']).toBe('POST');
    });

    test('should return 405 for PATCH request', async ({ request }) => {
      const response = await request.patch('/api/post-only', {
        data: { test: 'data' },
      });
      expect(response.status()).toBe(405);
      expect(response.headers()['allow']).toBe('POST');
    });
  });
});
