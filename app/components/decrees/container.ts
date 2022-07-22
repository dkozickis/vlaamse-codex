import Component from "@glimmer/component";

type DecreesContainerArgs =
  | { state: "loading"; data?: null }
  | { state: "idle"; data: string[] };

export default class DecreesContainer extends Component<DecreesContainerArgs> {}
