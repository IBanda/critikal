import * as React from "react";
import { Button, ButtonType, ActionButton, IIconProps } from "office-ui-fabric-react";
import Header from "./Header";
import HeroList, { HeroListItem } from "./HeroList";
import Progress from "./Progress";
// images references in the manifest
import "../../../assets/icon-16.png";
import "../../../assets/icon-32.png";
import "../../../assets/icon-80.png";
/* global Button, Header, HeroList, HeroListItem, Progress */

export interface AppProps {
  title: string;
  isOfficeInitialized: boolean;
}

export interface AppState {
  listItems: HeroListItem[];
}

function formatMesssageId(messageId: string) {
  return messageId.replace(/[<|>]/g, "");
}
const actionableIcon: IIconProps = { iconName: "SetAction" };
export default function App({ title, isOfficeInitialized }: AppProps) {
  const [listItems, setItems] = React.useState([]);
  React.useEffect(() => {
    const fetchMessage = async () => {
      const messageId = formatMesssageId(await Office.context.mailbox.item.internetMessageId);
      console.log(messageId);
      const res = await fetch(`http://localhost:3000/api/add-in/message?messageId=${messageId}`, {
        mode: "cors",
      });
      const data = await res.json();
      setItems([]);
      console.log(data);
    };
    fetchMessage();
  }, []);

  const click = async () => {
    /**
     * Insert your Outlook code here
     */
    console.log(Office.context.mailbox.item.internetMessageId);
  };

  if (!isOfficeInitialized) {
    return (
      <Progress title={title} logo="assets/logo-filled.png" message="Please sideload your addin to see app body." />
    );
  }

  return (
    <div className="ms-welcome">
      <Header logo="assets/logo-filled.png" title={title} message="Welcome" />
      <HeroList message="Discover what Office Add-ins can do for you today!" items={listItems}>
        <p className="ms-font-l">
          Modify the source files, then click <b>Run</b>.
        </p>
        <Button
          className="ms-welcome__action"
          buttonType={ButtonType.hero}
          iconProps={{ iconName: "ChevronRight" }}
          onClick={click}
        >
          Run
        </Button>
        <ActionButton iconProps={actionableIcon}>Set Actionable</ActionButton>
      </HeroList>
    </div>
  );
}
