"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function default_1(manager, _settings) {
    manager.addEventListener("pageview", (event) => {
        console.log("Hello server!");
        event.client.execute("console.log('Hello browser')");
    });
    manager.registerWidget(async () => {
        return `<div>Hello From MC</div>`;
    });
}
exports.default = default_1;
//# sourceMappingURL=index.js.map