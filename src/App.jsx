import ChinaQuest from "./ChinaQuest";
import ChinaQuestDisplay from "./ChinaQuestDisplay";

export default function App() {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";

  return path === "/display" ? <ChinaQuestDisplay /> : <ChinaQuest />;
}
