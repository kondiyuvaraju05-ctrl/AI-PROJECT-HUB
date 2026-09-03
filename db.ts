import pg from "pg";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

const { Pool } = pg;

export interface StoredUser {
  id: string;
  name: string;
  username: string;
  email: string;
  passwordHash: string;
  avatar: string;
  provider: "email" | "google";
  googleId?: string;
  createdAt: string;
  lastLogin?: string;
}

const DB_FILE = path.join(process.cwd(), "data_users.json");

// In-memory fallback map if Postgres is not configured
const memoryUsersDb = new Map<string, StoredUser>();

// Load seed users from data_users.json into memory
try {
  if (fs.existsSync(DB_FILE)) {
    const data = fs.readFileSync(DB_FILE, "utf-8");
    const list: StoredUser[] = JSON.parse(data);
    list.forEach((u) => {
      if (u.email) {
        memoryUsersDb.set(u.email.toLowerCase().trim(), {
          ...u,
          email: u.email.toLowerCase().trim(),
        });
      }
    });
  }
} catch (err) {
  console.warn("Could not load local seed data_users.json:", err);
}

// PostgreSQL Connection Pool
let pool: pg.Pool | null = null;
let isPostgresConnected = false;

const connectionString = 
  process.env.DATABASE_URL || 
  process.env.POSTGRES_URL || 
  process.env.POSTGRESQL_URL || 
  process.env.PG_CONNECTION_STRING;

if (connectionString) {
  try {
    const isLocalhost = connectionString.includes("localhost") || connectionString.includes("127.0.0.1");
    pool = new Pool({
      connectionString,
      ssl: isLocalhost ? false : { rejectUnauthorized: false },
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 10000,
    });

    pool.on("error", (err) => {
      console.error("Unexpected PostgreSQL pool error:", err);
    });
  } catch (err) {
    console.error("Failed to initialize PostgreSQL pool:", err);
  }
} else if (process.env.PGHOST && process.env.PGUSER && process.env.PGDATABASE) {
  try {
    pool = new Pool({
      host: process.env.PGHOST,
      user: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      database: process.env.PGDATABASE,
      port: process.env.PGPORT ? parseInt(process.env.PGPORT, 10) : 5432,
      ssl: process.env.PGSSL === "true" ? { rejectUnauthorized: false } : false,
    });
  } catch (err) {
    console.error("Failed to initialize PostgreSQL pool from PG* env vars:", err);
  }
}

/**
 * Initialize PostgreSQL tables and migrate any existing memory/seed records
 */
export async function initDb(): Promise<boolean> {
  if (!pool) {
    console.log("ℹ️ [DATABASE] Running with in-memory persistent database. To connect PostgreSQL, provide DATABASE_URL in .env");
    return false;
  }

  try {
    const client = await pool.connect();
    try {
      // Create users table if it does not exist
      await client.query(`
        CREATE TABLE IF NOT EXISTS users (
          id VARCHAR(100) PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          username VARCHAR(100) NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL,
          password_hash TEXT NOT NULL,
          avatar TEXT,
          provider VARCHAR(50) DEFAULT 'email',
          google_id VARCHAR(255),
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          last_login TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );

        CREATE INDEX IF NOT EXISTS idx_users_email ON users(LOWER(email));
        CREATE INDEX IF NOT EXISTS idx_users_username ON users(LOWER(username));
      `);

      isPostgresConnected = true;
      console.log("✅ [POSTGRESQL] Connected successfully. Users table verified.");

      // Check if table is empty, and seed with memory users if needed
      const countRes = await client.query("SELECT COUNT(*) FROM users");
      const userCount = parseInt(countRes.rows[0].count, 10);
      
      if (userCount === 0 && memoryUsersDb.size > 0) {
        console.log(`📦 [POSTGRESQL] Migrating ${memoryUsersDb.size} seed users into PostgreSQL...`);
        for (const u of memoryUsersDb.values()) {
          await client.query(`
            INSERT INTO users (id, name, username, email, password_hash, avatar, provider, google_id, created_at, last_login)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            ON CONFLICT (email) DO NOTHING
          `, [
            u.id,
            u.name,
            u.username,
            u.email.toLowerCase().trim(),
            u.passwordHash,
            u.avatar,
            u.provider || "email",
            u.googleId || null,
            u.createdAt || new Date().toISOString(),
            u.lastLogin || new Date().toISOString(),
          ]);
        }
        console.log("✅ [POSTGRESQL] Initial migration completed.");
      }

      return true;
    } finally {
      client.release();
    }
  } catch (err: any) {
    console.error("❌ [POSTGRESQL] Connection error:", err.message || err);
    console.warn("⚠️ Falling back to in-memory database storage.");
    isPostgresConnected = false;
    return false;
  }
}

/**
 * Format a PostgreSQL row into a StoredUser object
 */
function mapRowToUser(row: any): StoredUser {
  return {
    id: row.id,
    name: row.name,
    username: row.username,
    email: row.email.toLowerCase().trim(),
    passwordHash: row.password_hash,
    avatar: row.avatar,
    provider: row.provider as "email" | "google",
    googleId: row.google_id || undefined,
    createdAt: row.created_at ? new Date(row.created_at).toISOString() : new Date().toISOString(),
    lastLogin: row.last_login ? new Date(row.last_login).toISOString() : undefined,
  };
}

/**
 * Find user by email
 */
export async function findUserByEmail(email: string): Promise<StoredUser | null> {
  const cleanEmail = email.toLowerCase().trim();

  if (pool && isPostgresConnected) {
    try {
      const res = await pool.query(
        "SELECT * FROM users WHERE LOWER(email) = LOWER($1) LIMIT 1",
        [cleanEmail]
      );
      if (res.rows.length > 0) {
        return mapRowToUser(res.rows[0]);
      }
      return null;
    } catch (err) {
      console.error("PostgreSQL findUserByEmail error:", err);
    }
  }

  // In-Memory Fallback
  return memoryUsersDb.get(cleanEmail) || null;
}

/**
 * Find user by email OR username
 */
export async function findUserByIdentifier(identifier: string): Promise<StoredUser | null> {
  const clean = identifier.toLowerCase().trim();

  if (pool && isPostgresConnected) {
    try {
      const res = await pool.query(
        "SELECT * FROM users WHERE LOWER(email) = LOWER($1) OR LOWER(username) = LOWER($1) LIMIT 1",
        [clean]
      );
      if (res.rows.length > 0) {
        return mapRowToUser(res.rows[0]);
      }
      return null;
    } catch (err) {
      console.error("PostgreSQL findUserByIdentifier error:", err);
    }
  }

  // In-Memory Fallback
  for (const u of memoryUsersDb.values()) {
    if (u.email === clean || u.username.toLowerCase() === clean) {
      return u;
    }
  }
  return null;
}

/**
 * Find user by ID
 */
export async function findUserById(id: string): Promise<StoredUser | null> {
  if (pool && isPostgresConnected) {
    try {
      const res = await pool.query("SELECT * FROM users WHERE id = $1 LIMIT 1", [id]);
      if (res.rows.length > 0) {
        return mapRowToUser(res.rows[0]);
      }
      return null;
    } catch (err) {
      console.error("PostgreSQL findUserById error:", err);
    }
  }

  // In-Memory Fallback
  for (const u of memoryUsersDb.values()) {
    if (u.id === id) return u;
  }
  return null;
}

/**
 * Create a new user in PostgreSQL (or in-memory)
 */
export async function createUser(newUser: StoredUser): Promise<StoredUser> {
  const cleanEmail = newUser.email.toLowerCase().trim();

  if (pool && isPostgresConnected) {
    try {
      const res = await pool.query(`
        INSERT INTO users (id, name, username, email, password_hash, avatar, provider, google_id, created_at, last_login)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING *
      `, [
        newUser.id,
        newUser.name,
        newUser.username,
        cleanEmail,
        newUser.passwordHash,
        newUser.avatar,
        newUser.provider,
        newUser.googleId || null,
        newUser.createdAt || new Date().toISOString(),
        newUser.lastLogin || new Date().toISOString(),
      ]);

      const created = mapRowToUser(res.rows[0]);
      memoryUsersDb.set(cleanEmail, created);
      return created;
    } catch (err: any) {
      console.error("PostgreSQL createUser error:", err);
      if (err.code === "23505") { // unique constraint violation
        throw new Error("Email already registered");
      }
      throw err;
    }
  }

  // In-Memory Fallback
  memoryUsersDb.set(cleanEmail, newUser);
  return newUser;
}

/**
 * Update user password in PostgreSQL
 */
export async function updateUserPassword(email: string, newPasswordHash: string): Promise<boolean> {
  const cleanEmail = email.toLowerCase().trim();

  if (pool && isPostgresConnected) {
    try {
      const res = await pool.query(
        "UPDATE users SET password_hash = $1 WHERE LOWER(email) = LOWER($2)",
        [newPasswordHash, cleanEmail]
      );
      if (res.rowCount && res.rowCount > 0) {
        const memoryUser = memoryUsersDb.get(cleanEmail);
        if (memoryUser) memoryUser.passwordHash = newPasswordHash;
        return true;
      }
      return false;
    } catch (err) {
      console.error("PostgreSQL updateUserPassword error:", err);
      return false;
    }
  }

  // In-Memory Fallback
  const u = memoryUsersDb.get(cleanEmail);
  if (u) {
    u.passwordHash = newPasswordHash;
    return true;
  }
  return false;
}

/**
 * Update user last login in PostgreSQL
 */
export async function updateLastLogin(id: string): Promise<void> {
  const nowIso = new Date().toISOString();

  if (pool && isPostgresConnected) {
    try {
      await pool.query("UPDATE users SET last_login = NOW() WHERE id = $1", [id]);
    } catch (err) {
      console.error("PostgreSQL updateLastLogin error:", err);
    }
  }

  for (const u of memoryUsersDb.values()) {
    if (u.id === id) {
      u.lastLogin = nowIso;
      break;
    }
  }
}

/**
 * Get database status
 */
export function getDbStatus() {
  return {
    engine: isPostgresConnected ? "PostgreSQL" : "Local Memory/Fallback",
    isPostgresConnected,
    hasConnectionString: !!connectionString,
    totalInMemoryUsers: memoryUsersDb.size,
  };
}
