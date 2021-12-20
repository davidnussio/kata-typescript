import { Position } from "../Models";

export default interface IMarsRoverCommand {
  execute(position: Position): Position;
}
