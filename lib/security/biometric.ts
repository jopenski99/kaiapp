// lib/services/biometricUnlock.ts

export async function biometricUnlock(): Promise<boolean> {
  if (
    typeof window === "undefined" ||
    !("PublicKeyCredential" in window)
  ) {
    alert("Biometrics not supported on this device");
    return false;
  }

  try {
    const challenge = crypto.getRandomValues(new Uint8Array(32));

    const assertion = await navigator.credentials.get({
      publicKey: {
        challenge,
        timeout: 60_000,
        userVerification: "required", // 👈 forces biometrics
      },
    });

    return !!assertion;
  } catch (err) {
    console.error("Biometric auth failed", err);
    return false;
  }
}
