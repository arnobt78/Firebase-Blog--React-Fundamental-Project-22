# Create demo Auth user (test@user.com)

This script creates the **Test User** in Firebase Authentication so you can log in with the "Test User" button in the app.

## 1. Get a service account key

1. Open [Firebase Console](https://console.firebase.google.com/) → your project.
2. **Project Settings** (gear) → **Service accounts**.
3. Click **Generate new private key** and download the JSON file.

## 2. Run the script

**Option A – default path (recommended)**  
Save the key as `script/serviceAccountKey.json` in this repo (the file is gitignored), then:

```bash
npm run create-test-user
```

**Option B – env var**

```bash
export GOOGLE_APPLICATION_CREDENTIALS=/path/to/your-key.json
npm run create-test-user
```

**Option C – pass path**

```bash
node script/create-test-user.mjs /path/to/your-key.json
```

## 3. Result

- **New user:** creates `test@user.com` with password `12345678` and display name **Guest User**.
- **Existing user:** updates that user’s password and display name so it matches.

After running once, use the **Test User** button in the app to sign in with `test@user.com` / `12345678`; the header will show **Guest User**.
