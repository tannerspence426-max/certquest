#!/bin/bash
set -euo pipefail
export JAVA_HOME=/workspace/android-toolchain/jdk-17.0.21+9
export PATH=$JAVA_HOME/bin:$PATH
SDK=/workspace/android-toolchain/android-sdk
BT=$SDK/build-tools/36.0.0
JAR=$SDK/platforms/android-36/android.jar
VC=${VERSION_CODE:-1}; VN=${VERSION_NAME:-1.0.0}
cd /workspace/certquest-android
rm -rf build && mkdir -p build/{flat,gen,classes,dex,assets/www}
# bundle web assets
( cd /workspace/comptia-study-app && cp -r index.html manifest.webmanifest css js icons /workspace/certquest-android/build/assets/www/ )
$BT/aapt2 compile --dir res -o build/flat/res.zip
$BT/aapt2 link -o build/base.apk -I $JAR --manifest AndroidManifest.xml -R build/flat/res.zip \
  -A build/assets --java build/gen --min-sdk-version 24 --target-sdk-version 36 \
  --version-code $VC --version-name $VN --auto-add-overlay
javac -source 11 -target 11 -Xlint:-options -encoding UTF-8 -classpath $JAR -d build/classes $(find src build/gen -name '*.java')
$BT/d8 --release --min-api 24 --lib $JAR --output build/dex $(find build/classes -name '*.class')
python3 - <<'PY'
import zipfile, shutil
shutil.copy('build/base.apk','build/unsigned.apk')
with zipfile.ZipFile('build/unsigned.apk','a',zipfile.ZIP_DEFLATED) as z: z.write('build/dex/classes.dex','classes.dex')
PY
$BT/zipalign -f -p 4 build/unsigned.apk build/aligned.apk
KS=/workspace/certquest-release.jks; PWF=/workspace/.certquest-keystore-pass
if [ ! -f $KS ]; then
  umask 077; python3 -c "import secrets;print(secrets.token_urlsafe(24))" > $PWF
  keytool -genkeypair -keystore $KS -alias certquest -keyalg RSA -keysize 4096 -validity 10000 \
    -storepass:file $PWF -keypass:file $PWF -dname "CN=CertQuest, O=CertQuest, C=US" >/dev/null 2>&1
fi
$BT/apksigner sign --ks $KS --ks-key-alias certquest --ks-pass file:$PWF \
  --min-sdk-version 24 --out build/CertQuest.apk build/aligned.apk
cp build/CertQuest.apk /workspace/CertQuest.apk
echo BUILT
