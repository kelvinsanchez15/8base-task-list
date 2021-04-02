import TestRenderer from "react-test-renderer";
import { MockedProvider } from "@apollo/client/testing";
import { TASK_LIST_QUERY } from "../shared/graphql";
import TaskContainer from "./TasksContainer";
import Tasks from "./Tasks";

const mocks = [
  {
    request: {
      query: TASK_LIST_QUERY,
    },
    result: {
      data: [
        {
          id: "1",
          title: "task title",
          assignee: "assignee",
          completed: "false",
          createdAt: "something",
        },
      ],
    },
  },
];

it("renders without error", () => {
  const component = TestRenderer.create(
    <MockedProvider mocks={mocks} addTypename={false}>
      <TaskContainer />
    </MockedProvider>
  );

  const tree = component.toJSON();
  console.log(tree);
  expect(tree.children).toContain("Loading...");
});
