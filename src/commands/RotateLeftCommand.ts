import { Position } from "../Models";
import MarsRoverCommand from "./IMarsRoverCommand";

export default class RotateLeftCommand implements MarsRoverCommand {
  public execute(position: Position): Position {
    return position.rotateLeft();
  }
}
