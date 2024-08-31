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
import { useToast } from "@/hooks/use-toast";

export default function SignIn() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();

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
            toast({
              title: "Successfully signed in.",
            });
            navigate("/");
          })
          .catch(() => {
            toast({
              variant: "destructive",
              title: "Authentication Error",
              description: "Something went wrong. Please try again.",
            });
          });
      } else {
        toast({
          variant: "destructive",
          title: "Authentication Error",
          description:
            "State is different. Your code has been compromised. Please restart the authorization process!",
        });
      }
    }
  }, [searchParams, navigate, toast]);

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
    <div className="w-full h-full flex items-center justify-center">
      <Button onClick={authorize}>Sign In with EPIC</Button>
    </div>
  );
}
