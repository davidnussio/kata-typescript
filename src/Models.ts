import IMarsRoverCommand from "./commands/IMarsRoverCommand";

export enum Direction {
  NORTH = "NORTH",
  EAST = "EAST",
  SOUTH = "SOUTH",
  WEST = "WEST",
}

export class Coordinate {
  constructor(readonly x: number, readonly y: number) {}

  public moveNorth(boundaries: Coordinate): Coordinate {
    return new Coordinate(this.x, Math.min(this.y + 1, boundaries.y));
  }

  public moveEast(boundaries: Coordinate): Coordinate {
    return new Coordinate(Math.min(this.x + 1, boundaries.x), this.y);
  }

  public moveSouth(): Coordinate {
    return new Coordinate(this.x, Math.max(0, this.y - 1));
  }

  public moveWest(): Coordinate {
    return new Coordinate(Math.max(0, this.x - 1), this.y);
  }
}

export class Position {
  constructor(readonly coordinate: Coordinate, readonly direction: Direction) {}

  public rotateRight(): Position {
    switch (this.direction) {
      case Direction.NORTH:
        return new Position(this.coordinate, Direction.EAST);
      case Direction.EAST:
        return new Position(this.coordinate, Direction.SOUTH);
      case Direction.SOUTH:
        return new Position(this.coordinate, Direction.WEST);
      case Direction.WEST:
        return new Position(this.coordinate, Direction.NORTH);
    }
  }

  public rotateLeft(): Position {
    switch (this.direction) {
      case Direction.NORTH:
        return new Position(this.coordinate, Direction.WEST);
      case Direction.EAST:
        return new Position(this.coordinate, Direction.NORTH);
      case Direction.SOUTH:
        return new Position(this.coordinate, Direction.EAST);
      case Direction.WEST:
        return new Position(this.coordinate, Direction.SOUTH);
    }
  }

  public moveForward(boundaries: Coordinate): Position {
    switch (this.direction) {
      case Direction.NORTH:
        return new Position(
          this.coordinate.moveNorth(boundaries),
          this.direction,
        );
      case Direction.EAST:
        return new Position(
          this.coordinate.moveEast(boundaries),
          this.direction,
        );
      case Direction.SOUTH:
        return new Position(this.coordinate.moveSouth(), this.direction);
      case Direction.WEST:
        return new Position(this.coordinate.moveWest(), this.direction);
    }
  }
}

export class MarsRover {
  constructor(private position: Position) {}

  executeCommand(command: IMarsRoverCommand) {
    this.position = command.execute(this.position);
  }

  public getPosition(): Position {
    return this.position;
  }
}
