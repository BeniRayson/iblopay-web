import express from 'express';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
var __dirname = fileURLToPath(new URL('.', import.meta.url));
var browserDistFolder = join(__dirname, '../browser');
var app = express();
/**
 * Serve static files from /browser
 */
app.use(express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
}));
/**
 * Fallback route for unmatched requests.
 */
app.use(function (req, res) {
    res.status(404).send('Not Found');
});
if (process.env.NODE_ENV !== 'test') {
    var port_1 = process.env.PORT || 4000;
    app.listen(port_1, function () {
        console.log("Node Express server listening on http://localhost:".concat(port_1));
    });
}
export default app;
//# sourceMappingURL=server.js.map