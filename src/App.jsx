import ChinaQuest from "./ChinaQuest";
import ChinaQuestDisplay from "./ChinaQuestDisplay";

export default function App() {
  return window.location.pathname === "/display" ? <ChinaQuestDisplay /> : <ChinaQuest />;
}
