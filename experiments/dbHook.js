
/**
 * Sets up a test database and hooks into Jest lifecycle methods.
 */
function setupTestDatabase(initSchemaCallback) {
  let testDbName, pool;

  beforeAll(async () => {
    ({ testDbName, pool } = await createTestDatabase());

    // Initialize schema (caller provides the schema setup function)
    if (typeof initSchemaCallback === "function") {
      await initSchemaCallback(pool);
    }
  });

  afterEach(async () => {
    await truncateTables(pool);
  });

  afterAll(async () => {
    await dropTestDatabase(testDbName);
    await pool.end();
  });

  return () => pool;
}