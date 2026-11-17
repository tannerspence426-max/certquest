# CertQuest Android wrapper

Minimal WebView app (no third-party dependencies) that bundles the web app from the repo root inside the APK and serves it from `https://appassets.androidplatform.net/www/` so it works fully offline with localStorage persistence.

- minSdk 24, targetSdk/compileSdk 36
- Back button walks back through in-app screens, then exits from Today
- Edge-to-edge insets handled; portrait
- Progress export uses the Android file picker (Storage Access Framework)

Build: `build.sh` uses aapt2, javac, d8, zipalign and apksigner from the Android SDK command-line tools. The signing keystore is not included in this repo.
