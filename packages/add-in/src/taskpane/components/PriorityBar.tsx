import * as React from "react";
import { MessageBar, MessageBarType } from "office-ui-fabric-react";
interface Props {
  priority: "high" | "normal";
}

export default function Priority({ priority }: Props) {
  const priorityType = priority === "high" ? MessageBarType.warning : MessageBarType.info;
  return <MessageBar messageBarType={priorityType}>This a {priority} priority message</MessageBar>;
}
