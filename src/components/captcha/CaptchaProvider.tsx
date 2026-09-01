import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import CaptchaModal from "@/components/captcha/CaptchaModal";
import { isCaptchaVerified, markCaptchaVerified } from "@/lib/captcha";

interface CaptchaContextValue {
  ready: boolean;
  verified: boolean;
  requestWaitlist: () => void;
}

const CaptchaContext = createContext<CaptchaContextValue | null>(null);

export function CaptchaProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [ready, setReady] = useState(false);
  const [verified, setVerified] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setVerified(isCaptchaVerified());
    setReady(true);
  }, []);

  const requestWaitlist = useCallback(() => {
    if (isCaptchaVerified()) {
      setVerified(true);
      void navigate({ to: "/waitlist" });
      return;
    }
    setOpen(true);
  }, [navigate]);

  const onSuccess = useCallback(() => {
    markCaptchaVerified();
    setVerified(true);
    setOpen(false);
    void navigate({ to: "/waitlist" });
  }, [navigate]);

  const onDismiss = useCallback(() => {
    setOpen(false);
    if (pathname === "/waitlist" && !isCaptchaVerified()) {
      void navigate({ to: "/" });
    }
  }, [navigate, pathname]);

  useEffect(() => {
    if (ready && pathname === "/waitlist" && !verified) {
      setOpen(true);
    }
  }, [pathname, ready, verified]);

  const value = useMemo(
    () => ({ ready, verified, requestWaitlist }),
    [ready, verified, requestWaitlist],
  );

  return (
    <CaptchaContext.Provider value={value}>
      {children}
      {open && <CaptchaModal onSuccess={onSuccess} onDismiss={onDismiss} />}
    </CaptchaContext.Provider>
  );
}

export function useCaptcha() {
  const ctx = useContext(CaptchaContext);
  if (!ctx) {
    throw new Error("useCaptcha must be used within CaptchaProvider");
  }
  return ctx;
}

export function GetWhitelistedButton({ className }: { className: string }) {
  const { requestWaitlist } = useCaptcha();
  return (
    <button type="button" onClick={requestWaitlist} className={className}>
      Get whitelisted
    </button>
  );
}
