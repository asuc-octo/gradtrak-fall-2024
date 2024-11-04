import SidePanel from "../../components/SidePanel/SidePanel" 
import { Flex } from "@radix-ui/themes";
import { requirements } from "../../components/SidePanel/types"
import "./Kanban.css"

export default function Kanban() {
  // Pretend this is the queried data
  const user = {
    "name": "Khankamol Chor Kongrukgreatiyos",
    "majors": ["Computer Science BA", "Data Science"],
    "minors": []
  }

  return (
    <>
    <Flex direction="row" height="100vh">
        <SidePanel 
          name={user.name} 
          majors={user.majors} 
          minors={user.minors}
          totalUnits={140}
          transferUnits={40}
          pnpTotal={15}
          requirements={requirements}
        />
        <div className="content">
            <Flex width="100%">
            TestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTest
            TestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTest
            TestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTest
            TestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTest
            TestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTest
            TestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTests
            </Flex>
        </div>
    </Flex>
    </>
  );
}
