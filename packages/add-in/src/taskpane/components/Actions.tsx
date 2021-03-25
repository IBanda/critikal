import * as React from "react";
import { ActionButton, IIconProps } from "office-ui-fabric-react";
import capitalize from "../../utils/capitalize";

interface Props {
  status: string;
  onStatusChange: (status: string) => void;
}
const actionableIcon: IIconProps = { iconName: "ScheduleEventAction" };
const resolveIcon: IIconProps = { iconName: "CheckMark" };
export default function Actions({ status, onStatusChange }: Props) {
  return (
    <div className="ms-welcome__action">
      <p className="ms-welcome__status ms-fontWeight-regular">This message is currently: {capitalize(status)}</p>
      <div>
        <ActionButton
          onClick={() => onStatusChange("actionable")}
          disabled={status === "actionable"}
          iconProps={actionableIcon}
        >
          Set as Actionable
        </ActionButton>
        <ActionButton
          onClick={() => onStatusChange("resolved")}
          disabled={status === "resolved"}
          iconProps={resolveIcon}
        >
          Resolve
        </ActionButton>
      </div>
    </div>
  );
}
