#!/usr/bin/env node
/**
 * Creates the demo Firebase Auth user: test@user.com / 12345678 / "Guest User".
 * Run once so the app's "Test User" button can sign in.
 *
 * Prereqs:
 * 1. Firebase Console → Project Settings → Service Accounts → Generate new private key.
 * 2. Save the JSON file (e.g. as script/serviceAccountKey.json) or set GOOGLE_APPLICATION_CREDENTIALS to its path.
 *
 * Run:
 *   npm run create-test-user
 *   # or: node script/create-test-user.mjs [path/to/serviceAccountKey.json]
 */

import { readFileSync, existsSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import admin from "firebase-admin";

const __dirname = dirname(fileURLToPath(import.meta.url));

const TEST_EMAIL = "test@user.com";
const TEST_PASSWORD = "12345678";
const TEST_DISPLAY_NAME = "Guest User";

function getCredentialsPath() {
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    return process.env.GOOGLE_APPLICATION_CREDENTIALS;
  }
  const arg = process.argv[2];
  if (arg) return arg;
  const defaultPath = join(__dirname, "serviceAccountKey.json");
  if (existsSync(defaultPath)) return defaultPath;
  return null;
}

async function main() {
  const credPath = getCredentialsPath();
  if (!credPath || !existsSync(credPath)) {
    console.error(
      "Missing service account key. Either:\n" +
        "  1. Set GOOGLE_APPLICATION_CREDENTIALS to the path of your key JSON, or\n" +
        "  2. Pass the path: node script/create-test-user.mjs ./path/to/key.json, or\n" +
        "  3. Save the key as script/serviceAccountKey.json\n\n" +
        "Get the key: Firebase Console → Project Settings → Service Accounts → Generate new private key."
    );
    process.exit(1);
  }

  const key = JSON.parse(readFileSync(credPath, "utf8"));
  if (!key.project_id) {
    console.error("Invalid service account JSON: missing project_id");
    process.exit(1);
  }

  if (!admin.apps.length) {
    admin.initializeApp({ credential: admin.credential.cert(key) });
  }

  const auth = admin.auth();

  try {
    const existing = await auth.getUserByEmail(TEST_EMAIL);
    await auth.updateUser(existing.uid, {
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
      displayName: TEST_DISPLAY_NAME,
      emailVerified: true,
    });
    console.log(
      "Updated existing user: %s (Guest User) – password set to 12345678",
      TEST_EMAIL
    );
  } catch (err) {
    if (err.code === "auth/user-not-found") {
      await auth.createUser({
        email: TEST_EMAIL,
        password: TEST_PASSWORD,
        displayName: TEST_DISPLAY_NAME,
        emailVerified: true,
      });
      console.log(
        "Created demo user: %s / 12345678 / %s",
        TEST_EMAIL,
        TEST_DISPLAY_NAME
      );
    } else {
      throw err;
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
