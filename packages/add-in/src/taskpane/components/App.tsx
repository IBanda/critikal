import * as React from "react";
import { MessageBar, MessageBarType, Spinner, SpinnerSize } from "office-ui-fabric-react";
import PriorityBar from "./PriorityBar";
import Actions from "./Actions";
// images references in the manifest
import "../../../assets/icon-16.png";
import "../../../assets/icon-32.png";
import "../../../assets/icon-80.png";

export interface AppProps {
  title: string;
  isOfficeInitialized: boolean;
}
interface AppState {
  status: string;
  priority: "high" | "normal";
  loading: boolean;
  isStatusUpdating: boolean;
  error: string;
}

function formatMesssageId(messageId: string) {
  return messageId.replace(/[<|>]/g, "");
}

export default function App({ title, isOfficeInitialized }: AppProps) {
  const [{ status, priority, loading, isStatusUpdating, error }, setMessage] = React.useState<AppState | null>({
    loading: true,
    priority: "normal",
    status: "",
    error: "",
    isStatusUpdating: false,
  });
  const messageIdRef = React.useRef<string>(null);
  React.useEffect(() => {
    (async () => {
      const messageId = formatMesssageId(await Office.context.mailbox.item.internetMessageId);
      messageIdRef.current = messageId;
      const res = await fetch(`https://critikal.vercel.app/add-in/message?messageId=${messageId}`);
      const data = await res.json();
      if (!data.success) return setMessage((prev) => ({ ...prev, error: data.message }));
      setMessage((prev) => ({
        ...prev,
        loading: false,
        status: data?._doc.status,
        priority: data?._doc.insights?.priority,
      }));
    })();
  }, []);
  const onStatusChange = async (status: string) => {
    try {
      setMessage((prev) => ({ ...prev, isStatusUpdating: true }));
      const res = await fetch(
        `https://critikal.vercel.app/api/add-in/message?messageId=${messageIdRef.current}&status=${status}`,
        {
          method: "PATCH",
          cache: "no-cache",
        }
      );
      const data = await res.json();
      console.log(data);
      setMessage((prev) => ({
        ...prev,
        status: data._doc.status,
        isStatusUpdating: false,
      }));
    } catch (error) {
      console.log(error);
    }
  };
  if (error) return <MessageBar messageBarType={MessageBarType.error}>{error}</MessageBar>;
  const isLoading = !isOfficeInitialized || loading;
  return (
    <div className="ms-welcome">
      {isLoading ? (
        <div className="ms-welcome__spinnerContainer">
          <Spinner label={title} size={SpinnerSize.medium} />
        </div>
      ) : (
        <>
          <PriorityBar priority={priority} />
          {isStatusUpdating && (
            <Spinner className="ms-statusupdate__Spinner" label="Updating message status" size={SpinnerSize.medium} />
          )}
          <Actions onStatusChange={onStatusChange} status={status} />
        </>
      )}
    </div>
  );
}
