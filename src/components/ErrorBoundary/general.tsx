import { Component, cloneElement } from "react";
import { ERRORS } from "./errors";
import toast from "react-hot-toast";

type ErrorBoundaryProps = {
    fallback: React.ReactElement;
    children: React.ReactNode;
  };
export class ErrorBoundary extends Component<ErrorBoundaryProps, { hasError: boolean, error: Error | null }> {
    constructor(props: ErrorBoundaryProps) {
      super(props);
      this.state = { hasError: false, error: null };
      this.onRetry = this.onRetry.bind(this);
      this.onOnline = this.onOnline.bind(this);
      this.onOffline = this.onOffline.bind(this);
      window.addEventListener("offline", this.onOffline);
    }
  
    static getDerivedStateFromError(error: Error) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true,  error };
    }
  
    componentDidCatch(error: Error | null, info: object) {
        window.removeEventListener("online", this.onOnline);
        console.log(this.constructor.name, { error, info });
        window.addEventListener("online", this.onOnline);
    }

    componentWillUnmount() {
      window.removeEventListener("online", this.onOnline);
      window.removeEventListener("offline", this.onOffline);
    }

    onRetry() {
        window.location.reload();
    }

    onOnline() {
        toast.success("You are back online");
        this.onRetry();
    }

    onOffline() {
        toast.error("You are currently offline");
    }
  
    render() {
      if (this.state.hasError) {
        let message = this.state.error?.message ?? '';
        const msg = String(message).toLowerCase();
        if (msg.includes(ERRORS.BUNDLE_LOAD_FAILED.toLowerCase()) || msg.includes(ERRORS.PRELOAD_FAILED.toLowerCase())) {
            message = "Failed to fetch requested component. This may be due to network connectivity issues. This is all we could find. Please try troubleshooting your network connection and try again...";
        }
        // You can render any custom fallback UI
        return cloneElement(this.props.fallback, { message, onRetry: this.onRetry });
      }
  
      return this.props.children;
    }
  }