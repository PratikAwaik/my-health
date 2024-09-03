import { Button } from "@/components/ui/button";
import pkceChallenge from "pkce-challenge";
import { createRandomString, secondsToDays } from "@/utils/helpers";
import { deleteCookie, getCookie, setCookie } from "@/utils/cookies";
import {
  CLIENT_ID,
  EPIC_FHIR_R4_URL,
  EPIC_SMART_AUTH_URL,
  EPIC_SMART_TOKEN_URL,
  COOKIE_KEYS,
  REDIRECT_URI,
} from "@/utils/constants";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { HeartPulse } from "lucide-react";
import toast from "react-hot-toast";

export default function SignInPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const state = searchParams.get("state");
    const code = searchParams.get("code");
    const access_token = getCookie(COOKIE_KEYS.ACCESS_TOKEN);

    if (state && code && !access_token) {
      if (isStateSame(state)) {
        getToken(code)
          .then((response) => {
            const expires = secondsToDays(response.expires_in);
            setCookie(COOKIE_KEYS.ACCESS_TOKEN, response.access_token, {
              expires,
            });
            setCookie(COOKIE_KEYS.PATIENT_ID, response.patient, {
              expires,
            });
            deleteCookie(COOKIE_KEYS.CODE_VERIFIER);
            deleteCookie(COOKIE_KEYS.STATE);
            toast.success("Successfully signed in.");
            navigate("/medications");
          })
          .catch(() => {
            toast.error("Something went wrong. Please try again.");
          });
      } else {
        toast.error(
          "State is different. Your code has been compromised. Please restart the authorization process!"
        );
      }
    }
  }, [searchParams, navigate]);

  const isStateSame = (searchParamState: string) => {
    const cookieState = getCookie(COOKIE_KEYS.STATE);
    return cookieState === searchParamState;
  };

  const generateAndSetPkceChallenge = async () => {
    const pkce = await pkceChallenge();
    setCookie(COOKIE_KEYS.CODE_VERIFIER, pkce.code_verifier);
    return pkce;
  };

  const authorize = async () => {
    const pkce = await generateAndSetPkceChallenge();
    const state = createRandomString();
    setCookie(COOKIE_KEYS.STATE, state);

    const authUrl = new URL(EPIC_SMART_AUTH_URL);

    authUrl.searchParams.set("response_type", "code");
    authUrl.searchParams.set("client_id", CLIENT_ID);
    authUrl.searchParams.set("redirect_uri", REDIRECT_URI);
    authUrl.searchParams.set("state", state);
    authUrl.searchParams.set("scope", "openid fhirUser");
    authUrl.searchParams.set("aud", EPIC_FHIR_R4_URL);
    authUrl.searchParams.set("code_challenge", pkce.code_challenge);
    authUrl.searchParams.set("code_challenge_method", "S256");

    window.location.href = authUrl.href;
  };

  const getToken = async (code: string) => {
    const codeVerifier = getCookie(COOKIE_KEYS.CODE_VERIFIER);

    const response = await axios.post(
      EPIC_SMART_TOKEN_URL,
      {
        grant_type: "authorization_code",
        code,
        redirect_uri: REDIRECT_URI,
        client_id: CLIENT_ID,
        code_verifier: codeVerifier,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return response.data;
  };

  return (
    <div className="w-screen h-screen">
      <div className="flex items-center w-full h-full">
        <div className="bg-primary/20 h-full w-1/2 flex items-center justify-center p-2">
          <div className="flex flex-col gap-y-6 items-center max-w-md">
            <div className="flex flex-col gap-y-2 items-center">
              <h1 className="text-2xl text-primary font-semibold flex items-center gap-x-2">
                <HeartPulse /> My Health
              </h1>
              <p className="text-gray-500 text-center">
                Access your medical records, manage appointments, and connect
                with your healthcare providers all in one place
              </p>
            </div>
            <div className="flex flex-col gap-y-2">
              <h3 className="text-lg font-semibold">Benefits:</h3>
              <ul className="text-gray-500 list-disc">
                <li>
                  <span className="font-semibold">
                    Simple and Secure Access:
                  </span>{" "}
                  Sign in with your EPIC account to securely access your health
                  records and manage your care.
                </li>
                <li>
                  <span className="font-semibold">24/7 Availability:</span> Your
                  health information is available to you whenever you need it,
                  from any device.
                </li>
                <li>
                  <span className="font-semibold">Connect with Care:</span>{" "}
                  Easily communicate with your healthcare team and manage your
                  appointments online.
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="bg-white h-full w-1/2 flex items-center justify-center p-2">
          <div className="flex flex-col gap-y-2 items-center">
            <h3 className="text-xl text-primary font-semibold">
              Welcome to My Health
            </h3>
            <p className="text-gray-500">
              Your personal health information at your fingertips.
            </p>
            <Button onClick={authorize}>Sign In with EPIC</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
