# Image upload in Node.js

This web server implements image upload using Node.js with TypeScript.

![Image upload screenshot](https://github.com/gvlsq/node-file-upload/blob/main/screenshot.png)

## Installation

To initialize the necessary packages, navigate to the root folder of the repository on the command
line and enter `npm install`. Then, run the project in development mode by entering `npm run dev`.

## Usage

The web API at `POST /upload` accepts an image upload and uses Multer to make that image accessible
in code. From there, the image could be stored wherever the user decides (e.g. blob storage, SQL Server
`FILESTREAM`).

Behind the scenes, Multer uploads the image to the folder at `/tmp/uploads` in the project's root.
Additionally, the MIME type and file size of the image are validated in the controller, and appropriate
HTTP status codes are returned when validation fails.

## License

See the [LICENSE](https://github.com/gvlsq/node-image-upload/blob/main/LICENSE) file.
