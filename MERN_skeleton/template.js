//returns a html doc that renders hello world on browser screen
export default () => {
    return '<!doctype html> \
    <html lang="en" dir="ltr"> \
    <head> \
        <meta charset="utf-8"></meta> \
        <title>MERN Skeleton</title>  \
    </head> \
    <body>  \
        <div id="root">Hello world!!</div> \
        <script type="text/javascript" src"/dist/bundle.js"></script> \
    </body>  \
    </html>';
};
//script tag loads REACT frontend code in browser when visiting root URL"/" with server running
