import { Coordinate, Position } from "../Models";
import MarsRoverCommand from "./IMarsRoverCommand";

export default class MoveForwardCommand implements MarsRoverCommand {
  constructor(
    private readonly boundaries: Coordinate = new Coordinate(
      Number.MAX_VALUE,
      Number.MAX_VALUE,
    ),
  ) {}

  public execute(position: Position): Position {
    return position.moveForward(this.boundaries);
  }
}
