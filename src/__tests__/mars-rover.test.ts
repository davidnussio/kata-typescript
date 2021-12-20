import { Coordinate, Direction, MarsRover, Position } from "../Models";
import RotateRightCommand from "../commands/RotateRightCommand";
import RotateLeftCommand from "../commands/RotateLeftCommand";
import MoveForwardCommand from "../commands/MoveForwardCommand";

describe("mars rover", () => {
  it("should return right coordinates after construction", () => {
    const initialPosition = new Position(new Coordinate(1, 2), Direction.NORTH);

    const rover = new MarsRover(initialPosition);

    expect(rover.getPosition()).toEqual(initialPosition);
  });

  it.each([
    [Direction.NORTH, Direction.EAST],
    [Direction.EAST, Direction.SOUTH],
    [Direction.SOUTH, Direction.WEST],
    [Direction.WEST, Direction.NORTH],
  ])(
    "should return right coordinates after moving %s",
    (startOrientation, endOrientation) => {
      const initialPosition = new Position(
        new Coordinate(1, 2),
        startOrientation,
      );

      const rover = new MarsRover(initialPosition);

      rover.executeCommand(new RotateRightCommand());

      expect(rover.getPosition()).toEqual(
        new Position(new Coordinate(1, 2), endOrientation),
      );
    },
  );

  it.each([
    [Direction.NORTH, Direction.WEST],
    [Direction.WEST, Direction.SOUTH],
    [Direction.SOUTH, Direction.EAST],
    [Direction.EAST, Direction.NORTH],
  ])(
    "should return right coordinates after moving %s",
    (startOrientation, endOrientation) => {
      const initialPosition = new Position(
        new Coordinate(1, 2),
        startOrientation,
      );

      const rover = new MarsRover(initialPosition);

      rover.executeCommand(new RotateLeftCommand());

      expect(rover.getPosition()).toEqual(
        new Position(new Coordinate(1, 2), endOrientation),
      );
    },
  );

  it.each([
    [Direction.NORTH, 1, 3],
    [Direction.EAST, 2, 2],
    [Direction.SOUTH, 1, 1],
    [Direction.WEST, 0, 2],
  ])(
    "should return right coordinates after moving %s",
    (orientation, endX, endY) => {
      const initialPosition = new Position(new Coordinate(1, 2), orientation);

      const rover = new MarsRover(initialPosition);

      rover.executeCommand(new MoveForwardCommand());

      expect(rover.getPosition()).toEqual(
        new Position(new Coordinate(endX, endY), orientation),
      );
    },
  );
});
