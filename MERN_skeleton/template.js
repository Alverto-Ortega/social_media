//returns a html doc that renders hello world on browser screen
export default () => {
    return '<!doctype html> \
    <html lang="en" dir="ltr"> \
    <head> \
        <meta charset="utf-8"></meta> \
        <title>MERN Skeleton</title>  \
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,300,400"> \
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"> \
    </head> \
    <body>  \
        <div id="root">Hello world!!</div> \
        <script type="text/javascript" src"/dist/bundle.js"></script> \
    </body>  \
    </html>';
};
//script tag loads REACT frontend code in browser when visiting root URL"/" with server running
