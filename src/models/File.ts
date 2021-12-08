export class File {
  name: string;
  path: string;
  size: Number;

  constructor(name: string, path: string, size: Number) {
  	this.name = name;
  	this.path = path;
  	this.size = size;
  }
}
