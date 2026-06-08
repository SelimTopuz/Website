import { Component, type ErrorInfo, type ReactNode } from "react";
import { profile } from "../data/profile";
import { MailtoLink } from "./MailtoLink";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error("Portfolio render error:", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          className="flex min-h-screen items-center justify-center px-6 text-center"
        >
          <div className="max-w-md">
            <h1 className="font-display text-2xl font-bold">
              Etwas ist schiefgelaufen
            </h1>
            <p className="mt-3 text-[var(--color-text-muted)]">
              Bitte lade die Seite neu. Falls das Problem bleibt, kontaktiere
              mich per E-Mail:{" "}
              <MailtoLink
                email={profile.email}
                className="font-medium text-[var(--color-link)] underline decoration-[var(--color-link)]/30 underline-offset-2 hover:decoration-[var(--color-link)]"
              >
                {profile.email}
              </MailtoLink>
              .
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-6 rounded-full bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-[var(--color-surface)]"
            >
              Seite neu laden
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
